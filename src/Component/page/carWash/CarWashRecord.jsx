import React, { useEffect, useRef, useState } from "react";
import { FcSalesPerformance } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { GiProfit } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { BsCashCoin } from "react-icons/bs";
import { useGetAllBillsQuery } from "../../../features/Api";
import { fetchUsers } from "../../../features/createSlice";
import CarWashbillRecordMonthly from "./CarWashbillRecordMonthly.jsx";
import TodayCarWashbill from "./TodayCarWashbill.jsx";
import AllUsers from "../accounts/AllUsers.jsx";
import Commission from "./Commission.jsx";
import CarWashBill from "./CarWashBill.jsx";

function CarWashRecord() {
  const [record, setRecord] = useState("all-carWash-bill");
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { name: "Milk", quantity: 2, price: 50 },
    { name: "Bread", quantity: 1, price: 40 },
  ];

  const dispatch = useDispatch();
  const { data: allBills = [] } = useGetAllBillsQuery();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const getCurrentMonthBill = allBills.filter((item) => {
    const createdDate = new Date(item.createdAt);
    const now = new Date();
    return (
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getFullYear() === now.getFullYear()
    );
  });

  // Now reduce to get total
  const carWashTotalBill = getCurrentMonthBill.reduce((total, item) => {
    return total + parseFloat(item.bill || 0);
  }, 0);

  const today = new Date().toISOString().split("T")[0];

  const filteredBills = allBills.filter((record) => {
    if (!record.createdAt) return false; // skip if createdAt is missing

    const billDate = new Date(record.createdAt);
    if (isNaN(billDate)) return false; // skip if date is invalid

    const isToday = billDate.toISOString().split("T")[0] === today;

    return isToday;
  });

  const todayCarWashBilltotal = filteredBills.reduce((total, record) => {
    return total + parseFloat(record.bill || 0);
  }, 0);

  const todayCarWashcommissiontotal = filteredBills.reduce((total, record) => {
    return total + parseFloat(record.commission || 0);
  }, 0);

  const saleDetails = [
    {
      icons: <FcSalesPerformance size={50} />,
      heading: "Montly Bill",
      para: `PKR ${carWashTotalBill}`,
    },
    {
      icons: <BsCashCoin size={50} />,
      heading: "Today Bill",
      para: `PKR ${todayCarWashBilltotal}`,
    },
    {
      icons: <HiUsers size={50} />,
      heading: "Total Vistor",
      para: `PKR 00, ${users.length}`,
    },
    {
      icons: <GiProfit size={50} />,
      heading: "Commissions",
      para: `PKR ${todayCarWashcommissiontotal}`,
    },
  ];

  const newbillgenerateHandler = () => {
    setIsOpen(true);
  };

  const generateBillCloseHandler = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="h-[80px] w-full bg-white mt-[70px] mb-8 flex items-center justify-between px-8">
        <div className="flex gap-8">
          <h1 className="text-lg font-[500] ">Generate Bill</h1>
          <h1
            className="text-lg font-[500] cursor-pointer "
            onClick={newbillgenerateHandler}
          >
            + Add new Bill
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
      <div className="w-[90%] mx-auto">
        <div className="flex lg:justify-between flex-wrap  justify-center ">
          {saleDetails.map((sale, index) => (
            <div
              className={`bg-white lg:w-[250px]  md:w-[320px] w-[90%] md:mt-2 mt-5 md:mx-8 lg:mx-0  h-[100px] cursor-pointer rounded-[10px] flex items-center justify-center gap-8`}
              onClick={() => {
                if (index === 0) setRecord("all-carWash-bill");
                else if (index === 1) setRecord("today-total-bill");
                else if (index === 2) setRecord("total-user");
                else if (index === 3) setRecord("total-commmission");
              }}
            >
              <div>{sale.icons}</div>
              <div>
                <div>{sale.heading}</div>
                <div className="font-[600] text-2xl ">{sale.para}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-[10px] mt-8 pt-4 mb-20 flex items-center justify-center h-auto  w-[90%] mx-auto ">
        {record === "all-carWash-bill" ? (
          <CarWashbillRecordMonthly />
        ) : record === "today-total-bill" ? (
          <TodayCarWashbill filteredBills={filteredBills} />
        ) : record === "total-user" ? (
          <AllUsers />
        ) : (
          <Commission />
        )}
      </div>
      {isOpen && (
        <div className="fixed h-[100vh] w-full top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center z-50 justify-center ">
          <div className="lg:w-[40%] sm:w-[60%] w-[90%] px-4  h-auto border-2 rounded-[10px] border-[#262626]  bg-white  py-8">
            <div className="m-2 flex justify-end ">
              <IoCloseSharp size={20} onClick={generateBillCloseHandler} />
            </div>
            <div>
              <CarWashBill setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




export default CarWashRecord