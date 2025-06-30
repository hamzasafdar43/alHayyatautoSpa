import { useEffect, useState } from "react";
import { useGetAllAccessoriesItemQuery } from "../../../features/Api";
import CustomTable from "../../common/CustomTable";
import AddAccessoriesItems from "./AddAccessoriesItems";
import { IoCloseSharp } from "react-icons/io5";

function AccessoriesShop({ onClick }) {
  const [items, setItems] = useState([]);
  const {
    data: allItems = {},

  } = useGetAllAccessoriesItemQuery();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (allItems?.data) {
      setItems(allItems.data);
    }
  }, [allItems]);

  const addAccessoriesShopItems = () => {
    setIsOpen(!isOpen);
  };
  const closeAccessoriesAddItemsModal = () => {
    setIsOpen(false);
  };

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
    Product_Image: `http://localhost:5000/uploads/${product?.image}`,
    Product_Name: product?.productName,
    Product_Quantity: product?.quantity,
    Price: product?.price,
    Cost: product?.cost,
  }));

  return (
    <>
      <div className="h-[80px] w-full bg-white mt-[70px] mb-8 flex items-center justify-between px-8">
        <div className="flex gap-8">
          <h1 className="text-lg font-[500] ">Oil Shop</h1>
          <h1
            className="text-lg font-[500] cursor-pointer "
            onClick={addAccessoriesShopItems}
          >
            + Add Product
          </h1>
        </div>
      </div>
      <div className="bg-white rounded-[10px] shadow-md  mt-8 pt-4 mb-20 flex items-center justify-center h-auto  w-[90%] mx-auto ">
        <div className="w-[90%] ">
          <div>
            <h1 className="text-lg font-[500] my-4 ">
              All Accessories Product ......
            </h1>
          </div>
          <div>
            <CustomTable rows={rows} columns={columns} onClick={onClick} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed h-[100vh] w-full top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center z-50 justify-center ">
          <div className="lg:w-[40%] sm:w-[60%] w-[90%] px-4  h-auto border-2 rounded-[10px] border-[#262626]  bg-white  py-8">
            <div className="m-2 flex justify-end cursor-pointer ">
              <IoCloseSharp size={20} onClick={closeAccessoriesAddItemsModal} />
            </div>
            <div>
              <AddAccessoriesItems setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AccessoriesShop;
