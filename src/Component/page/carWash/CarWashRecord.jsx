import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcSalesPerformance } from "react-icons/fc";
import { GiProfit } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { BsCashCoin } from "react-icons/bs";
import { useGetAllBillsQuery } from "../../../features/Api";
import { fetchUsers } from "../../../features/createSlice";
import TodayCarWashBill from "./TodayCarWashbill.jsx";
import AllUsers from "../accounts/AllUsers.jsx";
import Commission from "./Commission.jsx";
import CarWashMonthlyRecord from "./CarWashMonthlyRecord.jsx";


function CarWashRecord() {

  // 🟨 Local State
  const [activeRecord, setActiveRecord] = useState("all-carwash-bill");
  const [filterType, setFilterType] = useState("month");
  const [monthlyBills, setMonthlyBills] = useState([]);
  const [todayBills, setTodayBills] = useState([]);
  const [todayBillTotal, setTodayBillTotal] = useState(0);
  const [todayCommissionTotal, setTodayCommissionTotal] = useState(0);

  // 🟨 Redux & RTK Query Hooks
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { data: monthlyData = [] } = useGetAllBillsQuery("month");
  const { data: todayData = [] } = useGetAllBillsQuery("day");

  // 🟨 Fetch Users
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // 🟨 Store Monthly Bills
  useEffect(() => {
    setMonthlyBills(monthlyData);
  }, [monthlyData]);

  // 🟨 Store Today Bills & Calculate Totals
  useEffect(() => {
    const validTodayBills = todayData.filter((b) => !isNaN(parseFloat(b.bill)));
    setTodayBills(validTodayBills);

    const totalBill = validTodayBills.reduce(
      (sum, b) => sum + parseFloat(b.bill),
      0
    );

    const totalCommission = validTodayBills.reduce(
      (sum, b) => sum + parseFloat(b.commission || 0),
      0
    );

    setTodayBillTotal(totalBill);
    setTodayCommissionTotal(totalCommission);
  }, [todayData]);

  // 🟨 Monthly Total (Numeric Only)
  const monthlyBillTotal = monthlyBills
    .filter((b) => !isNaN(parseFloat(b.bill)))
    .reduce((sum, b) => sum + parseFloat(b.bill), 0);

  // 🟨 Car Wash Sale Details
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
      icon: <HiUsers size={50} />,
      heading: "Total Visitors",
      value: users.length,
      onClick: () => setActiveRecord("total-user"),
    },
    {
      icon: <GiProfit size={50} />,
      heading: "Today's Commissions",
      value: `PKR ${todayCommissionTotal}`,
      onClick: () => setActiveRecord("total-commission"),
    },
  ];

  // 🟨 Record Renderer
  const renderActiveRecord = () => {
    switch (activeRecord) {
      case "all-carwash-bill":
        return <CarWashMonthlyRecord allCarWashBills={monthlyBills} />;
      case "today-total-bill":
        return <TodayCarWashBill filteredBills={todayBills} />;
      case "total-user":
        return <AllUsers />;
      case "total-commission":
        return <Commission allBills={todayBills} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/*  Header */}
      <div className="h-[80px] w-full bg-white mt-[70px] mb-8 flex items-center justify-between px-8">
        <h1 className="text-lg font-[500]">Car Wash Records</h1>
        <div className="border-[1px] border-[#262626] p-1 sm:block hidden w-[300px] font-[500] rounded-[8px]">
          <input
            type="text"
            placeholder="Search"
            className="ml-2 outline-none w-full"
          />
        </div>
      </div>

      {/*  Sale Summary Cards */}
      <div className="w-[90%] mx-auto">
        <div className="flex lg:justify-between flex-wrap justify-center">
          {carWashSaleDetails.map((sale, idx) => (
            <div
              key={idx}
              className="bg-white lg:w-[250px] md:w-[320px] w-[90%] md:mt-2 mt-5 md:mx-8 lg:mx-0 h-[100px] cursor-pointer rounded-[10px] flex items-center justify-center gap-8"
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

      {/*  Active Record Section */}
      <div className="bg-white rounded-[10px] mt-8 pt-4 mb-20 flex items-center justify-center h-auto w-[90%] mx-auto">
        {renderActiveRecord()}
      </div>
    </div>
  );
}

export default CarWashRecord;
