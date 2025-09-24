import React from "react";
import { Formik, Form } from "formik";
import {
  useEmployeeAddMutation,
  useGetAllEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../../../features/Api";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { addProductValidationSchema } from "../validations/FormValidation";
import { showToast } from "../../common/CustomToast";

function AddEmployee({ setIsOpen, employee }) {
  const [AddEmployee] = useEmployeeAddMutation();

  const {
    data: allEmployees = {},
    isLoading,
    isError,
    refetch,
  } = useGetAllEmployeesQuery();
  const [updateEmployee] = useUpdateEmployeeMutation();

  const initialValuesForm = {
    name: employee?.Name || "",
    email: employee?.Email || "",
    phone: employee?.Phone_Number || "",
    designation: employee?.Designation || "",
  };

  const submitHandler = async (values) => {
    try {
      const response = await AddEmployee(values).unwrap();
      refetch();
      if (response?.message === "Employee created successfully") {
        showToast(response?.message, "success");
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "Something went wrong!";
      showToast(errorMessage, "error");
    }
  };

  const updateEmployeeHandler = async (values) => {
  try {
    const employeeId = employee?.Id;

    const res = await updateEmployee({ id: employeeId, ...values }).unwrap();
    refetch();

    if (res?.message === "Employee updated successfully") {
      showToast(res?.message, "success");  
      setTimeout(() => {
        setIsOpen(false);  
      }, 2000);
    }
  } catch (error) {
    const errorMessage = error?.data?.message || "Something went wrong!";
    showToast(errorMessage, "error");  
  }
};


  return (
    <div>
      <div>
        <h1 className="text-[#262626] font-[700] text-2xl mx-auto w-full flex justify-center">
          {employee ? "UPDATE" : "Employee"}
        </h1>
      </div>

      <Formik
        initialValues={initialValuesForm}
        onSubmit={employee ? updateEmployeeHandler : submitHandler}
        // validationSchema={addProductValidationSchema}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <CustomInput name="name" type="text" label="Employee Name" />
              <CustomInput name="email" type="text" label="Employee Email" />
              <CustomInput name="phone" type="text" label="Phone Number" />
              <CustomInput name="designation" type="text" label="Designation" />
            </div>
            <div className="mt-8 w-full">
              <CustomButton type="submit" title="SUBMIT" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddEmployee;
