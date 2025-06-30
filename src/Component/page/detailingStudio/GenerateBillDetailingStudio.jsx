import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import CustomSelect from "../../common/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/createSlice";

function GenerateBillDetailingStudio({setCarWashBill , setSelectBillForm}) {
  const [pageContent, setPageContent] = useState("");

  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const initialValuesForm = {
    category: "",
    carNameDetailing:"",
    polish: "",
    detailingMaster: "",
    detailingBill: "",
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

   const detailingPolishOptions = [
  { value: "basic", label: "Basic Polish" },
  { value: "premium", label: "Premium Polish" },
  { value: "ceramic", label: "Ceramic Coating" },
];


  return (
    <div>
      <div>
        <h1 className="text-[#262626] font-[700] text-2xl mx-auto w-full flex justify-center ">
          Car Detailing
        </h1>
      </div>
      <Formik initialValues={initialValuesForm} onSubmit={submitHandler}>
        {({ setFieldValue, values }) => {
          useEffect(() => {
            setFieldValue("category", "cardetailng");
          }, [setFieldValue]);

          return (
            <Form>
              <div className="hidden">
              <CustomInput
                name="category"
                type="text"
                label="Category"
                value={values.category}
                
                disabled
              />
              </div>

              <CustomInput name="carNameDetailing" type="text" label="Car Name" />
              
              <CustomSelect
                name="polish"
                label="Polish"
                option={detailingPolishOptions}
                onChange={(e) =>
                  setFieldValue("polish", e.target.value)
                }
              />
              <CustomSelect
                name="detailingMaster"
                label="Detailing Master"
                option={carWasherOptions}
                onChange={(e) =>
                  setFieldValue("detailingMaster", e.target.value)
                }
              />
              <CustomInput name="detailingBill" type="text" label="Bill" />
              <CustomInput name="commission" type="text" label="Commission" />
              <div className="mt-8 w-full">
                <CustomButton type="submit" title={"Submit"} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default GenerateBillDetailingStudio;
