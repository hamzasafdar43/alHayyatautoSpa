import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { useReactToPrint } from "react-to-print";
import CustomSelect from "../../common/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/createSlice";
import {
  useGetAllBillsQuery,
  useSubmitCarWashBillMutation,
  useUpdateBillMutation,
} from "../../../features/Api";
import {
  SignupSchema,
  updateRecordValidationSchema,
} from "../validations/FormValidation";
import { showToast } from "../../common/CustomToast";

function CarWashBill({
  isOpenUpdateRecod,
  record,
  setIsOpenUpdateRecod,
  setIsOpen,
}) {
  const [pageContent, setPageContent] = useState("");

  const { data: allBills = [], refetch } = useGetAllBillsQuery();
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const { users, loading, error } = useSelector((state) => state.user);
  const [submitCarWashBill, { data, error: submitError, isLoading }] =
    useSubmitCarWashBillMutation();
  const [
    updateBill,
    { data: updateResponse, error: updateError, isLoading: isLoadingUpdate },
  ] = useUpdateBillMutation();

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
    carName: "",
    carWasher: "",
    bill: "",
    phoneNumber: "",
    commission: "",
  };

  const submitHandler = async (values) => {
    try {
      const response = await submitCarWashBill(values).unwrap();
      setPageContent(response?.bill);

      if(response.message === "Car wash bill generated successfully"){
        showToast(response?.message, "success");

        setTimeout(() => {
          reactToPrintFn();
          setIsOpen(false)
        }, 1000);

      }
   refetch()
    } catch (err) {
      const errorMessage = error?.data?.message || "Something went wrong!";
      showToast(errorMessage, "error");
    }
  };

  const reactToPrintFn = useReactToPrint({ contentRef });

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
  {({ setFieldValue }) => (
    <Form>
      <div>
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
      </div>
      <div className="mt-8 w-full">
        <CustomButton
          type="submit"
          title={isOpenUpdateRecod ? "Update" : "Submit"}
        />
      </div>
    </Form>
  )}
</Formik>


      <div className="hidden">
        <div ref={contentRef}>
          <div>
            <h1 className="font-[600] ">AlHayyat Aut Spa</h1>
          </div>
          <div>
            <h1 className="my-5 flex justify-between">
              Date :{" "}
              <span>
                {new Date().toLocaleString("en-PK", {
                  timeZone: "Asia/Karachi",
                })}
              </span>
            </h1>
            <h1 className="my-5 flex justify-between">
              Car Name: <span>{pageContent?.carName}</span>
            </h1>
            <h1 className="my-5 flex justify-between">
              Bill: <span>{pageContent?.bill}</span>
            </h1>
            <h1 className="my-5 flex justify-between">
              Discount: <span>5%</span>
            </h1>
            {pageContent?.bill && (
              <h1 className="my-5 flex justify-between">
                Total after 5% discount:
                <span>
                  {(
                    Number(pageContent.bill) -
                    Number(pageContent.bill) * 0.05
                  ).toFixed(2)}
                </span>
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarWashBill;
