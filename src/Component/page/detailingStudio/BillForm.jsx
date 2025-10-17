import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/createSlice";
import { useGetAllEmployeesQuery } from "../../../features/Api";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import CustomSelect from "../../common/CustomSelect";

function BillForm({ setCarWashBill, setSelectBillForm }) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  //🟨 Fetch all detailing employees from API
  const { data: allEmployees = [] } = useGetAllEmployeesQuery();

  //🟨 Fetch users once when the component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  //🟨 Initial form values
  const initialValues = {
    category: "",
    carNameDetailing: "",
    polish: "",
    detailingMaster: "",
    detailingBill: "",
    commission: "",
  };

  //🟨 Add new bill and close form on submit
  const handleSubmit = (values) => {
    setCarWashBill((prev) => [...prev, values]);
    setSelectBillForm("");
  };

  //🟨 Dropdown options for Detailing Master (employees)
  const detailingMasterOptions = allEmployees.map((emp) => ({
    value: emp.name,
    label: emp.name,
  }));

  //🟨 Dropdown options for polish type
  const detailingPolishOptions = [
    { value: "basic", label: "Basic Polish" },
    { value: "premium", label: "Premium Polish" },
    { value: "ceramic", label: "Ceramic Coating" },
  ];

  return (
    <div className="w-full mx-auto mt-6">
      {/* Title */}
      <h1 className="text-[#262626] font-bold text-2xl text-center mb-6">
        Car Detailing
      </h1>

      {/* Formik wrapper for form state management */}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => {
          // Set form category automatically
          useEffect(() => {
            setFieldValue("category", "cardetailng");
          }, [setFieldValue]);

          return (
            <Form className="space-y-4">
              {/* Hidden category field */}
              <div className="hidden">
                <CustomInput
                  name="category"
                  type="text"
                  label="Category"
                  value={values.category}
                  disabled
                />
              </div>

              {/* Car name input */}
              <CustomInput
                name="carNameDetailing"
                type="text"
                label="Car Name"
              />

              {/* Polish type select */}
              <CustomSelect
                name="polish"
                label="Polish"
                option={detailingPolishOptions}
                onChange={(e) => setFieldValue("polish", e.target.value)}
              />

              {/* Detailing master select */}
              <CustomSelect
                name="detailingMaster"
                label="Detailing Master"
                option={detailingMasterOptions}
                onChange={(e) => setFieldValue("detailingMaster", e.target.value)}
              />

              {/* Bill and Commission inputs */}
              <CustomInput name="detailingBill" type="text" label="Bill" />
              <CustomInput name="commission" type="text" label="Commission" />

              {/* Submit button */}
              <div className="mt-8">
                <CustomButton type="submit" title="Submit" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default BillForm;
