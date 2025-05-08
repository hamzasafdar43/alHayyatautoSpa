import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosPrint } from "react-icons/io";
import { useReactToPrint } from "react-to-print";
import CustomSelect from "../../common/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/createSlice";
import {
  useGetAllBillsQuery,
  useSubmitCarWashBillMutation,
  useUpdateBillMutation,
} from "../../../features/Api";

const SignupSchema = Yup.object().shape({
  carName: Yup.string().required("car name is required"),
  carWasher: Yup.string().required("car washer is required"),
  bill: Yup.string().required("bill is required"),
  phoneNumber: Yup.string().required("phone number is required"),
  commission: Yup.string().required("commission is required"),
});

const updateRecordValidationSchema = Yup.object().shape({
  carName: Yup.string().required("car name is required"),
  carWasher: Yup.string().required("car washer is required"),
  bill: Yup.string().required("bill is required"),
  commission: Yup.string().required("commission is required"),
});

function CarWashBill({ isOpenUpdateRecod, record, setIsOpenUpdateRecod }) {
  const [pageContent, setPageContent] = useState("");
  const [printBill, setPrintBill] = useState(false);

  const { data: allBills = [], refetch } = useGetAllBillsQuery();
  const dispatch = useDispatch();
  const componentRef = useRef();
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
      setPrintBill(true);
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const printModelCloseHandler = () => {
    setPrintBill(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const carWasherOptions = users
  .filter(user => user.role === "user") 
  .map(user => ({
    value: user.name,
    label: user.name
  }));


  const updateHandler = async (values) => {
    try {
      await updateBill({ id: record.Id, ...values }).unwrap();
      setIsOpenUpdateRecod(false);
      refetch();
    } catch (error) {
      console.error("Update error:", error);
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
        <Form>
          <div>
            <CustomInput name="carName" type="text" label="Car Name" />
            <CustomSelect
              name="carWasher"
              type="text"
              label="Car Washer"
              option={carWasherOptions}
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
      </Formik>
      <div>
        {printBill && (
          <div className="fixed h-[100vh] w-full top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-40">
            <div className="w-[20%] px-4 py-11 h-auto border-2 rounded-[10px] border-[#262626] bg-white z-50">
              <div className="flex justify-end m-2 ">
                <IoCloseSharp size={20} onClick={printModelCloseHandler} />
              </div>
              <div ref={componentRef}>
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
              <div className="flex justify-end mt-10" onClick={handlePrint}>
                <IoIosPrint size={30} />{" "}
                <span className="mx-2 font-[600]">Print</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarWashBill;
