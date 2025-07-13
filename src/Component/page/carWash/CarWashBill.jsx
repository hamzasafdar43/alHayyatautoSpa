import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import CustomSelect from "../../common/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/createSlice";
import { useUpdateBillMutation } from "../../../features/Api";
import {
  SignupSchema,
  updateRecordValidationSchema,
} from "../validations/FormValidation";
import { showToast } from "../../common/CustomToast";

function CarWashBill({
  isOpenUpdateRecod,
  record,
  setIsOpenUpdateRecod,
  setCarWashBill,
  setSelectBillForm,
}) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const [updateBill] = useUpdateBillMutation();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const initialValueUpdate = {
    carName: record?.CarName || "",
    carWasher: record?.CarWasher || "",
    bill: record?.Price || "",
    phoneNumber: record?.phoneNumber || "",
    commission: record?.Commission || "",
  };

  const initialValuesForm = {
    category: "",
    carName: "",
    carWasher: "",
    bill: "",
    phoneNumber: "",
    commission: "",
  };

  const submitHandler = async (values) => {
    setCarWashBill((prev) => [...prev, values]);
    setSelectBillForm("");
  };

  const carWasherOptions = users
    .filter((user) => user)
    .map((user) => ({
      value: user.name,
      label: user.name,
    }));

  const updateHandler = async (values) => {
    try {
      const response = await updateBill({ id: record.Id, ...values }).unwrap();
      if (response.message === "Car wash bill updated successfully") {
        showToast(response?.message, "success");
        setTimeout(() => {
          setIsOpenUpdateRecod(false);
        }, 2000);
      }
      refetch();
    } catch (error) {
      const errorMessage = error?.data?.message || "Something went wrong!";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-[#262626] font-[700] text-2xl mx-auto w-full flex justify-center ">
          {isOpenUpdateRecod ? "Update Record " : "Generate Bill"}
        </h1>
      </div>
      <Formik
        initialValues={
          isOpenUpdateRecod && record ? initialValueUpdate : initialValuesForm
        }
        validationSchema={
          isOpenUpdateRecod && record
            ? updateRecordValidationSchema
            : SignupSchema
        }
        onSubmit={isOpenUpdateRecod ? updateHandler : submitHandler}
      >
        {({ setFieldValue, values }) => {
          useEffect(() => {
            setFieldValue("category", "CarWash");
          }, [setFieldValue]);

          return (
            <Form>
              <CustomInput
                name="category"
                type="text"
                label="Category"
                value={values.category}
                disabled
              />
              <CustomInput name="carName" type="text" label="Car Name" />
              <CustomSelect
                name="carWasher"
                label="Car Washer"
                option={carWasherOptions}
                onChange={(e) => setFieldValue("carWasher", e.target.value)}
              />
              <CustomInput name="bill" type="text" label="Bill" />
              {!isOpenUpdateRecod && (
                <CustomInput
                  name="phoneNumber"
                  type="text"
                  label="Phone Number"
                />
              )}
              <CustomInput name="commission" type="text" label="Commission" />
              <div className="mt-8 w-full">
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

export default CarWashBill;
