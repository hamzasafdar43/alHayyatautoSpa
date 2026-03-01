import { useLocation, useParams } from "react-router-dom";

import React from "react";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

function CheckMonthlyReports() {
  const { tab, month } = useParams();
  const { state } = useLocation();

  const recordsToUse = state?.monthlyData || [];

  const monthIndex = parseInt(month) - 1;
  const monthName = new Date(0, monthIndex).toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const isCarWash = tab === "carwash";
  const isDetailingStudio = tab === "detailing-studio";
  const isOilShop = tab === "oil-shop";
  const isAccessoriesShop = tab === "accessorie-shop";
  const isGeneralExpense = tab === "general-expense";

  const isShop = isOilShop || isAccessoriesShop;
  const isService = isCarWash || isDetailingStudio;

  const downloadReportHandler = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`${tab.replace("-", " ")} - ${monthName} ${currentYear}`, 14, 20);

    let tableColumn = [];
    let tableRows = [];

    if (isOilShop) {
      // ----- SHOP COLUMNS -----
      tableColumn = ["Product Name", "Selling Price", "Cost", "Profit", "Date"];
      tableRows = recordsToUse.map((bill) => [
        bill.productName || "-",
        `PKR ${bill.productId?.sellingPrice || 0}`,
        `PKR ${bill.productId?.cost || 0}`,
        `PKR ${Number(bill.sellingPrice || 0) - Number(bill.productId?.cost || 0)}`,
        new Date(bill.createdAt).toLocaleDateString(),
      ]);
    } else if (isDetailingStudio) {
      // ----- DETAILING STUDIO COLUMNS -----
      tableColumn = ["Car Name", "Polish", "Detailing Master", "Bill (PKR)", "Commission", "Date", "Status"];
      tableRows = recordsToUse.map((bill) => [
        bill.carNameDetailing || bill.carName || "-",
        bill.polish || "-",
        bill.detailingMaster || "-",
        `PKR ${bill.detailingBill || 0}`,
        `PKR ${bill.commission || 0}`,
        new Date(bill.createdAt).toLocaleDateString(),
        bill.commissionStatus || "-",
      ]);
    } else if (isCarWash) {
      // ----- CAR WASH COLUMNS -----
      tableColumn = ["Car Name", "Car Washer", "Bill (PKR)", "Commission", "Date", "Status"];
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


  console.log("recordsToUse..........:", isShop ? recordsToUse.map(r => ({ productName: r.productId?.name, sellingPrice: r.productId?.sellingPrice, cost: r.productId?.cost, date: r.createdAt })) : "hello hello");
  
 

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 lg:mt-[50px] mt-[100px]">
      <div>
        <button
          className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer"
          onClick={downloadReportHandler}
        >
          Download Report
        </button>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        {tab.replace("-", " ").toUpperCase()} — {monthName} {currentYear}
      </h1>

      {recordsToUse.length === 0 ? (
        <div className="text-center text-gray-600 p-6 bg-gray-100 rounded-lg shadow">
          No {tab.replace("-", " ")} records found for {monthName} {currentYear}.
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full text-sm md:text-base text-left">
            <thead className="bg-purple-600 text-white">
              <tr>
                {isShop && <th className="p-3">Product Name</th>}
                {isShop && <th className="p-3">Selling Price</th>}
                {isShop && <th className="p-3">Cost</th>}
                {isShop && <th className="p-3">Profit</th>}

                {isService && <th className="p-3 whitespace-nowrap">Car Name</th>}
                {isDetailingStudio && <th className="p-3">Polish</th>}
                {isService && <th className="p-3 whitespace-nowrap">{isDetailingStudio ? "Detailing Master" : "Car Washer"}</th>}

                {isService && <th className="p-3 whitespace-nowrap">Bill (PKR)</th>}
                {isService && <th className="p-3 whitespace-nowrap">Commission</th>}
                <th className="p-3">Date</th>
                {isService && <th className="p-3 whitespace-nowrap">Status</th>}
              </tr>
            </thead>

            <tbody>
              {recordsToUse.map((bill) => (
                <tr key={bill._id} className="border-b hover:bg-gray-50 transition">
                  {isShop && <td className="p-3">{bill.productId?.name || "-"}</td>}
                  {isShop && <td className="p-3">{`PKR ${bill.productId?.sellingPrice || 0}`}</td>}
                  {isShop && <td className="p-3">{`PKR ${bill.productId?.cost || 0}`}</td>}
                  {isShop && <td className="p-3">{`PKR ${Number(bill.sellingPrice || 0) - Number(bill.productId?.cost || 0)}`}</td>}

                  {isService && <td className="p-3">{bill.carNameDetailing || bill.carName || "-"}</td>}
                  {isDetailingStudio && <td className="p-3">{bill.polish || "-"}</td>}
                  {isService && <td className="p-3">{isDetailingStudio ? bill.detailingMaster || "-" : bill.carWasher || "-"}</td>}

                  {isService && <td className="p-3 font-semibold text-green-700">{isDetailingStudio ? bill.detailingBill : bill.bill}</td>}
                  {isService && <td className="p-3 font-semibold text-green-700">{bill.commission}</td>}

                  <td className="p-3 whitespace-nowrap">{new Date(bill.createdAt).toLocaleDateString()}</td>

                  {isService && (
                    <td className="p-3">
                      <span
                        className={`text-white !text-[12px] p-2 rounded-[5px] cursor-pointer ${
                          bill.commissionStatus === "Paid" ? "bg-green-600 px-5" : "bg-[#2563ea]"
                        }`}
                      >
                        {bill.commissionStatus}
                      </span>
                    </td>
                  )}
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
