import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../features/createSlice";
import {
  useGetAllBillsQuery,
  useGetAllEmployeesQuery,
  useGetCarWashBillByDateQuery,
  useUpdateCommisstionStatusMutation,
} from "../../../features/Api";
import CustomTable from "../../common/CustomTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Commission() {
  const [selectedCarWasher, setSelectedCarWasher] = useState("");
  const [filterType, setFilterType] = useState("day");
  const [startDate, setStartDate] = useState(new Date());

  // Queries
  const { data: allBills = [] } = useGetAllBillsQuery(filterType);
  const { data: CarWashBillByDate = [] } = useGetCarWashBillByDateQuery(startDate);
  const { data: allEmployees = [] } = useGetAllEmployeesQuery();
  const [paidCommission] = useUpdateCommisstionStatusMutation()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Helper → filter by washer
  const filterBillsByWasher = (bills) =>
    selectedCarWasher
      ? bills.filter((bill) => bill.carWasher === selectedCarWasher)
      : bills;

  // Decide which bills to use (custom vs default)
  const billsToUse =
    filterType === "custom" && CarWashBillByDate
      ? filterBillsByWasher(CarWashBillByDate)
      : filterBillsByWasher(allBills);

  // Calculate total commission
  const totalCommission = billsToUse.reduce(
    (total, record) => total + parseFloat(record.commission || 0),
    0
  );

  // Table data
  const columns = ["Sr_No", "Date", "Name", "Commission" , "Status"];
  const rows = billsToUse.map((record, index) => ({
    Sr_No: index + 1,
    Id: record._id,
    Date: new Date(record.createdAt).toLocaleDateString(),
    Name: record.carWasher,
    Commission: record.commission,
    Status: record.status || "Pending", // include real status here
    
  }));



const updateCommissionStatus = async (record) => {
  try {
    const _id = record.Id;
    const response = await paidCommission(_id);
    console.log("response:", response);

    
  } catch (error) {
    console.log("error:", error);
  }
};


  return (
    <div className="w-[90%]">
      {/* Top Filters */}
      <div className="flex justify-between items-center">
        {/* Car Washer Dropdown */}
        <div className="w-[200px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <select
              className="border-[1px] border-[#262626] rounded-[10px] w-full p-2 my-8"
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
        </div>

        {/* Filter Type Dropdown + DatePicker */}
        <div className="w-[200px]">
          <select
            className="w-full border-[1px] border-black rounded-[10px] p-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="custom">Custom</option>
          </select>

          {filterType === "custom" && (
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="mt-2 w-full border border-black rounded-[10px] p-2"
            />
          )}
        </div>
      </div>

      {/* Records Table + Commission */}
      {selectedCarWasher && billsToUse.length === 0 ? (
        <div className="text-lg font-semibold my-4">
          No records found for {selectedCarWasher} on selected {filterType}.
        </div>
      ) : (
        <>
          <div>
            <CustomTable rows={rows} columns={columns}  updateCommissionStatus={updateCommissionStatus}/>
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
