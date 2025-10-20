import React, { useState } from "react";
import CustomTable from "../../common/CustomTable";
import SaleItemsAccessoriesShop from "../accessories/SaleItemsAccessoriesShop"
import CustomModal from "../../common/CustomModal";
import CustomPopup from "../../common/CustomPopup";


function MonthlySale({ monthlySales = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false);
   const [selectRecordIndex, setSelectRecordIndex] = useState(null);

  // 🟢 Prepare rows for the table
  const rows = monthlySales.map((sale, index) => ({
    Sr_No: index + 1,
    Date: new Date(sale.createdAt).toLocaleDateString("en-GB", {
      timeZone: "Asia/Karachi",
    }),
    Id: sale._id,
    Product_Name: sale.productId?.productName || "N/A",
    Product_Image: `${import.meta.env.VITE_BASE_URL}uploads/${sale.productId?.image}`,
    Quantity: sale.quantitySold,
    Price: `${sale.sellingPrice}`,

  }));

  const columns = [
    "Sr_No",
    "Date",
    "Id",
    "Product_Name",
    "Product_Image",
    "Quantity",
    "Price",
    "Actions",
  ];

const deleteAccessoriesShopRecordHandler = (record) => {
    setSelectRecordIndex(record);
    setShowDeletePopup(true);
  };

  const updateAccessoriesShopRecordHandler = (record) => {
    try {
      setSelectRecordIndex(record)
      setIsOpen(true)
    } catch (error) {
      console.log("error", error)
    }
  }

   // 🟨 Confirm Delete
    const confirmDeleteHandler = async () => {
      try {
       console.log("hello")
        // const response = await deleteBill(selectRecordIndex.Id).unwrap();
        // if (response.message === "Bill deleted successfully") {
        //   showToast(response?.message, "success");
        //   setTimeout(() => setShowDeletePopup(false), 1000);
        // }
        // Optionally: refetch or trigger state update here
      } catch (error) {
        const errorMessage = error?.data?.message || "Something went wrong!";
        showToast(errorMessage, "error");
      }
    };

  return (
    <div className="w-[90%]">
      <div>
        <h1 className="my-4 font-medium text-[24px]">Monthly Sale Record</h1>
      </div>
      <div>
        <CustomTable rows={rows} columns={columns} onClickDelete={deleteAccessoriesShopRecordHandler} onClick={updateAccessoriesShopRecordHandler} />
      </div>
      <div>
        {isOpen && 
          <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <SaleItemsAccessoriesShop selectedUpdateRecord={selectRecordIndex} />
          </CustomModal>

        }
      </div>
      {showDeletePopup && (
        <CustomPopup
          show={showDeletePopup}
          heading="Delete Record?"
          title="Are you sure you want to delete this record?"
          cancelText="Cancel"
          confirmText="Delete"
          onCancel={() => setShowDeletePopup(false)}
          onConfirm={confirmDeleteHandler}
        />
      )}
    </div>
  );
}

export default MonthlySale;
