import React, { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";


function TodayCarWashbill({filteredBills}) {
  
    const columns = ["Sr_No" , "Time" , "CarName" ,"CarWasher" ,"Commission" , "Bill"]
    const rows = filteredBills.map((record, index) => ({
        Sr_No: index + 1,
        Time: new Date(record.createdAt).toLocaleTimeString(),
        CarName: record.carName,
        CarWasher: record.carWasher,
        Commission: record.commission,
        Bill: record.bill,
      }));
      
  return (
    <div className="w-[90%]">
      <CustomTable rows={rows} columns={columns} />
    </div>
  );
}

export default TodayCarWashbill;
