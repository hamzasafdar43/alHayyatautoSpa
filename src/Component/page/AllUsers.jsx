import React, { useEffect } from "react";
import CustomTable from "../common/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/createSlice";

function AllUsers() {
  const dispatch = useDispatch();

  // Get Redux state
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]);

  const rows = users.map((user, index) => ({
    Sr_No: index + 1,
    Name: user.name,
    Email: user.email,
    Phone_Number: user.phoneNumber,
    Action: <div>Edit | Delete</div>, // you can enhance this later with actual buttons
  }));

  const columns = ["Sr_No", "Name", "Email", "Phone_Number", "Action"];

  return (
    <div className="w-[90%]">
      {loading && <p>Loading users...</p>}
      {error && <p>Error: {error}</p>}
      <CustomTable rows={rows} columns={columns} />
    </div>
  );
}

export default AllUsers;
