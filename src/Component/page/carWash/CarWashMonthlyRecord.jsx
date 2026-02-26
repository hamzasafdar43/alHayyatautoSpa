import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDeleteBillMutation } from "../../../features/Api";
import { showToast } from "../../common/CustomToast";
import CustomTable from "../../common/CustomTable";
import CustomPopup from "../../common/CustomPopup";
import CarWashBill from "./BillForm";


function CarWashMonthlyRecord({ allCarWashBills }) {
  
  // 🟨 Local State
  const [isOpenUpdateRecod, setIsOpenUpdateRecod] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectRecordIndex, setSelectRecordIndex] = useState(null);

  // 🟨 RTK Query Hook
  const [deleteBill] = useDeleteBillMutation();


  // 🟨 Table Rows
  const rows = allCarWashBills.map((bills, index) => ({
    Sr_No: index + 1,
    Id: bills._id,
    Date: new Date(bills.createdAt).toLocaleDateString("en-GB", {
      timeZone: "Asia/Karachi",
    }),
    CarName: bills.carName,
    CarWasher: bills.carWasher,
    Price: bills.bill,
    Commission: bills?.commission,
  }));

  // 🟨 Table Columns
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

  // 🟨 Update Record
  const updateRecordHandler = (record) => {
    setSelectRecordIndex(record);
    setIsOpenUpdateRecod(true);
  };

  // 🟨 Close Update Modal
  const updateRecordCloseHandler = () => {
    setIsOpenUpdateRecod(false);
  };

  // 🟨 Delete Record
  const deleteRecordHandler = (record) => {
    setSelectRecordIndex(record);
    setShowDeletePopup(true);
  };

  // 🟨 Confirm Delete
  const confirmDeleteHandler = async () => {
    try {
      const response = await deleteBill(selectRecordIndex.Id).unwrap();
      if (response.message === "Bill deleted successfully") {
        showToast(response?.message, "success");
        setTimeout(() => setShowDeletePopup(false), 1000);
      }
      // Optionally: refetch or trigger state update here
    } catch (error) {
      const errorMessage = error?.data?.message || "Something went wrong!";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="w-[90%]">
      {/* Heading */}
      <div>
        <h1 className="mb-2 font-[500] text-lg">Car Wash Bill Record...</h1>
      </div>

      {/* Table */}
      <div>
        <CustomTable
          rows={rows}
          columns={columns}
          onClick={updateRecordHandler}
          onClickDelete={deleteRecordHandler}
        />
      </div>

      {/* Update Record Popup */}
      {isOpenUpdateRecod && (
        <div className="fixed h-[100vh] w-full top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
          <div className="lg:w-[40%] sm:w-[50%] w-[90%] px-4 py-11 h-auto border-2 rounded-[10px] border-[#262626] bg-white">
            <div className="flex justify-end m-2">
              <IoCloseSharp size={20} onClick={updateRecordCloseHandler} />
            </div>
            <div>
              <CarWashBill
                isOpenUpdateRecod={isOpenUpdateRecod}
                record={selectRecordIndex}
                setIsOpenUpdateRecod={setIsOpenUpdateRecod}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <CustomPopup
          show={showDeletePopup}
          heading="Delete Record?"
          title="Are you sure you want to delete this record?"
          cancelText="Cancel"
          confirmText="Delete"
          onCancel={() => setShowDeletePopup(false)}
          onConfirm={confirmDeleteHandler}
        />
      )}
    </div>
  );
}

export default CarWashMonthlyRecord;
