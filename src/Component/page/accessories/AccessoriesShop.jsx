import { useEffect, useState } from "react";
import { useGetAllAccessoriesItemsQuery } from "../../../features/Api";
import CustomTable from "../../common/CustomTable";
import AddAccessoriesItems from "./AddAccessoriesItems";
import CustomModal from "../../common/CustomModal";

function AccessoriesShop({ onClick }) {
  const [items, setItems] = useState([]);
  const { data: allItems = {} } = useGetAllAccessoriesItemsQuery();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (allItems?.data) setItems(allItems.data);
  }, [allItems]);

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

  const rows = items.map((product, index) => ({
    Sr_No: index + 1,
    Id: product?._id,
    Product_Image: `${import.meta.env.VITE_BASE_URL}uploads/${product?.image}`,
    Product_Name: product?.productName,
    Product_Quantity: product?.quantity,
    Price: product?.price,
    Cost: product?.cost,
  }));

  return (
    <>
      <div className="h-[80px] w-full bg-white mt-[70px] mb-8 flex items-center justify-between px-8">
        <div className="flex gap-8">
          <h1 className="text-lg font-[500]">Accessories</h1>
          <h1
            className="text-lg font-[500] cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            + Add Product
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-[10px] shadow-md mt-8 pt-4 mb-20 flex items-center justify-center h-auto w-[90%] mx-auto">
        <div className="w-[90%]">
          <h1 className="text-lg font-[500] my-4">All Accessories Product</h1>
          <CustomTable rows={rows} columns={columns} onClick={onClick} />
        </div>
      </div>

      {/* 🔥 Custom Reusable Modal */}
      <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddAccessoriesItems setIsOpen={setIsOpen} />
      </CustomModal>
    </>
  );
}

export default AccessoriesShop;
