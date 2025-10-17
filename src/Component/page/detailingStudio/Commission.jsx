import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../features/createSlice";
import {
  useGetAllBillsDetailingQuery,
  useGetAllEmployeesQuery,
  useGetDetailingBillByDateQuery,
  useUpdateCommissionStatusDetailingMutation,
  useUpdateCommissionStatusMutation,
} from "../../../features/Api";


// 🟨 Local Components
import CustomTable from "../../common/CustomTable";
import CustomButton from "../../common/CustomButton";
import CustomPopup from "../../common/CustomPopup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Commission() {
  const dispatch = useDispatch();

  // 🟨 State Management
  const [selectedCarWasher, setSelectedCarWasher] = useState("");
  const [filterType, setFilterType] = useState("day");
  const [startDate, setStartDate] = useState(new Date());
  const [selectAllMode, setSelectAllMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);


  // 🟨 API Queries
  const { data: allBills = [], refetch: refetchAllBills } = useGetAllBillsDetailingQuery(filterType);
  const { data: carWashBillsByDate = [], refetch: refetchByDate } = useGetDetailingBillByDateQuery(startDate);
  const { data: allEmployees = [] } = useGetAllEmployeesQuery();
  const [updateCommission] = useUpdateCommissionStatusDetailingMutation();

  // 🟨 Fetch Users on Mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // 🟨 Helpers — Filtering and Derived Data
  const filterBillsByWasher = (bills) =>
    selectedCarWasher ? bills.filter((bill) => bill.detailingMaster === selectedCarWasher) : bills;

  const billsToUse =
    filterType === "custom" ? filterBillsByWasher(carWashBillsByDate) : filterBillsByWasher(allBills);

  const pendingBills = billsToUse.filter((b) => b.commissionStatus === "pending");
  const paidBills = billsToUse.filter((b) => b.commissionStatus === "Paid");

  const totalPending = pendingBills.reduce((sum, b) => sum + parseFloat(b.commission || 0), 0);
  const totalPaid = paidBills.reduce((sum, b) => sum + parseFloat(b.commission || 0), 0);

  // 🟨 Table Data
  const columns = ["Sr_No", "Date", "Name", "Commission", "Status"];
  const rows = billsToUse.map((record, i) => ({
    Sr_No: i + 1,
    Id: record._id,
    Date: new Date(record.createdAt).toLocaleDateString(),
    Name: record.detailingMaster,
    Commission: record.commission,
    Status: record.commissionStatus || "Pending",
  }));

  // 🟨 Update Single Record
  const handleUpdateSingle = async (record) => {
    try {
      await updateCommission({ _id: record.Id }).unwrap();
      filterType === "custom" ? await refetchByDate() : await refetchAllBills();
    } catch (err) {
      console.error("Error updating commission:", err);
    }
  };

  // 🟨 Popup Handlers
  const handleCancel = () => setShowPopup(false);

  const handleConfirm = async () => {
    try {
      const pendingIds = pendingBills.map((bill) => bill._id);

      for (const _id of pendingIds) {
        await updateCommission({ _id }).unwrap();
      }

      if (filterType === "custom") await refetchByDate();
      else await refetchAllBills();

      setShowPopup(false);
      setSelectAllMode(false);
    } catch (error) {
      console.error("Error marking all as paid:", error);
    }
  };

  // 🟨 Select All Toggle
  const handleSelectAllClick = () => {
    selectAllMode ? setSelectAllMode(false) : setShowPopup(true);
  };

 
  return (
    <div className="w-[95%] md:w-[90%] mx-auto mt-6">
      {/* Filters Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        {/* Car Washer Dropdown */}
        <div className="flex-1 min-w-[250px]">
          <select
            className="border border-gray-400 rounded-lg w-full p-2 text-[16px] font-medium focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSelectedCarWasher(e.target.value)}
            value={selectedCarWasher}
          >
            <option value="">-- Select Detailing MasterS --</option>
            {allEmployees.map((user, idx) => (
              <option key={idx} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Type + Date Picker + Select All */}
        <div className="flex-1 flex flex-col sm:flex-row gap-3 items-center min-w-[250px]">
          <select
            className="w-full border border-gray-400 rounded-lg p-2 text-[16px] font-medium focus:ring-2 focus:ring-blue-400"
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
              className="border border-gray-400 rounded-lg p-2 text-[16px] w-full sm:w-auto"
            />
          )}

          <CustomButton
            title={selectAllMode ? "Unselect All" : "Select All"}
            className="!w-full sm:!w-[130px]"
            onClick={handleSelectAllClick}
          />
        </div>
      </div>

      {/* Table Section */}
      {selectedCarWasher && billsToUse.length === 0 ? (
        <div className="text-lg font-semibold text-gray-700 text-center">
          No records found for{" "}
          <span className="text-blue-600">{selectedCarWasher}</span> on selected {filterType}.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <CustomTable
              rows={rows}
              columns={columns}
              updateCommissionStatus={handleUpdateSingle}
              selectedAll={selectAllMode}
            />
          </div>

          {selectedCarWasher && (
            <div className="mt-6 space-y-2 text-center md:text-left">
              <p className="text-md font-semibold text-gray-700">
                Pending Commission ({selectedCarWasher}):{" "}
                <span className="text-blue-600">PKR {totalPending}</span>
              </p>
              <p className="text-md font-semibold text-gray-700">
                Paid Commission ({selectedCarWasher}):{" "}
                <span className="text-green-600">PKR {totalPaid}</span>
              </p>
            </div>
          )}
        </>
      )}

      {/* Popup */}
      {showPopup && (
        <CustomPopup
          show={showPopup}
          heading="Mark All as Paid?"
          title="This will mark all pending commissions as 'Paid'. Do you want to continue?"
          cancelText="Cancel"
          confirmText="Confirm"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}


export default Commission;
