import { useLocation, useParams } from "react-router-dom";

import React from "react";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

function CheckMonthlyReports() {
  const { tab, month } = useParams();
  const { state } = useLocation();

  const recordsToUse = state?.monthlyData || [];

  const monthIndex = parseInt(month) - 1;
  const monthName = new Date(0, monthIndex).toLocaleString("default", {
    month: "long",
  });
  const currentYear = new Date().getFullYear();

  const isCarWash = tab === "car-wash";
  const isDetailingStudio = tab === "detailing-studio";

  const downloadReportHandler = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`${tab} - ${monthName} ${currentYear}`, 14, 20);

    let tableColumn = [];
    let tableRows = [];

    if (isDetailingStudio) {
      // ----- DETAILING STUDIO COLUMNS -----
      tableColumn = [
        "Car Name",
        "Polish",
        "Detailing Master",
        "Bill (PKR)",
        "Commission",
        "Date",
        "Status",
      ];

      tableRows = recordsToUse.map((bill) => [
        bill.carNameDetailing || bill.carName || "-",
        bill.polish || "-",
        bill.detailingMaster || "-",
        `PKR ${bill.detailingBill || 0}`,
        `PKR ${bill.commission || 0}`,
        new Date(bill.createdAt).toLocaleDateString(),
        bill.commissionStatus || "-",
      ]);
    } else {
      // ----- CAR WASH COLUMNS -----
      tableColumn = [
        "Car Name",
        "Car Washer",
        "Bill (PKR)",
        "Commission",
        "Date",
        "Status",
      ];

      tableRows = recordsToUse.map((bill) => [
        bill.carName || "-",
        bill.carWasher || "-",
        `PKR ${bill.bill || 0}`,
        `PKR ${bill.commission || 0}`,
        new Date(bill.createdAt).toLocaleDateString(),
        bill.commissionStatus || "-",
      ]);
    }

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [128, 0, 128] },
    });

    doc.save(`${tab}_Report_${monthName}_${currentYear}.pdf`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 lg:mt-[50px] mt-[100px]">
      <div>
        <button
          className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer"
          onClick={downloadReportHandler}
        >
          download report
        </button>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        {tab.replace("-", " ").toUpperCase()} — {monthName} {currentYear}
      </h1>

      {recordsToUse.length === 0 ? (
        <div className="text-center text-gray-600 p-6 bg-gray-100 rounded-lg shadow">
          No {tab} records found for {monthName} {currentYear}.
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full text-sm md:text-base text-left">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-3 whitespace-nowrap">Car Name</th>

                {isDetailingStudio && (
                  <th className="p-3 whitespace-nowrap">Polish</th>
                )}

                <th className="p-3 whitespace-nowrap">
                  {isDetailingStudio ? "Detailing Master" : "Car Washer"}
                </th>

                <th className="p-3 whitespace-nowrap">Bill (PKR)</th>
                <th className="p-3 whitespace-nowrap">Commission</th>
                <th className="p-3 whitespace-nowrap">Date</th>
                <th className="p-3 whitespace-nowrap">Status</th>
              </tr>
            </thead>

            <tbody>
              {recordsToUse.map((bill) => (
                <tr
                  key={bill._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    {bill.carNameDetailing || bill.carName || "-"}
                  </td>

                  {isDetailingStudio && (
                    <td className="p-3">{bill.polish || "-"}</td>
                  )}

                  <td className="p-3">
                    {isDetailingStudio
                      ? bill.detailingMaster || "-"
                      : bill.carWasher || "-"}
                  </td>

                  <td className="p-3 font-semibold text-green-700">
                    {isDetailingStudio ? bill.detailingBill : bill.bill}
                  </td>
                  <th className="p-3 font-semibold text-green-700">
                    {isDetailingStudio ? bill.commission : bill.commission}
                  </th>

                  <td className="p-3 whitespace-nowrap">
                    {new Date(bill.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <span
                      className={`text-white !text-[12px] p-2 rounded-[5px] cursor-pointer ${
                        bill.commissionStatus === "Paid"
                          ? "bg-green-600 px-5"
                          : "bg-[#2563ea]"
                      }`}
                    >
                      {bill.commissionStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CheckMonthlyReports;
