import { FaCarAlt, FaCarCrash } from "react-icons/fa";
import React, { useEffect, useMemo } from "react";
import {
  useGetAccessoriesBillByDateQuery,
  useGetAllBillsDetailingQuery,
  useGetAllBillsQuery,
  useGetCarWashBillByDateQuery,
  useGetDetailingBillByDateQuery,
  useGetExpensesByDateQuery,
  useGetoilShopBillByDateQuery,
} from "../../../features/Api";

import { CiCalendarDate } from "react-icons/ci";
import { FaCarOn } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { RiOilFill } from "react-icons/ri";

function DailySales() {
 const [selectDate, setSelectDate] = React.useState("");
  const { data: detailingData = [] } = useGetDetailingBillByDateQuery(selectDate);
   const { data: carWashData = [] } = useGetCarWashBillByDateQuery(selectDate);
   const { data: oilShopData = [] } = useGetoilShopBillByDateQuery(selectDate);
   const { data: accessoriesData = [] } = useGetAccessoriesBillByDateQuery(selectDate);
   const { data: expenseData = [] } = useGetExpensesByDateQuery(selectDate);


  
    console.log("expenseData", expenseData);


   useEffect(() => {
   const today = new Date().toISOString().split("T")[0];

    if (!selectDate) {
      setSelectDate(today);
    }
    }, [selectDate]);

  // 🔹 Reusable Calculator Function
  const calculateTotals = (data, fieldName) => {
  if (!Array.isArray(data)) {
    return { totalAmount: 0, totalCommission: 0 };
  }

  const validRecords = data.filter(
    (item) => !isNaN(parseFloat(item[fieldName]))
  );

  const totalAmount = validRecords.reduce(
    (sum, item) => sum + parseFloat(item[fieldName] || 0),
    0
  );

  const totalCommission = validRecords.reduce(
    (sum, item) => sum + parseFloat(item.commission || 0),
    0
  );

  return { totalAmount, totalCommission };
};

  // 🔹 Memoized Values (Performance Optimized)
  const carWashTotals = useMemo(
    () => calculateTotals(carWashData, "bill"),
    [carWashData]
  );

  const detailingTotals = useMemo(
    () => calculateTotals(detailingData, "detailingBill"),
    [detailingData]
  );

  const oilShopTotals = useMemo(
    () => calculateTotals(oilShopData, "sellingPrice"),
    [oilShopData]
  );

  const accessoriesTotals = useMemo(  
    () => calculateTotals(accessoriesData, "sellingPrice"),
    [accessoriesData]
  );

  const expenseTotals = useMemo(
    () => calculateTotals(expenseData, "amount"),
    [expenseData]
  );

  const totalSales = carWashTotals.totalAmount + detailingTotals.totalAmount+ oilShopTotals.totalAmount + accessoriesTotals.totalAmount + expenseTotals.totalAmount;

  const salesCards = [
    {
      icon: <FaCarOn size={40} />,
      title: "Car Wash Sales",
      amount: carWashTotals.totalAmount,
      commission: carWashTotals.totalCommission,
    },
    {
      icon: <FaCarAlt size={40} />,
      title: "Detailing Sales",
      amount: detailingTotals.totalAmount,
      commission: detailingTotals.totalCommission,
    },
    {
      icon: <RiOilFill size={40} />,
      title: "Oil Shop Sales",
      amount: oilShopTotals.totalAmount,
    },
    {
      icon: <FaCarCrash size={40} />,
      title: "Accessories Sales",
      amount: accessoriesTotals.totalAmount,
    },
    {
      icon: <FcSalesPerformance size={40} />,
      title: "General Expenses",
      amount: expenseTotals.totalAmount,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex gap-2 items-center relative">
  <h1 className="text-2xl font-semibold my-4">Select Date</h1>

  {/* Calendar Icon */}
  <div className="relative">
    <CiCalendarDate
      className="text-2xl text-blue-500 cursor-pointer"
      size={30}
      onClick={() => document.getElementById("dateInput").showPicker?.()}
    />

    {/* Hidden input */}
    <input
      id="dateInput"
      type="date"
      value={selectDate}
      onChange={(e) => setSelectDate(e.target.value)}
      className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"
    />

   
  </div>
  <div>
    {selectDate && (
      <div >
        {selectDate}
      </div>
    )}
    </div>
</div>


      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold">Daily Sales Report</h1>
        <h2 className="text-2xl font-bold text-green-600">
          Total Sales: PKR {totalSales}
        </h2>
      </div>

      {/* Sales Cards */}
      <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6">
        {salesCards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl p-5 flex items-center gap-4"
          >
            <div className="text-blue-500">{card.icon}</div>

            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <p className="text-xl font-bold">PKR {card.amount}</p>

              {card.commission > 0 && (
                <p className="text-xs text-gray-400">
                  Commission: PKR {card.commission}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailySales;
