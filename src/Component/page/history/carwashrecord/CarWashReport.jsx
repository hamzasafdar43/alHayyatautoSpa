import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllBillsDetailingQuery, useGetAllBillsQuery } from "../../../../features/Api";


function CarWashReport() {
  // 🟨 API Data
  const { data: carWashRecord = [], isLoading, error } = useGetAllBillsQuery("year");
  const { data: detailingRecord = [] } = useGetAllBillsDetailingQuery("year");

  const navigate = useNavigate();

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error loading bills</div>;

  const currentYear = new Date().getFullYear();

  // 🟨 Prepare Empty Monthly Report
  const monthlyReport = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "long" }),
    totalBill: 0,
    totalCommission: 0,
    profit: 0,
    count: 0,
  }));

  // 🟨 Helper: safely parse numbers
  const toNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  // 🟨 Populate with Car Wash Data
  carWashRecord.forEach((bill) => {
    const monthIndex = new Date(bill.createdAt).getMonth();
    const total = toNumber(bill.bill);
    const commission = toNumber(bill.commission);
    const profit = total - commission;

    monthlyReport[monthIndex].totalBill += total;
    monthlyReport[monthIndex].totalCommission += commission;
    monthlyReport[monthIndex].profit += profit;
    monthlyReport[monthIndex].count += 1;
  });

  // 🟨 Populate with Detailing Data
  detailingRecord.forEach((bill) => {
    const monthIndex = new Date(bill.createdAt).getMonth();
    const total = toNumber(bill.bill);
    const commission = toNumber(bill.commission);
    const profit = total - commission;

    monthlyReport[monthIndex].totalBill += total;
    monthlyReport[monthIndex].totalCommission += commission;
    monthlyReport[monthIndex].profit += profit;
    monthlyReport[monthIndex].count += 1;
  });

  // 🟨 Grand Totals (safe)
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

  // 🟨 Month Click Navigation
  const handleMonthClick = (monthIndex) => {
    navigate(`/monthly-report/${monthIndex + 1}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Car Wash Monthly Report ({currentYear})
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
                onClick={() => handleMonthClick(i)}
              >
                <td className="p-3 font-medium text-blue-600 underline">{row.month}</td>
                <td className="p-3">{row.totalBill.toFixed(0)}</td>
                <td className="p-3">{row.totalCommission.toFixed(0)}</td>
                <td className="p-3 text-green-600 font-semibold">{row.profit.toFixed(0)}</td>
                <td className="p-3">{row.count}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-200 font-bold">
            <tr>
              <td className="p-3">Total</td>
              <td className="p-3">{grandTotalBill.toFixed(0)}</td>
              <td className="p-3">{grandTotalCommission.toFixed(0)}</td>
              <td className="p-3 text-green-700">{grandTotalProfit.toFixed(0)}</td>
              <td className="p-3">{grandTotalCount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default CarWashReport;
