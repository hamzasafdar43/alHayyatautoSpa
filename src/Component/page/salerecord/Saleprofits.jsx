import React, { useEffect, useState } from 'react';
import { useGetAllSalesQuery } from '../../../features/Api';

function Saleprofits() {
  const [monthlyTotalSale, setMonthlyTotalSale] = useState(0);
  const [weeklyTotalSale, setWeeklyTotalSale] = useState(0);
  const [todayTotalSale, setTodayTotalSale] = useState(0);

  const { data: allSales = {}, isSuccess } = useGetAllSalesQuery();

useEffect(() => {
  if (isSuccess && allSales?.allSale) {
    const today = new Date();

    // Start of today
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Start of the month (1st of current month)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Start of the current "week" (from 1st of the month, as per your requirement)
    const startOfCurrentWeek = startOfMonth;

    let todayProfit = 0;
    let weekProfit = 0;
    let monthProfit = 0;

    allSales.allSale.forEach((sale) => {
      if (!sale?.createdAt || !sale?.sellingPrice || !sale?.quantitySold) return;

      const saleDate = new Date(sale.createdAt);
      if (isNaN(saleDate)) return;

      const quantity = Number(sale.quantitySold) || 1;
      const sellingPrice = Number(sale.sellingPrice) || 0;
      const cost = Number(sale?.productId?.cost) || 0;

      const singleProfit = (sellingPrice / quantity) - cost;
      const totalProfit = singleProfit * quantity;

      // Monthly profit (from 1st of the month)
      if (saleDate >= startOfMonth) monthProfit += totalProfit;

      // Week profit (from 1st of the month — same logic)
      if (saleDate >= startOfCurrentWeek) weekProfit += totalProfit;

      // Today profit
      if (saleDate >= startOfToday) todayProfit += totalProfit;
    });

    setTodayTotalSale(todayProfit.toFixed(2));
    setWeeklyTotalSale(weekProfit.toFixed(2));
    setMonthlyTotalSale(monthProfit.toFixed(2));
  }
}, [allSales, isSuccess]);




  

  const saleProfits = [
    { title: "Today Profit", para: `PKR ${todayTotalSale}` },
    { title: "Weekly Profit", para: `PKR ${weeklyTotalSale}` },
    { title: "Monthly Profit", para: `PKR ${monthlyTotalSale}` },
  ];

  return (
    <div className="w-[90%]">
      <div className="md:flex gap-8 my-8">
        {saleProfits.map((sale, index) => (
          <div
            key={index}
            className="md:w-[40%] w-[90%] h-[120px] my-2 mx-auto rounded-[10px] p-4 bg-gray-100"
          >
            <div className="font-[500]">{sale?.title}</div>
            <div>{sale?.para}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Saleprofits;
