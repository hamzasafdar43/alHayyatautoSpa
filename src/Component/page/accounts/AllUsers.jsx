import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../common/CustomTable";
import { deleteUser, fetchUsers } from "../../../features/createSlice";
import CustomButton from "../../common/CustomButton";

function AllUsers() {
  const [isOpenConfirmDeleteUser, setIsOpenConfirmDeleteUser] = useState(false);
  const [isSelectedDeleteUserIndex, setIsSelectedDeleteUserIndex] =
    useState(null);
  const dispatch = useDispatch();

  // Get Redux state
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const rows = users.map((user, index) => ({
    Sr_No: index + 1,
    Id: user._id,
    Name: user.name,
    Email: user.email,
    Phone_Number: user.phoneNumber,
    Action: <div>Edit | Delete</div>, // you can enhance this later with actual buttons
  }));

  const columns = ["Sr_No", "Id", "Name", "Email", "Phone_Number", "Actions"];

  const onClickDelete = (record) => {
    setIsOpenConfirmDeleteUser(true);
    setIsSelectedDeleteUserIndex(record);
  };

  const confirmDeleteHandler = async () => {
    try {
      const response = await dispatch(
        deleteUser(isSelectedDeleteUserIndex?.Id)
      );
      setIsOpenConfirmDeleteUser(false);
      if (response?.payload?.message === "User deleted successfully") {
        dispatch(fetchUsers());
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="w-[90%]">
      {loading && <p>Loading users...</p>}
      {error && <p>Error: {error}</p>}
      <CustomTable
        rows={rows}
        columns={columns}
        onClickDelete={onClickDelete}
      />
      {isOpenConfirmDeleteUser && (
        <div className="fixed h-[100vh] w-full top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
          <div className="lg:w-[30%] sm:w-[40%] w-[90%]  px-4 py-5 h-auto border-2 rounded-[10px] border-[#262626] bg-white ">
            <div className="text-center text-md mt-8">
              <h1>Are You sure you want to this record delete</h1>
            </div>
            <div className="flex gap-8 my-8 justify-center">
              <CustomButton
                title="Delete"
                className="!bg-[#D17C16] !text-[18px] !w-[130px] !h-[50px] "
                onClick={() => confirmDeleteHandler()}
              />
              <CustomButton
                title="Cancel"
                className=" !text-[18px] !w-[130px] !h-[50px] "
                onClick={() => setIsOpenConfirmDeleteUser(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllUsers;
