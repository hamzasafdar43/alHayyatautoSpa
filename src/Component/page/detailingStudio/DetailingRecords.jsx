import React, { useEffect, useState } from "react";
import { FcSalesPerformance } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { GiProfit } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { BsCashCoin } from "react-icons/bs";
import {
  useGetAlldetailingStudioBilQuery,
} from "../../../features/Api";
import { fetchUsers } from "../../../features/createSlice";
import MonthlyRcord from "./MonthlyRcord.jsx";
import TodayRecord from "./TodayRecord.jsx";
import CommissionDetailngStudio from "./CommissionDetailngStudio.jsx";
import WeeklyRecord from "./WeeklyRecord.jsx";

function DetailingRecords() {
  const [activeRecordView, setActiveRecordView] = useState("monthly_record");

  const dispatch = useDispatch();
  const { data: detailingStudioAllBills = [] } = useGetAlldetailingStudioBilQuery();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const currentMonthDetailingStudioBills = detailingStudioAllBills.filter((item) => {
    const createdDate = new Date(item.createdAt);
    const now = new Date();
    return (
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getFullYear() === now.getFullYear()
    );
  });

  const detailingStudioMonthlyTotal = currentMonthDetailingStudioBills.reduce((total, item) => {
    return total + parseFloat(item?.detailingBill || 0);
  }, 0);

  const todayDate = new Date().toISOString().split("T")[0];

  const todayDetailingStudioBills = detailingStudioAllBills.filter((item) => {
    if (!item.createdAt) return false;

    const billDate = new Date(item.createdAt);
    if (isNaN(billDate)) return false;

    return billDate.toISOString().split("T")[0] === todayDate;
  });

  const detailingStudioTodayTotal = todayDetailingStudioBills.reduce((total, item) => {
    return total + parseFloat(item?.detailingBill || 0);
  }, 0);

  const detailingStudioTodayCommission = todayDetailingStudioBills.reduce((total, item) => {
    return total + parseFloat(item.commission || 0);
  }, 0);

  const detailingStudioSummary = [
    {
      icons: <FcSalesPerformance size={50} />,
      heading: "Monthly Record",
      para: `PKR ${detailingStudioMonthlyTotal}`,
    },
    {
      icons: <BsCashCoin size={50} />,
      heading: "Today Record",
      para: `PKR ${detailingStudioTodayTotal}`,
    },
    {
      icons: <HiUsers size={50} />,
      heading: "Weekly Record",
      para: `PKR 00, ${users.length}`,
    },
    {
      icons: <GiProfit size={50} />,
      heading: "Commissions",
      para: `PKR ${detailingStudioTodayCommission}`,
    },
  ];

  return (
    <div>
      <div className="h-[80px] w-full bg-white mt-[70px] mb-8 flex items-center justify-between px-8">
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
        <div className="flex lg:justify-between flex-wrap justify-center">
          {detailingStudioSummary.map((item, index) => (
            <div
              key={index}
              className="bg-white lg:w-[250px] md:w-[320px] w-[90%] md:mt-2 mt-5 md:mx-8 lg:mx-0 h-[100px] cursor-pointer rounded-[10px] flex items-center justify-center gap-8"
              onClick={() => {
                if (index === 0) setActiveRecordView("monthly_record");
                else if (index === 1) setActiveRecordView("today_record");
                else if (index === 2) setActiveRecordView("weekly_record");
                else if (index === 3) setActiveRecordView("total_commission");
              }}
            >
              <div>{item.icons}</div>
              <div>
                <div>{item.heading}</div>
                <div className="font-[600] text-2xl">{item.para}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[10px] mt-8 pt-4 mb-20 flex items-center justify-center h-auto w-[90%] mx-auto">
        {activeRecordView === "monthly_record" ? (
          <MonthlyRcord />
        ) : activeRecordView === "today_record" ? (
          <TodayRecord todayDetailingStudioBills={todayDetailingStudioBills} />
        ) : activeRecordView === "weekly_record" ? (
          <WeeklyRecord />
        ) : (
          <CommissionDetailngStudio />
        )}
      </div>
    </div>
  );
}

export default DetailingRecords;
