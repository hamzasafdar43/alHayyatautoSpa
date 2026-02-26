import { useEffect, useState } from "react";
import { useDeleteOilShopProductMutation, useGetAllOilShopProductsQuery } from "../../../../features/Api";
import { showToast } from "../../../common/CustomToast";
import CustomTable from "../../../common/CustomTable";
import CreateOilProduct from "./CreateOilProduct";
import CustomPopup from "../../../common/CustomPopup";
import CustomModal from "../../../common/CustomModal";

function OilProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [products, setProducts] = useState([]);


  const { data: allOilProducts = {}, refetch } = useGetAllOilShopProductsQuery();
  const [deleteOilProduct, { isLoading: isDeleting }] = useDeleteOilShopProductMutation();

 
  useEffect(() => {
    if (allOilProducts?.data) {
      setProducts(allOilProducts.data);
    }
  }, [allOilProducts]);

 
  const columns = [
    "Sr_No",
    "Id",
    "Product_Image",
    "Product_Name",
    "Product_Quantity",
    "Price",
    "Cost",
    "Actions",
  ];

 
  const rows = products.map((product, index) => ({
    Sr_No: index + 1,
    Id: product?._id,
    Product_Image: `${import.meta.env.VITE_BASE_URL}uploads/${product?.image}`,
    Product_Name: product?.productName,
    Product_Quantity: product?.quantity,
    Price: product?.price,
    Cost: product?.cost,
  }));

  
  const handleAddClick = () => {
    setSelectedRecord(null);
    setIsModalOpen(true);
  };

  const handleUpdateClick = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  
  const handleDeleteClick = (record) => {
    setSelectedRecord(record);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRecord?.Id) {
      showToast("Invalid record selected!", "error");
      return;
    }

    try {
      const response = await deleteOilProduct(selectedRecord.Id).unwrap();
      showToast(response?.message || "Oil product deleted successfully!", "success");
      setShowDeletePopup(false);
      await refetch();
    } catch (error) {
      showToast(error?.data?.message || "Failed to delete record!", "error");
    }
  };

  return (
    <>
      {/* 🔹 Header */}
      <div className="h-[80px] w-full bg-white mt-[70px] mb-8 flex items-center justify-between px-8">
        <div className="flex gap-8">
          <h1 className="text-lg font-[500]">Oil Shop</h1>
          <h1
            className="text-lg font-[500] cursor-pointer"
            onClick={handleAddClick}
          >
            + Add Oil Product
          </h1>
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white rounded-[10px] shadow-md mt-8 pt-4 mb-20 flex items-center justify-center h-auto w-[90%] mx-auto">
        <div className="w-[90%]">
          <h1 className="text-lg font-[500] my-4">All Oil Products</h1>
          <CustomTable
            rows={rows}
            columns={columns}
            onClickDelete={handleDeleteClick}
            onClick={handleUpdateClick}
          />
        </div>
      </div>

      {/* 🔹 Add / Update Modal */}
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CreateOilProduct
            selectedRecord={selectedRecord}
            setIsOpen={setIsModalOpen}
          />
        </CustomModal>
      )}

      {/* 🔹 Delete Confirmation Popup */}
      {showDeletePopup && (
        <CustomPopup
          show={showDeletePopup}
          heading="Delete Record?"
          title="Are you sure you want to delete this oil product?"
          cancelText="Cancel"
          confirmText={isDeleting ? "Deleting..." : "Delete"}
          onCancel={() => setShowDeletePopup(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}

export default OilProductList;
