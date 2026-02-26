import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import CustomSelect from "../../common/CustomSelect";
import { fetchUsers } from "../../../features/createSlice";
import {
  useGetAllEmployeesQuery,
  useUpdateBillMutation,
} from "../../../features/Api";
import { showToast } from "../../common/CustomToast";

function BillForm({
  isOpenUpdateRecod,
  record,
  setIsOpenUpdateRecod,
  setCarWashBill,
  setSelectBillForm,
}) {
  const dispatch = useDispatch();

  // 🟨 RTK Query Hooks
  const { data: allEmployees = [] } = useGetAllEmployeesQuery();
  const [updateBill] = useUpdateBillMutation();

  // 🟨 Fetch Users (Redux)
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // 🟨 Initial Values
  const initialValues = isOpenUpdateRecod
    ? {
        carName: record?.CarName || "",
        carWasher: record?.CarWasher || "",
        bill: record?.Price || "",
        phoneNumber: record?.phoneNumber || "",
        commission: record?.Commission || "",
      }
    : {
        category: "",
        carName: "",
        carWasher: "",
        bill: "",
        phoneNumber: "",
        commission: "",
      };

  // 🟨 Car Washer Dropdown Options
  const carWasherOptions = allEmployees.map((emp) => ({
    value: emp.name,
    label: emp.name,
  }));

  // 🟨 Create Bill Handler
  const handleCreateBill = (values) => {
    setCarWashBill((prev) => [...prev, values]);
    setSelectBillForm("");
  };

  // 🟨 Update Bill Handler
  const handleUpdateBill = async (values) => {
    try {
      const response = await updateBill({ id: record.Id, ...values }).unwrap();
      if (response.message === "Car wash bill updated successfully") {
        showToast(response.message, "success");
        setTimeout(() => setIsOpenUpdateRecod(false), 1500);
      }
    } catch (error) {
      const msg = error?.data?.message || "Something went wrong!";
      showToast(msg, "error");
    }
  };

  return (
    <div>
      <h1 className="text-[#262626] font-[700] text-2xl text-center mb-6">
        {isOpenUpdateRecod ? "Update Record" : "Generate Bill"}
      </h1>

      <Formik
        initialValues={initialValues}
        onSubmit={isOpenUpdateRecod ? handleUpdateBill : handleCreateBill}
      >
        {({ setFieldValue, values }) => {
          useEffect(() => {
            if (!isOpenUpdateRecod) setFieldValue("category", "CarWash");
          }, [setFieldValue]);

          return (
            <Form>
              {/* Category */}
              {!isOpenUpdateRecod && (
                <CustomInput
                  name="category"
                  type="text"
                  label="Category"
                  value={values.category}
                  disabled
                />
              )}

              {/* Car Name */}
              <CustomInput name="carName" type="text" label="Car Name" />

              {/* Car Washer */}
              <CustomSelect
                name="carWasher"
                label="Car Washer"
                option={carWasherOptions}
                onChange={(e) => setFieldValue("carWasher", e.target.value)}
              />

              {/* Bill */}
              <CustomInput name="bill" type="number" label="Bill" />

              {/* Phone Number (only for new record) */}
              {!isOpenUpdateRecod && (
                <CustomInput
                  name="phoneNumber"
                  type="text"
                  label="Phone Number"
                />
              )}

              {/* Commission */}
              <CustomInput name="commission" type="number" label="Commission" />

              {/* Submit / Update */}
              <div className="mt-8">
                <CustomButton
                  type="submit"
                  title={isOpenUpdateRecod ? "Update" : "Submit"}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default BillForm;
