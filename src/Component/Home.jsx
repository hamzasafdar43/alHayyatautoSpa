// import React, { useEffect, useRef, useState } from "react";
// import CustomButton from "./common/CustomButton";
// import CarWashBill from "../Component/page/carWash/CarWashBill";
// import SaleItemsAccessoriesShop from "./page/accessories/SaleItemsAccessoriesShop";
// import GeneratebillOilShop from "./page/salerecord/GeneratebillOilShop";
// import GenerateBillDetailingStudio from "./page/detailingStudio/GenerateBillDetailingStudio";
// import Discount from "./page/discount/Discount";
// import { useSubmitCarWashBillMutation } from "../features/Api";
// import { useReactToPrint } from "react-to-print";
// import { showToast } from "./common/CustomToast";

// function Home() {
//   const [selectBillForm, setSelectBillForm] = useState("");
//   const [billItems, setBillItems] = useState([]);
//   const [totalBill, setTotalBill] = useState(0);
//   const [discount, setDiscount] = useState(0);

//   const [generateBill] = useSubmitCarWashBillMutation();

//   const contentRef = useRef();
//   const reactToPrintFn = useReactToPrint({ contentRef });

//   useEffect(() => {
//     let total = 0;
//     let discountAmount = 0;

//     billItems.forEach((item) => {
//       switch (item.category) {
//         case "CarWash":
//           total += parseInt(item.bill || 0);
//           break;
//         case "cardetailng":
//           total += parseInt(item.detailingBill || 0);
//           break;
//         case "oilShop":
//         case "accessoriesShop":
//           total += item.sellingPrice || 0;
//           break;
//         case "discount":
//           discountAmount = parseInt(item.discount || 0);
//           break;
//         default:
//           break;
//       }
//     });

//     setDiscount(discountAmount);
//     setTotalBill(total - discountAmount);
//   }, [billItems]);

//   const submitbillHandler = async () => {
//     try {
//       const response = await generateBill(billItems).unwrap();

//       if (response?.message === "All records saved successfully") {
//         showToast(response?.message, "success");
//         setTimeout(() => {
//           setBillItems([]);
//           setSelectBillForm(""); 
//           reactToPrintFn();
//           setIsOpen(false);
//         }, 1000);
//       } else {
//         showToast(response?.data?.message || "Insufficient stock for product");
//       }
//     } catch (error) {
//       console.log("error", error);

//       showToast(error?.data?.message || "Something went wrong", "error");
//     }
//   };

//   return (
//     <div>
//       <div className="flex mt-24">
//         <div className="w-[70%] border-r-[1px] border-r-gray-300 h-[80vh]">
//           <div className="flex">
//             {[
//               { title: "CarWash", key: "carWash" },
//               { title: "OilShop", key: "oliShop" },
//               { title: "Accessories", key: "Accessories" },
//               { title: "Detailing Studio", key: "detailing_studio" },
//               { title: "Discount", key: "discount" },
//             ].map((btn) => (
//               <CustomButton
//                 key={btn.key}
//                 title={btn.title}
//                 className={`w-[130px] !text-[14px] rounded-none hover:bg-[#257aea] ${
//                   selectBillForm === btn.key && " !bg-[#4c4646] text-white"
//                 }`}
//                 onClick={() => setSelectBillForm(btn.key)}
//               />
//             ))}
//           </div>

//           <div className="w-[80%] mx-auto mt-5">
//             {selectBillForm === "carWash" && (
//               <CarWashBill
//                 setCarWashBill={setBillItems}
//                 setSelectBillForm={setSelectBillForm}
//               />
//             )}
//             {selectBillForm === "oliShop" && (
//               <GeneratebillOilShop
//                 setCarWashBill={setBillItems}
//                 setSelectBillForm={setSelectBillForm}
//               />
//             )}
//             {selectBillForm === "Accessories" && (
//               <SaleItemsAccessoriesShop
//                 setCarWashBill={setBillItems}
//                 setSelectBillForm={setSelectBillForm}
//               />
//             )}
//             {selectBillForm === "detailing_studio" && (
//               <GenerateBillDetailingStudio
//                 setCarWashBill={setBillItems}
//                 setSelectBillForm={setSelectBillForm}
//               />
//             )}
//             {selectBillForm === "discount" && (
//               <Discount
//                 setCarWashBill={setBillItems}
//                 setSelectBillForm={setSelectBillForm}
//               />
//             )}
//           </div>
//         </div>

//         <div className="w-[30%]">
//           <div ref={contentRef}>
//             {billItems.length > 0 ? (
//               billItems.map((bill, index) => (
//                 <div
//                   key={index}
//                   className="w-[80%] mx-auto border-b border-gray-300 py-3"
//                 >
//                   {bill.carName && (
//                     <div className="flex justify-between my-2">
//                       <h1 className="font-semibold">Car Name:</h1>
//                       <p>{bill.carName}</p>
//                     </div>
//                   )}
//                   {bill.bill && (
//                     <div className="flex justify-between my-2">
//                       <h1 className="font-semibold">Bill:</h1>
//                       <p>{bill.bill}</p>
//                     </div>
//                   )}
//                   {index === 0 && bill.phoneNumber && (
//                     <div className="flex justify-between my-2">
//                       <h1 className="font-semibold">Phone Number:</h1>
//                       <p>{bill.phoneNumber}</p>
//                     </div>
//                   )}
//                   {bill.productName && (
//                     <div className="flex justify-between my-2">
//                       <h1 className="font-semibold">Product:</h1>
//                       <p>{bill.productName}</p>
//                     </div>
//                   )}
//                   {bill.quantitySold && (
//                     <div className="flex justify-between my-2">
//                       <h1 className="font-semibold">Quantity:</h1>
//                       <p>{bill.quantitySold}</p>
//                     </div>
//                   )}
//                   {bill.sellingPrice && (
//                     <div className="flex justify-between my-2">
//                       <h1 className="font-semibold">Price:</h1>
//                       <p>{bill.sellingPrice}</p>
//                     </div>
//                   )}
//                   {bill.carNameDetailing && (
//                     <div className="flex justify-between my-2">
//                       <h1 className="font-semibold">Detailing:</h1>
//                       <p>{bill.carNameDetailing}</p>
//                     </div>
//                   )}
//                   {bill.polish && bill.category === "cardetailng" && (
//                     <div className="flex justify-between my-2">
//                       <h1 className="font-semibold">Polish:</h1>
//                       <p>{bill.polish}</p>
//                     </div>
//                   )}
//                   {bill.detailingBill && bill.category === "cardetailng" && (
//                     <div className="flex justify-between my-2">
//                       <h1 className="font-semibold">Detailing Bill:</h1>
//                       <p>{bill.detailingBill}</p>
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p className="text-center mt-4">No bills yet</p>
//             )}
//             <div className="text-center my-4">
//               <h2 className="font-bold text-xl">Total Bill: Rs {totalBill}</h2>
//               {discount > 0 && (
//                 <p className="text-sm text-green-600">
//                   Discount Applied: Rs {discount}
//                 </p>
//               )}
//             </div>
//           </div>

//           {billItems.length > 0 && (
//             <div className="flex gap-4 justify-end mr-11">
//               <CustomButton
//                 title="Cancel"
//                 className="!w-[20%] !text-sm !h-8 !bg-red-400"
//                 onClick={() => {
//                   setBillItems([]);
//                   setSelectBillForm(""); 
//                 }}
//               />
//               <CustomButton
//                 title="Print"
//                 className="!w-[20%] !text-sm !h-8"
//                 onClick={submitbillHandler}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useEffect, useRef, useState } from "react";
import CustomButton from "./common/CustomButton";
import CarWashBill from "../Component/page/carWash/CarWashBill";
import SaleItemsAccessoriesShop from "./page/accessories/SaleItemsAccessoriesShop";
import GeneratebillOilShop from "./page/salerecord/GeneratebillOilShop";
import GenerateBillDetailingStudio from "./page/detailingStudio/GenerateBillDetailingStudio";
import Discount from "./page/discount/Discount";
import { useSubmitCarWashBillMutation } from "../features/Api";
import { useReactToPrint } from "react-to-print";
import { showToast } from "./common/CustomToast";

function Home() {
  const [selectBillForm, setSelectBillForm] = useState("");
  const [billItems, setBillItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [generateBill] = useSubmitCarWashBillMutation();

  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ content: () => contentRef.current });

  useEffect(() => {
    let total = 0;
    let discountAmount = 0;

    billItems.forEach((item) => {
      switch (item.category) {
        case "CarWash":
          total += parseInt(item.bill || 0);
          break;
        case "cardetailng":
          total += parseInt(item.detailingBill || 0);
          break;
        case "oilShop":
        case "accessoriesShop":
          total += item.sellingPrice || 0;
          break;
        case "discount":
          discountAmount = parseInt(item.discount || 0);
          break;
        default:
          break;
      }
    });

    setDiscount(discountAmount);
    setTotalBill(total - discountAmount);
  }, [billItems]);

  const submitbillHandler = async () => {
    try {
      const response = await generateBill(billItems).unwrap();

      if (response?.message === "All records saved successfully") {
        showToast(response?.message, "success");
        setTimeout(() => {
          setBillItems([]);
          setSelectBillForm("");
          reactToPrintFn();
        }, 1000);
      } else {
        showToast(response?.data?.message || "Insufficient stock for product");
      }
    } catch (error) {
      showToast(error?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row  h-[100vh] w-full font-sans">
      {/* Left: Bill Form Selector + Forms */}
      <div className="w-full md:w-[65%] border-r  border-gray-300 px-6 py-4 overflow-y-auto bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-gray-700 mt-10">
          Select Billing Section
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            { title: "Car Wash", key: "carWash" },
            { title: "Oil Shop", key: "oliShop" },
            { title: "Accessories", key: "Accessories" },
            { title: "Detailing Studio", key: "detailing_studio" },
            { title: "Discount", key: "discount" },
          ].map((btn) => (
            <button
              key={btn.key}
              className={`w-full py-3 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                selectBillForm === btn.key
                  ? "bg-[#1e40af] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => setSelectBillForm(btn.key)}
            >
              {btn.title}
            </button>
          ))}
        </div>

        <div className="max-w-[95%] mx-auto">
          {selectBillForm === "carWash" && (
            <CarWashBill
              setCarWashBill={setBillItems}
              setSelectBillForm={setSelectBillForm}
            />
          )}
          {selectBillForm === "oliShop" && (
            <GeneratebillOilShop
              setCarWashBill={setBillItems}
              setSelectBillForm={setSelectBillForm}
            />
          )}
          {selectBillForm === "Accessories" && (
            <SaleItemsAccessoriesShop
              setCarWashBill={setBillItems}
              setSelectBillForm={setSelectBillForm}
            />
          )}
          {selectBillForm === "detailing_studio" && (
            <GenerateBillDetailingStudio
              setCarWashBill={setBillItems}
              setSelectBillForm={setSelectBillForm}
            />
          )}
          {selectBillForm === "discount" && (
            <Discount
              setCarWashBill={setBillItems}
              setSelectBillForm={setSelectBillForm}
            />
          )}
        </div>
      </div>

      {/* Right: Bill Summary */}
      <div className="w-full md:w-[35%] px-6 py-6 overflow-y-auto bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-700 my-10">
          Bill Summary
        </h2>

        <div ref={contentRef} className="space-y-5">
          {billItems.length > 0 ? (
            billItems.map((bill, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
              >
                {bill.carName && <BillRow label="Car" value={bill.carName} />}
                {bill.bill && <BillRow label="Wash Bill" value={`Rs ${bill.bill}`} />}
                {index === 0 && bill.phoneNumber && (
                  <BillRow label="Phone" value={bill.phoneNumber} />
                )}
                {bill.productName && (
                  <BillRow label="Product" value={bill.productName} />
                )}
                {bill.quantitySold && (
                  <BillRow label="Qty" value={bill.quantitySold} />
                )}
                {bill.sellingPrice && (
                  <BillRow label="Price" value={`Rs ${bill.sellingPrice}`} />
                )}
                {bill.carNameDetailing && (
                  <BillRow label="Detailing" value={bill.carNameDetailing} />
                )}
                {bill.polish && bill.category === "cardetailng" && (
                  <BillRow label="Polish" value={bill.polish} />
                )}
                {bill.detailingBill && bill.category === "cardetailng" && (
                  <BillRow label="Detailing Bill" value={`Rs ${bill.detailingBill}`} />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No bills added</p>
          )}

          {/* Total */}
          <div className="text-center mt-6">
            <h2 className="text-lg font-bold text-gray-800">
              Total: Rs {totalBill}
            </h2>
            {discount > 0 && (
              <p className="text-sm text-green-600 mt-1">
                Discount: Rs {discount}
              </p>
            )}
          </div>
        </div>

        {billItems.length > 0 && (
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-red-500 text-white font-medium px-6 py-2 rounded hover:bg-red-600"
              onClick={() => {
                setBillItems([]);
                setSelectBillForm("");
              }}
            >
              Cancel
            </button>
            <button
              className="bg-green-600 text-white font-medium px-6 py-2 rounded hover:bg-green-700"
              onClick={submitbillHandler}
            >
              Print
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const BillRow = ({ label, value }) => (
  <div className="flex justify-between mb-1 text-sm text-gray-700">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

export default Home;

