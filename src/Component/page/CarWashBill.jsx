import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosPrint } from "react-icons/io";
import { useReactToPrint } from "react-to-print";
import CustomSelect from "../common/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/createSlice";

const SignupSchema = Yup.object().shape({
  carName: Yup.string().required("car name is required"),
  carWasher: Yup.string().required("car washer is required"),
  bill: Yup.string().required("bill is required"),
  phoneNumber: Yup.string().required("phone number is required"),
  commission: Yup.string().required("commission is required"),
});

function CarWashBill() {
  const [pageContent, setPageContent] = useState("");
  const [printBill, setPrintBill] = useState(false);

  const dispatch = useDispatch();
  const componentRef = useRef();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  
  const initialValuesForm = {
    carName: "",
    carWasher: "",
    bill: "",
    phoneNumber: "",
    commission: "",
  };

  const submitHandler = async (values) => {
    console.log(values);
    try {
      const response = await fetch("http://localhost:5000/carWash-bill", {
        method: "POST", // or "GET" depending on your backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send the form data
      });
      console.log("response", response);

      const data = await response.json();
      setPageContent(data?.bill);
      setPrintBill(true);
      console.log("Response from server:", data);
      console.log("pageContent", pageContent);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const printModelCloseHandler = () => {
    setPrintBill(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const carWasherOptions = users.map((user) => {
    console.log("userName", user.name);
    return {
      value: user.name,
      label: user.name,
    };
  });

 
  return (
    <div className="px-4 w-[80%]  mx-auto">
      <div>
        <h1 className="text-[#daa520] font-[700] text-2xl mx-auto w-full flex justify-center my-16">
          Generate Bill
        </h1>
      </div>
      <Formik
        initialValues={initialValuesForm}
        validationSchema={SignupSchema}
        onSubmit={submitHandler}
      >
        <Form>
          <div className=" grid grid-cols-2 gap-8">
          <CustomInput name="carName" type="text" label="Car Name" />
            <CustomSelect
              name="carWasher"
              type="text"
              label="Car Washer"
              option={carWasherOptions}
            />
          
            <CustomInput name="bill" type="text" label="Bill" />
            <CustomInput name="phoneNumber" type="text" label="Phone Number" />
            <CustomInput name="commission" type="text" label="Commission" />
          </div>
          <div className="mt-8 w-[50%]">
            <CustomButton type="submit" title="Submit" />
          </div>
        </Form>
      </Formik>
      <div>
        {printBill && (
          <div className="fixed h-[100vh] w-full top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-40">
            <div className="w-[20%] px-4 py-11 h-auto border-2 rounded-[10px] border-[#daa520] bg-white z-50">
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
