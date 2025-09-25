import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../features/createSlice";
import { useGetAllBillsQuery, useGetAllEmployeesQuery } from "../../../features/Api";
import CustomTable from "../../common/CustomTable";

function Commission() {
  const [selectedCarWasher, setSelectedCarWasher] = useState("");
  const [filterType, setFilterType] = useState("day");

  const { data: allBills = [] } = useGetAllBillsQuery(filterType);

  const dispatch = useDispatch();
  const { data: allEmployees = [] } = useGetAllEmployeesQuery();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filter bills based on selected car washer
  const filteredBills = selectedCarWasher
    ? allBills.filter((bill) => bill.carWasher === selectedCarWasher)
    : allBills;

  // Calculate total commission for filtered bills
  const totalCommission = filteredBills.reduce(
    (total, record) => total + parseFloat(record.commission || 0),
    0
  );

  const columns = ["Sr_No", "Date", "Name", "Commission"];
  const rows = filteredBills.map((record, index) => ({
    Sr_No: index + 1,
    Date: new Date(record.createdAt).toLocaleDateString(),
    Name: record.carWasher,
    Commission: record.commission,
  }));

  return (
    <div className="w-[90%]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <select
          className="border-[1px] border-[#262626] rounded-[10px] w-[50%] p-2 my-8"
          onChange={(e) => setSelectedCarWasher(e.target.value)}
          value={selectedCarWasher}
          name="carWasher"
        >
          <option value="">-- Select Car Washer --</option>
          {allEmployees.map((user, index) => (
            <option key={index} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </form>

      {selectedCarWasher && filteredBills.length === 0 ? (
        <div className="text-lg font-semibold my-4">
          Today {selectedCarWasher} has not washed any car.
        </div>
      ) : (
        <>
          <div>
            <CustomTable rows={rows} columns={columns} />
          </div>

          {selectedCarWasher && (
            <div className="text-lg font-semibold my-4">
              Total Commission for {selectedCarWasher}: PKR {totalCommission}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Commission;
