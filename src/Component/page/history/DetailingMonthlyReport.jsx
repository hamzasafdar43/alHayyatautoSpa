import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAlldetailingStudioBilQuery } from '../../../features/Api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // <- Import correctly

function DetailingMonthlyReport() {
  const { month } = useParams(); 
  const { data, isLoading, error } = useGetAlldetailingStudioBilQuery();

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error loading detailing bills</div>;

  const monthIndex = parseInt(month) - 1;
  const monthName = new Date(0, monthIndex).toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  const monthlyData = data?.filter(bill => {
    const date = new Date(bill.createdAt);
    return date.getFullYear() === currentYear && date.getMonth() === monthIndex;
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Detailing Studio Report - ${monthName} ${currentYear}`, 14, 20);

    const tableColumn = ["Car Name", "Polish", "Detailing Master", "Bill", "Date"];
    const tableRows = [];

    monthlyData.forEach(bill => {
      tableRows.push([
        bill.carNameDetailing || bill.carName || '-',
        bill.polish,
        bill.detailingMaster,
        bill.detailingBill,
        new Date(bill.createdAt).toLocaleDateString()
      ]);
    });

    // Use autoTable plugin
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save(`DetailingReport_${monthName}_${currentYear}.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Detailing Studio Report - {monthName} {currentYear}
      </h2>

      <button
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        onClick={handleDownloadPDF}
      >
        Download PDF
      </button>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left border border-gray-300">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3">Car Name</th>
              <th className="p-3">Polish</th>
              <th className="p-3">Detailing Master</th>
              <th className="p-3">Bill</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData?.map(bill => (
              <tr key={bill._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{bill.carNameDetailing || bill.carName || '-'}</td>
                <td className="p-3">{bill.polish}</td>
                <td className="p-3">{bill.detailingMaster}</td>
                <td className="p-3">{bill.detailingBill}</td>
                <td className="p-3">{new Date(bill.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailingMonthlyReport;
