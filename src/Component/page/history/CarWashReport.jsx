import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllBillsQuery, useGetAlldetailingStudioBilQuery } from '../../../features/Api';

function CarWashReport() {
  const { data, isLoading, error } = useGetAllBillsQuery();
  const {data : detailin } = useGetAlldetailingStudioBilQuery()
  const navigate = useNavigate();

  console.log("detailing" , detailin)

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error loading bills</div>;

  const currentYear = new Date().getFullYear();

  const monthlyReport = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'long' }),
    totalBill: 0,
    totalCommission: 0,
    profit: 0,
    count: 0
  }));

  data?.forEach((bill) => {
    const date = new Date(bill.createdAt);
    if (date.getFullYear() === currentYear) {
      const monthIndex = date.getMonth();
      monthlyReport[monthIndex].totalBill += Number(bill.bill);
      monthlyReport[monthIndex].totalCommission += Number(bill.commission);
      monthlyReport[monthIndex].count += 1;
    }
  });

  monthlyReport.forEach((m) => {
    m.profit = m.totalBill - m.totalCommission;
  });

  const grandTotalBill = monthlyReport.reduce((sum, m) => sum + m.totalBill, 0);
  const grandTotalCommission = monthlyReport.reduce((sum, m) => sum + m.totalCommission, 0);
  const grandTotalProfit = monthlyReport.reduce((sum, m) => sum + m.profit, 0);
  const grandTotalCount = monthlyReport.reduce((sum, m) => sum + m.count, 0);

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
              <tr key={i} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => handleMonthClick(i)}>
                <td className="p-3 font-medium text-red-600 underline">{row.month}</td>
                <td className="p-3">{row.totalBill}</td>
                <td className="p-3">{row.totalCommission}</td>
                <td className="p-3 text-green-600 font-semibold">{row.profit}</td>
                <td className="p-3">{row.count}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-200 font-bold">
            <tr>
              <td className="p-3">Total</td>
              <td className="p-3">{grandTotalBill}</td>
              <td className="p-3">{grandTotalCommission}</td>
              <td className="p-3 text-green-700">{grandTotalProfit}</td>
              <td className="p-3">{grandTotalCount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default CarWashReport;
