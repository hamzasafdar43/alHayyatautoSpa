import "react-datepicker/dist/react-datepicker.css";

import { FaCarAlt, FaCarCrash } from "react-icons/fa";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useGetAccessoriesMonthlyDataQuery,
  useGetCarWashMonthlyQuery,
  useGetExpensesByDateQuery,
  useGetMonthlyDailyExpensesQuery,
  useGetMonthlyExpensesQuery,
  useGetOilMonthlyDataQuery,
  useGetdetailingByMonthlyQuery,
} from "../../../features/Api";

import { CiCalendarDate } from "react-icons/ci";
import DatePicker from "react-datepicker";
import { FaCarOn } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { RiOilFill } from "react-icons/ri";

function MonthlyHistory() {
const [startDate, setStartDate] = useState(new Date());


const year = startDate.getFullYear();
const month = startDate.getMonth() + 1; 

 const [selectDate, setSelectDate] = React.useState("");
 

   const { data: expenseData = [] } = useGetExpensesByDateQuery(selectDate);
 const { data: monthlyDetailingData = [] } =
  useGetdetailingByMonthlyQuery({ year,month});
const { data: monthlyCarWashData = [] } = useGetCarWashMonthlyQuery({ year, month });
const { data: monthlyAccessoriesData = [] } = useGetAccessoriesMonthlyDataQuery({ year, month });
const { data: monthlyOilShopData = [] } = useGetOilMonthlyDataQuery({ year, month });
const { data: monthlyExpenseData = [] } = useGetMonthlyExpensesQuery({ year, month });
const { data: monthlyDailyExpenseData = [] } = useGetMonthlyDailyExpensesQuery({ year, month });


     const datePickerRef = useRef(null);

    //  console.log("oilShopData", monthlyOilShopData);
    //  console.log("detailingData", monthlyDetailingData);
    //  console.log("carWashData", monthlyCarWashData);
    //  console.log("accessoriesData", monthlyAccessoriesData);
    //   console.log("expenseData", monthlyExpenseData);
    //    console.log("monthlyDailyExpenseData", monthlyDailyExpenseData);


   useEffect(() => {
   const today = new Date().toISOString().split("T")[0];

    if (!selectDate) {
      setSelectDate(today);
    }
    }, [selectDate]);

  // 🔹 Reusable Calculator Function
  const calculateTotals = (data, fieldName) => {
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
    () => calculateTotals(monthlyCarWashData, "bill"),
    [monthlyCarWashData]
  );

  const detailingTotals = useMemo(
    () => calculateTotals(monthlyDetailingData, "detailingBill"),
    [monthlyDetailingData]
  );

  const oilShopTotals = useMemo(
    () => calculateTotals(monthlyOilShopData, "sellingPrice"),
    [monthlyOilShopData]
  );

  const oilShopTotalCost = useMemo(() => {
  return monthlyOilShopData.reduce((sum, item) => {
    const cost = item.productId?.cost || 0;
    const quantity = item.quantitySold || 1;
    return sum + cost * quantity;
  }, 0);
}, [monthlyOilShopData]);


  const accessoriesTotalCost = useMemo(() => {
  return monthlyAccessoriesData.reduce((sum, item) => {
    const cost = item.productId?.cost || 0;
    const quantity = item.quantitySold || 1;
    return sum + cost * quantity;
  }, 0);
}, [monthlyAccessoriesData]);

  const accessoriesTotals = useMemo(  
    () => calculateTotals(monthlyAccessoriesData, "sellingPrice"),
    [monthlyAccessoriesData]
  );

  const monthlyExpenseTotal = useMemo(
    () => calculateTotals(monthlyExpenseData, "amount"),
    [monthlyExpenseData]
  );

  const DailyCurrMonthallExpense = useMemo(
    () => calculateTotals(monthlyDailyExpenseData, "amount"),
    [monthlyDailyExpenseData]
  );

  const totalSales = carWashTotals.totalAmount + detailingTotals.totalAmount+ oilShopTotals.totalAmount + accessoriesTotals.totalAmount + monthlyExpenseTotal.totalAmount;
 const profitTotal = (carWashTotals.totalAmount - carWashTotals.totalCommission) + (detailingTotals.totalAmount - detailingTotals.totalCommission) + (oilShopTotals.totalAmount - oilShopTotalCost) + (accessoriesTotals.totalAmount - accessoriesTotalCost) ;
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
      cost: oilShopTotalCost,
    },
    {
      icon: <FaCarCrash size={40} />,
      title: "Accessories Sales",
      amount: accessoriesTotals.totalAmount,
      cost: accessoriesTotalCost,
    },
    {
      icon: <FcSalesPerformance size={40} />,
      title: " Monthly Expenses",
      amount: monthlyExpenseTotal.totalAmount,
      dailyExpense : DailyCurrMonthallExpense,
    },
  ];


    const ProfitCards = [
    {
      icon: <FaCarOn size={40} />,
      title: "Car Wash Profit without comission",
      amount: carWashTotals.totalAmount - carWashTotals.totalCommission,
    
    },
    {
      icon: <FaCarAlt size={40} />,
      title: "Detailing Profit without comission",
      amount: detailingTotals.totalAmount - detailingTotals.totalCommission,
    },
    {
      icon: <RiOilFill size={40} />,
      title: "Oil Shop Sales",
      amount: oilShopTotals.totalAmount - oilShopTotalCost,

    },
    {
      icon: <FaCarCrash size={40} />,
      title: "Accessories Sales",
      amount: accessoriesTotals.totalAmount - accessoriesTotalCost,

    },
    
  ];


 return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Date Picker */}
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Select Month & Year</h1>
        <div className="relative">
          <CiCalendarDate
            className="text-blue-600 cursor-pointer"
            size={30}
            onClick={() => datePickerRef.current.setOpen(true)}
          />
          <DatePicker
            ref={datePickerRef}
            selected={startDate}
            onChange={setStartDate}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="absolute top-0 left-0 opacity-0 w-0 h-0"
          />
        </div>
        {startDate && (
          <div className="text-gray-700 font-medium">
            {startDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </div>
        )}
      </div>

      {/* Total Sales */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-700">Monthly Report</h2>
        <h2 className="text-3xl font-bold text-green-600">Total Sales: PKR {totalSales}</h2>
      </div>

      {/* Sales Cards */}
      <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-10">
        {salesCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 flex flex-col gap-3">
            <div>{card.icon}</div>
            <h3 className="text-gray-500 text-sm">{card.title}</h3>
            <p className="text-xl font-bold text-gray-800">PKR {card.amount}</p>
            {card.commission > 0 && <p className="text-xs text-gray-400">Commission: PKR {card.commission}</p>}
            {card.dailyExpense && <p className="text-xs text-gray-400">Daily Expense: PKR {card.dailyExpense.totalAmount}</p>}
            {card.cost > 0 && <p className="text-xs text-gray-400">Cost: PKR {card.cost}</p>}
          </div>
        ))}
      </div>

      {/* Total Profit */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-700">Monthly Profit</h2>
        <h2 className="text-3xl font-bold text-green-600">Total Profit: PKR {profitTotal}</h2>
      </div>

      {/* Profit Cards */}
      <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {ProfitCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 flex flex-col gap-3">
            <div>{card.icon}</div>
            <h3 className="text-gray-500 text-sm">{card.title}</h3>
            <p className="text-xl font-bold text-gray-800">PKR {card.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



export default MonthlyHistory;
