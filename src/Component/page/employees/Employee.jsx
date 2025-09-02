import { useEffect, useState } from "react";
import {
  useGetAllEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../../../features/Api";
import CustomTable from "../../common/CustomTable";
import AddEmployee from "./AddEmployee";
import { IoCloseSharp } from "react-icons/io5";
import AlertDelete from "../../common/AlertDelete";

function Employee({ onClick }) {
  const [employee, setEmployee] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [selectEmployee, setSelectEmployee] = useState("");

  const {
    data: allEmployees = [],
    isLoading,
    isError,
  } = useGetAllEmployeesQuery();

  const columns = [
    "Sr_No",
    "Id",
    "Name",
    "Email",
    "Phone_Number",
    "Designation",
    "Actions",
  ];

  const rows = allEmployees
    ?.slice()
    .reverse()
    .map((employee, index) => ({
      Sr_No: index + 1,
      Id: employee._id,
      Name: employee.name,
      Email: employee.email,
      Phone_Number: employee.phone,
      Designation: employee.designation,
    }));

  const addEmployeeHandler = () => {
    try {
      setIsOpen(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateEmployeeHandler = async (record) => {
    try {
      setEmployee(record);
      console.log("employee", employee);
      setIsOpen(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteEmployeeHandler = async (record) => {
    try {
      setSelectEmployee(record);
      setIsOpenDeleteAlert(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-[90%] mx-auto">
      <div className="h-[80px] w-full bg-white mt-[70px] mb-8 flex items-center justify-between px-8">
        <div className="flex gap-8">
          <h1
            className="text-lg font-[500] cursor-pointer "
            onClick={addEmployeeHandler}
          >
            + Add New Employee
          </h1>
        </div>
        <div className="border-[1px] border-[#262626] p-1 sm:block hidden w-[300px] font-[500] rounded-[8px]">
          <form action="">
            <input
              type="text"
              placeholder="Search"
              className="ml-2 outline-none"
            />
          </form>
        </div>
      </div>
      {
        allEmployees.length <= 0  ? (
         <div className="w-full h-[400px] flex flex-col justify-center items-center bg-gray-50 rounded-xl shadow-inner">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        No Employee Records Found
      </h1>
      <p className="text-gray-500 text-base">
        Start by adding a new employee record to manage your workforce.
      </p>
    </div>
        ): (

       
      <div>
        <div>
          <h1 className="text-lg font-[500] my-4 ">Employee</h1>
        </div>
        <div>
          <CustomTable
            onClick={updateEmployeeHandler}
            onClickDelete={deleteEmployeeHandler}
            rows={rows}
            columns={columns}
          />
        </div>
      </div>

       )

      }
      {isOpen && (
        <div className="fixed h-[100vh] w-full top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center z-50 justify-center ">
          <div className="lg:w-[40%] sm:w-[60%] w-[90%] px-4  h-auto border-2 rounded-[10px] border-[#262626]  bg-white  py-8">
            <div className="m-2 flex justify-end ">
              <IoCloseSharp
                size={20}
                onClick={() => {
                  setIsOpen(false), setEmployee("");
                }}
              />
            </div>
            <div>
              <AddEmployee setIsOpen={setIsOpen} employee={employee} />
            </div>
          </div>
        </div>
      )}
      {isOpenDeleteAlert && (
        <div>
          <AlertDelete
            isCancel={setIsOpenDeleteAlert}
            deleteEmplyee={selectEmployee}
          />
        </div>
      )}
    </div>
  );
}

export default Employee;
