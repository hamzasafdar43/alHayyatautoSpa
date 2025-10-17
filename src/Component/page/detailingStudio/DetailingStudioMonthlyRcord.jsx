import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDeleteBillMutation } from "../../../features/Api";
import CustomTable from "../../common/CustomTable";
import CustomButton from "../../common/CustomButton";
import { showToast } from "../../common/CustomToast";
import CarWashBill from "./BillForm";


function DetailingStudioMonthlyRecord({ allCarWashBills = [] }) {
  const [isOpenDeleteRecord, setIsOpenDeleteRecord] = useState(false);
  const [isOpenUpdateRecord, setIsOpenUpdateRecord] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [deleteBill] = useDeleteBillMutation();

  // 🟨 Prepare table rows
  const rows = allCarWashBills.map((bill, index) => ({
    Sr_No: index + 1,
    Id: bill._id,
    Date: new Date(bill.createdAt).toLocaleDateString("en-GB", {
      timeZone: "Asia/Karachi",
    }),
    CarName: bill.carNameDetailing,
    CarWasher: bill.detailingMaster,
    Price: bill.detailingBill,
    Commission: bill.commission || 0,
  }));

  // 🟨 Open edit modal
  const handleUpdateRecord = (record) => {
    setSelectedRecord(record);
    setIsOpenUpdateRecord(true);
  };

  // 🟨 Open delete confirmation modal
  const handleDeleteRecord = (record) => {
    setSelectedRecord(record);
    setIsOpenDeleteRecord(true);
  };

  // 🟨 Confirm delete action
  const handleConfirmDelete = async () => {
    try {
      const response = await deleteBill(selectedRecord.Id).unwrap();
      if (response?.message === "Bill deleted successfully") {
        showToast(response.message, "success");
        setTimeout(() => setIsOpenDeleteRecord(false), 800);
      }
    } catch (error) {
      const errorMsg = error?.data?.message || "Failed to delete record!";
      showToast(errorMsg, "error");
    }
  };

  // 🟨 Table column headers
  const columns = [
    "Sr_No",
    "Id",
    "Date",
    "CarName",
    "CarWasher",
    "Price",
    "Commission",
    "Actions",
  ];

  return (
    <div className="w-[90%]">
      {/* ===== Header ===== */}
      <h1 className="mb-2 font-[500] text-lg">Detailing Bill Record</h1>

      {/* ===== Records Table ===== */}
      <CustomTable
        rows={rows}
        columns={columns}
        onClick={handleUpdateRecord}
        onClickDelete={handleDeleteRecord}
      />

      {/* ===== Update Modal ===== */}
      {isOpenUpdateRecord && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
          <div className="lg:w-[40%] sm:w-[50%] w-[90%] px-4 py-11 border-2 rounded-[10px] border-[#262626] bg-white">
            <div className="flex justify-end mb-2">
              <IoCloseSharp
                size={22}
                className="cursor-pointer"
                onClick={() => setIsOpenUpdateRecord(false)}
              />
            </div>

            <CarWashBill
              isOpenUpdateRecod={isOpenUpdateRecord}
              record={selectedRecord}
              setIsOpenUpdateRecod={setIsOpenUpdateRecord}
            />
          </div>
        </div>
      )}

      {/* ===== Delete Confirmation Modal ===== */}
      {isOpenDeleteRecord && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
          <div className="lg:w-[30%] sm:w-[40%] w-[90%] px-4 py-6 border-2 rounded-[10px] border-[#262626] bg-white">
            <h1 className="text-center text-md mt-4">
              Are you sure you want to delete this record?
            </h1>

            <div className="flex gap-8 my-8 justify-center">
              <CustomButton
                title="Delete"
                className="!bg-[#D17C16] !text-[18px] !w-[130px] !h-[50px]"
                onClick={handleConfirmDelete}
              />
              <CustomButton
                title="Cancel"
                className="!text-[18px] !w-[130px] !h-[50px]"
                onClick={() => setIsOpenDeleteRecord(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailingStudioMonthlyRecord;
