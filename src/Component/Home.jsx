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
  const reactToPrintFn = useReactToPrint({ contentRef });

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
          setIsOpen(false);
        }, 1000);
      } else {
        showToast(response?.data?.message || "Insufficient stock for product");
      }
    } catch (error) {
      console.log("error", error);

      showToast(error?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div>
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
              { title: "Online", key: "Online" },
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

        <div className="w-full md:w-[30%] mx-auto mt-11">
          <div
            ref={contentRef}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            {billItems.length > 0 ? (
              billItems.map((bill, index) => (
                <div
                  key={index}
                  className="border-b border-dashed border-gray-300 py-4"
                >
                  {bill.carName && (
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">
                        Car Name:
                      </span>
                      <span>{bill.carName}</span>
                    </div>
                  )}
                  {bill.bill && (
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">Bill:</span>
                      <span>{bill.bill}</span>
                    </div>
                  )}
                  {index === 0 && bill.phoneNumber && (
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">Phone:</span>
                      <span>{bill.phoneNumber}</span>
                    </div>
                  )}
                  {bill.productName && (
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">
                        Product:
                      </span>
                      <span>{bill.productName}</span>
                    </div>
                  )}
                  {bill.quantitySold && (
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">
                        Quantity:
                      </span>
                      <span>{bill.quantitySold}</span>
                    </div>
                  )}
                  {bill.sellingPrice && (
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">Price:</span>
                      <span>{bill.sellingPrice}</span>
                    </div>
                  )}
                  {bill.carNameDetailing && (
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">
                        Detailing:
                      </span>
                      <span>{bill.carNameDetailing}</span>
                    </div>
                  )}
                  {bill.polish && bill.category === "cardetailng" && (
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">Polish:</span>
                      <span>{bill.polish}</span>
                    </div>
                  )}
                  {bill.detailingBill && bill.category === "cardetailng" && (
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">
                        Detailing Bill:
                      </span>
                      <span>{bill.detailingBill}</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">No bills yet</p>
            )}

            <div className="text-center mt-6">
              <h2 className="font-bold text-lg border-t pt-4">
                Total Bill: Rs {totalBill}
              </h2>
              {discount > 0 && (
                <p className="text-sm text-green-600 mt-1">
                  Discount Applied: Rs {discount}
                </p>
              )}
            </div>
          </div>

          {billItems.length > 0 && (
            <div className="flex gap-3 justify-end mt-4">
              <CustomButton
                title="Cancel"
                className="!w-[30%] !text-sm !h-9 !bg-red-500 hover:!bg-red-600"
                onClick={() => {
                  setBillItems([]);
                  setSelectBillForm("");
                }}
              />
              <CustomButton
                title="Print"
                className="!w-[30%] !text-sm !h-9 !bg-blue-600 hover:!bg-blue-700"
                onClick={submitbillHandler}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
