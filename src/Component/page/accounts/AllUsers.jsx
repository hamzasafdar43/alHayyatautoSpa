import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../common/CustomTable";
import { deleteUser, fetchUsers } from "../../../features/createSlice";

function AllUsers() {
  const dispatch = useDispatch();

  // Get Redux state
  const { users, loading, error } = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]);

  const rows = users.map((user, index) => ({
    Sr_No: index + 1,
    Id :user._id,
    Name: user.name,
    Email: user.email,
    Phone_Number: user.phoneNumber,
    Action: <div>Edit | Delete</div>, // you can enhance this later with actual buttons
  }));

  const columns = ["Sr_No", "Id" ,  "Name", "Email", "Phone_Number", "Actions"];

  const onClickDelete = async(record) => {
   
    try {
      const response = await dispatch(deleteUser(record?.Id))
      console.log("response ..." , response)
      if(response?.payload?.message === "User deleted successfully"){
        dispatch(fetchUsers()); 
      }
    } catch (error) {
      console.log("error")
    }
  }

  return (
    <div className="w-[90%]">
      {loading && <p>Loading users...</p>}
      {error && <p>Error: {error}</p>}
      <CustomTable rows={rows} columns={columns} onClickDelete={onClickDelete} />
    </div>
  );
}

export default AllUsers;
