import {
  useGetAllBillsDetailingQuery,
  useGetAllBillsQuery,
  useGetAllSaleAccessoriesQuery,
  useGetFilteredOilSalesQuery,
} from "../../../features/Api";

import React from "react";
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
    count: 0,
  }));

  const toNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const recordsToUse =
    activeTab === "detailing-studio" ? detailingRecord : carWashRecord;

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
    monthlyReport[monthIndex].count += 1;
  });

  const grandTotalBill = monthlyReport
    .filter((m) => !isNaN(m.totalBill))
    .reduce((sum, m) => sum + m.totalBill, 0);

  const grandTotalCommission = monthlyReport
    .filter((m) => !isNaN(m.totalCommission))
    .reduce((sum, m) => sum + m.totalCommission, 0);

  const grandTotalProfit = monthlyReport
    .filter((m) => !isNaN(m.profit))
    .reduce((sum, m) => sum + m.profit, 0);

  const grandTotalCount = monthlyReport
    .filter((m) => !isNaN(m.count))
    .reduce((sum, m) => sum + m.count, 0);

  const handleMonthClick = (monthIndex) => {
    const getMonthlyReport = recordsToUse.filter((bill) => {
      const date = new Date(bill.createdAt);
      return (
        date.getFullYear() === currentYear && date.getMonth() === monthIndex
      );
    });
    console.log(getMonthlyReport);
    navigate(`/history/${activeTab}/month/${monthIndex + 1}`, {
      state: { monthlyData: getMonthlyReport },
    });
  };

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
              <th className="p-3">Total Bill</th>
              <th className="p-3">Total Commission</th>
              <th className="p-3">Profit</th>
              <th className="p-3">Washes Count</th>
            </tr>
          </thead>
          <tbody>
            {monthlyReport.map((row, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleMonthClick(i, row)}
              >
                <td className="p-3 font-medium text-blue-600 underline">
                  {row.month}
                </td>
                <td className="p-3">{row.totalBill.toFixed(0)}</td>
                <td className="p-3">{row.totalCommission.toFixed(0)}</td>
                <td className="p-3 text-green-600 font-semibold">
                  {row.profit.toFixed(0)}
                </td>
                <td className="p-3">{row.count}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-200 font-bold">
            <tr>
              <td className="p-3">Total</td>
              <td className="p-3">{grandTotalBill.toFixed(0)}</td>
              <td className="p-3">{grandTotalCommission.toFixed(0)}</td>
              <td className="p-3 text-green-700">
                {grandTotalProfit.toFixed(0)}
              </td>
              <td className="p-3">{grandTotalCount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default AllHistory;
