import React from "react";
import CustomButton from "./CustomButton";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
} from "../../features/Api";
import { showToast } from "./CustomToast";

function AlertDelete({ isCancel, deleteEmplyee }) {
  const [deleteEmployeeRecord] = useDeleteEmployeeMutation();
  const { data, refetch } = useGetAllEmployeesQuery();

 const employeeDeleteHandler = async () => {
  try {
    const employeeId = deleteEmplyee.Id;
    const res = await deleteEmployeeRecord(employeeId).unwrap();

    if (res?.message === "Employee deleted successfully") {
      showToast(res?.message, "success");
      setTimeout(() => {
        isCancel(false);
      }, 1000);
      refetch();
    }
  } catch (error) {
    showToast("Failed to delete employee", "error");
  }
};


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="lg:w-[28%] sm:w-[40%] w-[90%] px-6 py-8 rounded-2xl shadow-lg border border-gray-200 bg-white">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Confirm Deletion
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Are you sure you want to delete this record?
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 justify-center">
          <CustomButton
            title="Delete"
            className="!bg-red-600 hover:!bg-red-700 !text-white !text-base font-medium !w-[120px] !h-[45px] rounded-lg transition-all"
            onClick={employeeDeleteHandler}
          />
          <CustomButton
            title="Cancel"
            className="!bg-gray-200 hover:!bg-gray-300 !text-gray-700 !text-base font-medium !w-[120px] !h-[45px] rounded-lg transition-all"
            onClick={() => isCancel(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default AlertDelete;
