import React, { useEffect, useState } from "react";
import { FcSalesPerformance } from "react-icons/fc";
import { GiProfit } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { BsCashCoin } from "react-icons/bs";
import { useGetFilteredOilSalesQuery } from "../../../../features/Api";
import OilMonthlySales from "./OilMonthlySales";
import OilSalesWeeklySales from "./OilSalesWeeklySales";
import OilTodaySales from "./OilTodaySales";
import OilProfitSummary from "./OilProfitSummary"

function OilSalesOverview() {
  // 🟨 Local State
  const [activeView, setActiveView] = useState("monthly");
  const [monthlySales, setMonthlySales] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [todayProfit, setTodayProfit] = useState(0);
  
  // 🟨 Fetch data using RTK Query
  const { data: monthlySalesData = [] } = useGetFilteredOilSalesQuery("month");
  const { data: dailySalesData = [] } = useGetFilteredOilSalesQuery("day");

  // 🟩 Monthly Sales Effect
  useEffect(() => {
    if (!monthlySalesData.length) return;

    setMonthlySales(monthlySalesData);

    // Calculate totals
    const totalSales = monthlySalesData.reduce(
      (sum, s) => sum + (parseFloat(s.sellingPrice) || 0),
      0
    );

    const totalCost = monthlySalesData.reduce(
      (sum, s) => sum + (parseFloat(s.productId?.cost) || 0),
      0
    );

    setMonthlyTotal(totalSales);
    setMonthlyProfit(totalSales - totalCost);
  }, [monthlySalesData]);

  // 🟦 Daily Sales Effect
  useEffect(() => {
    if (!dailySalesData.length) return;

    const validSales = dailySalesData.filter(
      (s) => !isNaN(parseFloat(s.sellingPrice))
    );

    setDailySales(validSales);

    const total = validSales.reduce(
      (sum, s) => sum + parseFloat(s.sellingPrice),
      0
    );
    
    const todayTotalSales = dailySalesData.reduce(
      (sum, s) => sum + (parseFloat(s.sellingPrice) || 0),
      0
    );

    const todaySaleCost = dailySalesData.reduce(
      (sum, s) => sum + (parseFloat(s.productId?.cost) || 0),
      0
    );

    setTodayProfit(todayTotalSales-todaySaleCost)
    setDailyTotal(total);
  }, [dailySalesData]);

  // 🟧 Summary Cards
  const summaryCards = [
    {
      key: "monthly",
      icon: <FcSalesPerformance size={50} />,
      title: "Monthly Sales",
      value: `PKR ${monthlyTotal.toLocaleString()}`,
    },
    {
      key: "today",
      icon: <BsCashCoin size={50} />,
      title: "Today Sales",
      value: `PKR ${dailyTotal.toLocaleString()}`,
    },
    {
      key: "weekly",
      icon: <HiUsers size={50} />,
      title: "Weekly Sales",
      value: "PKR 0", // future enhancement
    },
    {
      key: "profits",
      icon: <GiProfit size={50} />,
      title: "Total Profit",
      value: `PKR ${monthlyProfit.toLocaleString()}`,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="h-[80px] w-full bg-white mt-[70px] mb-8 flex items-center justify-between px-8">
        <h1 className="text-lg font-medium">Accessories Sales Record</h1>
        <div className="border border-[#262626] p-1 sm:block hidden w-[300px] font-medium rounded-[8px]">
          <input
            type="text"
            placeholder="Search"
            className="ml-2 outline-none w-full"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="w-[90%] mx-auto">
        <div className="flex flex-wrap justify-center lg:justify-between">
          {summaryCards.map((card) => (
            <div
              key={card.key}
              className={`bg-white lg:w-[250px] md:w-[320px] w-[90%] md:mt-2 mt-5 md:mx-8 lg:mx-0 h-[100px] rounded-[10px] flex items-center justify-center gap-8 cursor-pointer transition-transform hover:scale-105 ${
                activeView === card.key ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setActiveView(card.key)}
            >
              <div>{card.icon}</div>
              <div>
                <div className="text-gray-700 font-medium">{card.title}</div>
                <div className="font-semibold text-2xl">{card.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Record Section */}
      <div className="bg-white rounded-[10px] mt-8 pt-4 mb-20 flex items-center justify-center h-auto w-[90%] mx-auto">
        {activeView === "monthly" ? (
          <OilMonthlySales monthlySales={monthlySales} />
        ) : activeView === "today" ? (
          <OilTodaySales dailySales={dailySales} />
        ) : activeView === "weekly" ? (
          <OilSalesWeeklySales />
        ) : (
          <OilProfitSummary monthlyProfit={monthlyProfit} todayProfit={todayProfit} />
        )}
      </div>
    </div>
  );
}

export default OilSalesOverview;
