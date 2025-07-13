import React, { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";


function TodayRecord({todayDetailingStudioBills}) {
    const columns = ["Sr_No" , "Time" , "CarName" ,"Detailing_Master" ,"Commission" , "Bill"]
    const rows = todayDetailingStudioBills?.map((record, index) => ({
        Sr_No: index + 1,
        Time: new Date(record.createdAt).toLocaleTimeString(),
        CarName: record.carNameDetailing,
        Detailing_Master: record?.detailingMaster,
        Commission: record.commission,
        Bill: record?.detailingBill
      }));
      
  return (
    <div className="w-[90%]">
      <CustomTable rows={rows} columns={columns} />
    </div>
  );
}



export default TodayRecord