import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllBillsQuery } from '../../../features/Api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // <- Import autoTable correctly

function CheckMonthlyReport() {
  const { month } = useParams(); // 1 = Jan, 2 = Feb ...
  const { data, isLoading, error } = useGetAllBillsQuery();

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error loading bills</div>;

  const monthIndex = parseInt(month) - 1;
  const monthName = new Date(0, monthIndex).toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  const monthlyData = data?.filter(bill => {
    const date = new Date(bill.createdAt);
    return date.getFullYear() === currentYear && date.getMonth() === monthIndex;
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Car Wash Report - ${monthName} ${currentYear}`, 14, 20);

    const tableColumn = ["Car Name", "Bill", "Commission", "Car Washer", "Phone", "Date"];
    const tableRows = monthlyData.map(bill => [
      bill.carName,
      bill.bill,
      bill.commission,
      bill.carWasher,
      bill.phoneNumber,
      new Date(bill.createdAt).toLocaleDateString()
    ]);

    // Use autoTable as a function, not doc.autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save(`CarWashReport_${monthName}_${currentYear}.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Car Wash Report - {monthName} {currentYear}
      </h2>

      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleDownloadPDF}
      >
        Download PDF
      </button>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Car Name</th>
              <th className="p-3">Bill</th>
              <th className="p-3">Commission</th>
              <th className="p-3">Car Washer</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData?.map((bill) => (
              <tr key={bill._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{bill.carName}</td>
                <td className="p-3">{bill.bill}</td>
                <td className="p-3">{bill.commission}</td>
                <td className="p-3">{bill.carWasher}</td>
                <td className="p-3">{bill.phoneNumber}</td>
                <td className="p-3">{new Date(bill.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CheckMonthlyReport;
