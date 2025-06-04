import React, { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import AddProduct from "./AddProduct";
import AllProduct from "./AllProduct";



function Olishop() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct , setSelectedProduct ] = useState(null)

  
  const newbillgenerateHandler = () => {
    setIsOpen(true);
  };

  const generateBillCloseHandler = () => {
    setIsOpen(false);
  };

  const updateProduct = async(product) => {
   
    try {
      setIsOpen(true)
      setSelectedProduct(product)
    } catch (error) {
      console.log("error" , error)
    }
  }

  return (
    <div>
      <div className="h-[80px] w-full bg-white mt-[70px] mb-8 flex items-center justify-between px-8">
        <div className="flex gap-8">
          <h1 className="text-lg font-[500] ">Oil Shop</h1>
          <h1
            className="text-lg font-[500] cursor-pointer "
            onClick={newbillgenerateHandler}
          >
            + Add Product
          </h1>
        </div>
        <div className="border-[1px] border-[#262626] p-1 sm:block hidden w-[300px] font-[500] rounded-[8px]">
          <form action="">
            <input
              type="text"
              placeholder="Search"
              className="ml-2 outline-none"
            />
          </form>
        </div>
      </div>
     
      <div className="bg-white rounded-[10px] shadow-md  mt-8 pt-4 mb-20 flex items-center justify-center h-auto  w-[90%] mx-auto ">
        
     <AllProduct  onClick={updateProduct}/>
      </div>
      {isOpen && (
        <div className="fixed h-[100vh] w-full top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center z-50 justify-center ">
          <div className="lg:w-[40%] sm:w-[60%] w-[90%] px-4  h-auto border-2 rounded-[10px] border-[#262626]  bg-white  py-8">
            <div className="m-2 flex justify-end ">
              <IoCloseSharp size={20} onClick={generateBillCloseHandler} />
            </div>
            <div>
              <AddProduct  setIsOpen={setIsOpen} product={selectedProduct} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




export default Olishop