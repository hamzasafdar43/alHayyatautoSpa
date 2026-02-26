import React from "react";
import CustomTable from "../../common/CustomTable";


function DetailingStudioTodayRecord({ filteredBills = [] }) {

  // 🟨 Define table columns
  const columns = ["Sr_No", "Time", "Car_Name", "Detailing_Master", "Commission", "Bill"];

  // 🟨 Map data into table rows
  const rows = filteredBills.map((bill, index) => ({
    Sr_No: index + 1,
    Time: new Date(bill.createdAt).toLocaleTimeString("en-GB", {
      timeZone: "Asia/Karachi",
    }),
    Car_Name: bill.carNameDetailing,
    Detailing_Master: bill.detailingMaster,
    Commission: bill.commission || 0,
    Bill: bill.detailingBill,
  }));

  return (
    <div className="w-[90%]">
      <CustomTable rows={rows} columns={columns} />
    </div>
  );
}

export default DetailingStudioTodayRecord;
