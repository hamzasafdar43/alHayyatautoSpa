import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BsCashCoin } from "react-icons/bs";
import CommissionDetailingMaster from "../detailingStudio/Commission.jsx";
import DetailingStudioMonthlyRcord from "./DetailingStudioMonthlyRcord.jsx";
import DetailingStudioTodayRecord from "./DetailingStudioTodayRecord.jsx";
import { FcSalesPerformance } from "react-icons/fc";
import { GiProfit } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { fetchUsers } from "../../../features/createSlice";
import { useGetAllBillsDetailingQuery } from "../../../features/Api";

function DetailingRecords() {
  //🟨 UI State
  const [activeRecord, setActiveRecord] = useState("all-carwash-bill");
  const [filterType, setFilterType] = useState("month");

  //🟨 Data State
  const [monthlyBills, setMonthlyBills] = useState([]);
  const [todayBills, setTodayBills] = useState([]);
  const [todayBillTotal, setTodayBillTotal] = useState(0);
  const [todayCommissionTotal, setTodayCommissionTotal] = useState(0);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  //🟨 Fetch all detailing bills (monthly and daily)
  const { data: monthlyData = [] } = useGetAllBillsDetailingQuery("month");
  const { data: todayData = [] } = useGetAllBillsDetailingQuery("day");

  //🟨 Fetch users on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  //🟨 Update monthly bills when data changes
  useEffect(() => {
    setMonthlyBills(monthlyData);
  }, [monthlyData]);

  //🟨 Update today's bills and calculate totals
  useEffect(() => {
    const validTodayBills = todayData.filter(
      (b) => !isNaN(parseFloat(b.detailingBill))
    );

    setTodayBills(validTodayBills);

    //🟨 Calculate daily totals
    const totalBill = validTodayBills.reduce(
      (sum, b) => sum + parseFloat(b.detailingBill),
      0
    );
    const totalCommission = validTodayBills.reduce(
      (sum, b) => sum + parseFloat(b.commission || 0),
      0
    );

    setTodayBillTotal(totalBill);
    setTodayCommissionTotal(totalCommission);
  }, [todayData]);

  //🟨 Calculate monthly total
  const monthlyBillTotal = monthlyBills
    .filter((b) => !isNaN(parseFloat(b.detailingBill)))
    .reduce((sum, b) => sum + parseFloat(b.detailingBill), 0);

  //🟨 Dashboard summary cards
  const carWashSaleDetails = [
    {
      icon: <FcSalesPerformance size={50} />,
      heading: "Monthly Bill",
      value: `PKR ${monthlyBillTotal}`,
      onClick: () => {
        setActiveRecord("all-carwash-bill");
        setFilterType("month");
      },
    },
    {
      icon: <BsCashCoin size={50} />,
      heading: "Today's Bill",
      value: `PKR ${todayBillTotal}`,
      onClick: () => {
        setActiveRecord("today-total-bill");
        setFilterType("day");
      },
    },
   
    {
      icon: <GiProfit size={50} />,
      heading: "Today's Commissions",
      value: `PKR ${todayCommissionTotal}`,
      onClick: () => setActiveRecord("total-commission"),
    },
  ];

  //🟨 Handle which record component to render
  const renderActiveRecord = () => {
    switch (activeRecord) {
      case "all-carwash-bill":
        return <DetailingStudioMonthlyRcord allCarWashBills={monthlyBills} />;
      case "today-total-bill":
        return <DetailingStudioTodayRecord filteredBills={todayBills} />;
      case "total-user":
        return <AllUsers />;
      case "total-commission":
        return <CommissionDetailingMaster allBills={todayBills} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* ===== Header ===== */}
      <div className="h-[80px] w-full bg-white mt-[70px] mb-8 flex items-center justify-between px-8">
        <h1 className="text-lg font-[500]">Detailing Studio Records</h1>
        <div className="border-[1px] border-[#262626] p-1 sm:block hidden w-[300px] font-[500] rounded-[8px]">
          <input
            type="text"
            placeholder="Search"
            className="ml-2 outline-none w-full"
          />
        </div>
      </div>

      {/* ===== Summary Cards ===== */}
      <div className="w-[90%] mx-auto">
        <div className="flex lg:justify-between flex-wrap justify-center">
          {carWashSaleDetails.map((sale, idx) => (
            <div
              key={idx}
              className="bg-white lg:w-[350px] md:w-[320px] w-[90%] md:mt-2 mt-5 md:mx-8 lg:mx-0 h-[100px] cursor-pointer rounded-[10px] flex items-center justify-center gap-8 hover:shadow-lg transition"
              onClick={sale.onClick}
            >
              <div>{sale.icon}</div>
              <div>
                <div>{sale.heading}</div>
                <div className="font-[600] text-2xl">{sale.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Record Details Section ===== */}
      <div className="bg-white rounded-[10px] mt-8 pt-4 mb-20 flex items-center justify-center h-auto w-[90%] mx-auto">
        {renderActiveRecord()}
      </div>
    </div>
  );
}

export default DetailingRecords;
