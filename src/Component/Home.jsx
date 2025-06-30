import React, { useEffect, useState } from "react";
import CustomButton from "./common/CustomButton";
import CarWashBill from "../Component/page/carWash/CarWashBill";
import SaleItemsAccessoriesShop from "./page/accessories/SaleItemsAccessoriesShop";
import GeneratebillOilShop from "./page/salerecord/GeneratebillOilShop";
import GenerateBillDetailingStudio from "./page/detailingStudio/GenerateBillDetailingStudio";
import Discount from "./page/discount/Discount";
import { useSubmitCarWashBillMutation } from "../features/Api";

function Home() {
  const [selectBillForm, setSelectBillForm] = useState("");
  const [billItems, setBillItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [generateBill] = useSubmitCarWashBillMutation();

  useEffect(() => {
    let total = 0;
    let discountAmount = 0;

    billItems.forEach(item => {
      switch (item.category) {
        case 'CarWash':
          total += parseInt(item.bill || 0);
          break;
        case 'cardetailng':
          total += parseInt(item.detailingBill || 0);
          break;
        case 'oilShop':
        case 'accessoriesShop':
          total += (item.sellingPrice || 0);
          break;
        case 'discount':
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
      window.location.reload();
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="flex mt-24">
        <div className="w-[70%] border-r-[1px] border-r-gray-300 h-[80vh]">
          <div className="flex">
            {[
              { title: "CarWash", key: "carWash" },
              { title: "OilShop", key: "oliShop" },
              { title: "Accessories", key: "Accessories" },
              { title: "Detailing Studio", key: "detailing_studio" },
              { title: "Discount", key: "discount" }
            ].map((btn) => (
              <CustomButton
                key={btn.key}
                title={btn.title}
                className={`w-[130px] !text-[14px] rounded-none hover:bg-[#257aea] ${
                  selectBillForm === btn.key && " !bg-[#4c4646] text-white"
                }`}
                onClick={() => setSelectBillForm(btn.key)}
              />
            ))}
          </div>

          <div className="w-[80%] mx-auto mt-5">
            {selectBillForm === "carWash" && (
              <CarWashBill setCarWashBill={setBillItems} setSelectBillForm={setSelectBillForm} />
            )}
            {selectBillForm === "oliShop" && (
              <GeneratebillOilShop setCarWashBill={setBillItems} setSelectBillForm={setSelectBillForm} />
            )}
            {selectBillForm === "Accessories" && (
              <SaleItemsAccessoriesShop setCarWashBill={setBillItems} setSelectBillForm={setSelectBillForm} />
            )}
            {selectBillForm === "detailing_studio" && (
              <GenerateBillDetailingStudio setCarWashBill={setBillItems} setSelectBillForm={setSelectBillForm} />
            )}
            {selectBillForm === "discount" && (
              <Discount setCarWashBill={setBillItems} setSelectBillForm={setSelectBillForm} />
            )}
          </div>
        </div>

        <div className="w-[30%]">
          <div>
            {billItems.length > 0 ? (
              billItems.map((bill, index) => (
                <div
                  key={index}
                  className="w-[80%] mx-auto border-b border-gray-300 py-3"
                >
                  {bill.carName && <div className="flex justify-between my-2"><h1 className="font-semibold">Car Name:</h1><p>{bill.carName}</p></div>}
                  {bill.bill && <div className="flex justify-between my-2"><h1 className="font-semibold">Bill:</h1><p>{bill.bill}</p></div>}
                  {index === 0 && bill.phoneNumber && <div className="flex justify-between my-2"><h1 className="font-semibold">Phone Number:</h1><p>{bill.phoneNumber}</p></div>}
                  {bill.productName && <div className="flex justify-between my-2"><h1 className="font-semibold">Product:</h1><p>{bill.productName}</p></div>}
                  {bill.quantitySold && <div className="flex justify-between my-2"><h1 className="font-semibold">Quantity:</h1><p>{bill.quantitySold}</p></div>}
                  {bill.sellingPrice && <div className="flex justify-between my-2"><h1 className="font-semibold">Price:</h1><p>{bill.sellingPrice}</p></div>}
                  {bill.carNameDetailing && <div className="flex justify-between my-2"><h1 className="font-semibold">Detailing:</h1><p>{bill.carName}</p></div>}
                  {bill.polish && bill.category === "cardetailng" && <div className="flex justify-between my-2"><h1 className="font-semibold">Polish:</h1><p>{bill.polish}</p></div>}
                  {bill.detailingBill && bill.category === "cardetailng" && <div className="flex justify-between my-2"><h1 className="font-semibold">Detailing Bill:</h1><p>{bill.detailingBill}</p></div>}
                </div>
              ))
            ) : (
              <p className="text-center mt-4">No bills yet</p>
            )}
          </div>

          <div className="text-center my-4">
            <h2 className="font-bold text-xl">Total Bill: Rs {totalBill}</h2>
            {discount > 0 && <p className="text-sm text-green-600">Discount Applied: Rs {discount}</p>}
          </div>

          {billItems.length > 0 && (
            <div className="text-center">
              <CustomButton title="Print" onClick={submitbillHandler} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
