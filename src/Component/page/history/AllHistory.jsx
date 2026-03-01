import React, { useMemo } from "react";
import {
  useGetAllBillsDetailingQuery,
  useGetAllBillsQuery,
  useGetAllSaleAccessoriesQuery,
  useGetExpensesQuery,
  useGetFilteredOilSalesQuery,
} from "../../../features/Api";

import { useNavigate } from "react-router-dom";

function AllHistory({ activeTab }) {
  const {
    data: carWashRecord = [],
    isLoading,
    error,
  } = useGetAllBillsQuery("year");
  const { data: detailingRecord = [] } = useGetAllBillsDetailingQuery("year");
  const { data: oilshopRecord = [] } = useGetFilteredOilSalesQuery("year");
  const { data: accessorieshopRecord = [] } =
    useGetAllSaleAccessoriesQuery("year");
  const { data: monthlyExpenseRecord } = useGetExpensesQuery("monthly");
   const { data: dailyExpenseRecord  } = useGetExpensesQuery("daily");




  const navigate = useNavigate();

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 p-4">Error loading bills</div>
    );

  const currentYear = new Date().getFullYear();

  const monthlyReport = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "long" }),
    totalBill: 0,
    totalCommission: 0,
    profit: 0,
    totalSaleProduct: 0,
    totalCost: 0,
    profitProduct: 0,
    totalExpense: 0,
    dailyExpense: 0,
    monthlyExpense: 0,
  }));

  const toNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const recordsToUse =
    activeTab === "detailing-studio" ? detailingRecord : carWashRecord;

  const recordsToUseProduct =
    activeTab === "oil-shop" ? oilshopRecord : accessorieshopRecord;

    
    recordsToUseProduct.forEach((bill) => {
    const monthIndex = new Date(bill.createdAt).getMonth();
    const total =
      activeTab === "oil-shop"
        ? toNumber(bill.sellingPrice)
        : toNumber(bill.sellingPrice);

    const totalCost = toNumber(bill.productId.cost);
    const profit = total - totalCost;

    monthlyReport[monthIndex].totalSaleProduct += total;
    monthlyReport[monthIndex].totalCost += totalCost;
    monthlyReport[monthIndex].profitProduct += profit;
    
  });

  monthlyExpenseRecord?.data?.forEach((expense) => {
    const monthIndex = new Date(expense.createdAt).getMonth();
    const total = toNumber(expense.amount);

    monthlyReport[monthIndex].monthlyExpense += total;
  });



 dailyExpenseRecord?.data?.forEach((expense) => {
    const monthIndex = new Date(expense.createdAt).getMonth();
    const total = toNumber(expense.amount);

    monthlyReport[monthIndex].dailyExpense += total;
  });



  recordsToUse.forEach((bill) => {
    const monthIndex = new Date(bill.createdAt).getMonth();
    const total =
      activeTab === "detailing-studio"
        ? toNumber(bill.detailingBill)
        : toNumber(bill.bill);

    const commission = toNumber(bill.commission);
    const profit = total - commission;

    monthlyReport[monthIndex].totalBill += total;
    monthlyReport[monthIndex].totalCommission += commission;
    monthlyReport[monthIndex].profit += profit;
   
  });

 



  const handleMonthClick = (monthIndex) => {
    const getMonthlyReport = recordsToUse.filter((bill) => {
      const date = new Date(bill.createdAt);
      return (
        date.getFullYear() === currentYear && date.getMonth() === monthIndex
      );
    });
   
    navigate(`/history/${activeTab}/month/${monthIndex + 1}`, {
      state: { monthlyData: getMonthlyReport },
    });
  };

  const isProduct =  activeTab === "oil-shop" || activeTab === "accessorie-shop";
  const isExpense = activeTab === "general-expense";


  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">
        {activeTab} ({currentYear})
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Month</th>

              {isProduct ? (
                <th className="p-3">Total Sale</th>
              ) : isExpense ? (
                <th className="p-3">Total Expense Daily</th>
              ) : (
                <th className="p-3">Total Bill</th>
              )}

              {isProduct ? (
                <th className="p-3">Total Cost</th>
              ) : isExpense ? (
                <th className="p-3">Total Expense Monthly</th>
              ) : (
                <th className="p-3">Total Commission</th>
              )}
              {isExpense ? (
                <th className="p-3">Total Daily/Monthly</th>
              ) : (
                <th className="p-3">Profit</th>
              )}

             
            </tr>
          </thead>
          <tbody>
            {monthlyReport.map((row, i) => {

          
              return (
                 <tr
                key={i}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleMonthClick(i, row)}
              >
                <td className="p-3 font-medium text-blue-600 underline">
                  {row.month}
                </td>
                {isProduct ? <td className="p-3">{row.totalSaleProduct.toFixed(0)}</td> :<td className="p-3">{row.totalBill.toFixed(0)}</td>}
                {isProduct ? <td className="p-3">{row.totalCost.toFixed(0)}</td> :<td className="p-3">{row.totalCommission.toFixed(0)}</td>}
                {isProduct ?  <td className="p-3 text-green-600 font-semibold">
                  {row.profitProduct.toFixed(0)}
                </td>:  <td className="p-3 text-green-600 font-semibold">
                  {row.profit.toFixed(0)}
                </td>}
               
              </tr>
              )
            }
             
            )}
          </tbody>

          
        
        </table>
      </div>
    </div>
  );
}

export default AllHistory;
