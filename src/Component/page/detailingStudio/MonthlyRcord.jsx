import React, { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import {
  useDeleteBillMutation,
  useGetAllBillsQuery,
  useGetAlldetailingStudioBilQuery,
} from "../../../features/Api";
import { IoCloseSharp } from "react-icons/io5";
import CustomButton from "../../common/CustomButton";
import { showToast } from "../../common/CustomToast";
import CarWashBill from "../carWash/CarWashBill";

function MonthlyRcord() {
  const [isOpenDeleteeRecod, setIsOpenDeleteeRecod] = useState(false);
  const [isOpenUpdateRecod, setIsOpenUpdateRecod] = useState(false);
  const [selectRecordIndex, setSelectRecordIndex] = useState(null);

  const { data: allBills = [], refetch } = useGetAlldetailingStudioBilQuery();
  const [deleteBill] = useDeleteBillMutation();

  console.log("allBills" , allBills)

  const getCurrentMonthBill = allBills.filter((item) => {
    const createdDate = new Date(item.createdAt);
    const now = new Date();
    return (
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getFullYear() === now.getFullYear()
    );
  });

  const rows = getCurrentMonthBill.map((bills, index) => ({
    Sr_No: index + 1,
    Id: bills._id,
    Date: new Date(bills.createdAt).toLocaleDateString("en-GB", {
      timeZone: "Asia/Karachi",
    }),
    CarName: bills?.carName,
    Detailing_Master: bills?.detailingMaster,
    Price: bills?.detailingBill,
    Commission: bills?.commission,
  }));

  const updateRecordHandler = (record) => {
    setSelectRecordIndex(record);
    setIsOpenUpdateRecod(true);
  };

  const updateRecordCloseHandler = () => {
    setIsOpenUpdateRecod(false);
  };

  const deleteRecordHandler = (record) => {
    setSelectRecordIndex(record);
    setIsOpenDeleteeRecod(true);
  };

  const confirmDeleteHandler = async () => {
    try {
      const response = await deleteBill(selectRecordIndex.Id).unwrap();
      if (response.message === "Bill deleted successfully") {
        showToast(response?.message, "success");
        setTimeout(() => {
          setIsOpenDeleteeRecod(false);
        }, 1000);
      }

      refetch();
    } catch (error) {
      const errorMessage = error?.data?.message || "Something went wrong!";
      showToast(errorMessage, "error");
    }
  };

  const columns = [
    "Sr_No",
    "Id",
    "Date",
    "CarName",
    "Detailing_Master",
    "Price",
    "Commission",
    "Actions",
  ];
  return (
    <div className="w-[90%]">
      <div>
        <h1 className=" mb-2 font-[500] text-lg">Car Wash Bill Record...</h1>
      </div>
      <div>
        <CustomTable
          rows={rows}
          columns={columns}
          onClick={updateRecordHandler}
          onClickDelete={deleteRecordHandler}
        />
      </div>
      <div>
        {isOpenUpdateRecod && (
          <div className="fixed h-[100vh] w-full top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
            <div className="lg:w-[40%] sm:w-[50%] w-[90%] px-4 py-11 h-auto border-2 rounded-[10px] border-[#262626] bg-white ">
              <div className="flex justify-end m-2 ">
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
      </div>
      {isOpenDeleteeRecod && (
        <div className="fixed h-[100vh] w-full top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
          <div className="lg:w-[30%] sm:w-[40%] w-[90%]  px-4 py-5 h-auto border-2 rounded-[10px] border-[#262626] bg-white ">
            <div className="text-center text-md mt-8">
              <h1>Are You sure you want to this record delete</h1>
            </div>
            <div className="flex gap-8 my-8 justify-center">
              <CustomButton
                title="Delete"
                className="!bg-[#D17C16] !text-[18px] !w-[130px] !h-[50px] "
                onClick={confirmDeleteHandler}
              />
              <CustomButton
                title="Cancel"
                className=" !text-[18px] !w-[130px] !h-[50px] "
                onClick={() => setIsOpenDeleteeRecod(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




export default MonthlyRcord