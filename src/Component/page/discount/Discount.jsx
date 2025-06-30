import { Form, Formik } from "formik";
import React from "react";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";

function Discount({ setCarWashBill, setSelectBillForm }) {
  const initialValuesForm = {
    discount : ""
  };

  const submitHandler = (values) => {};

  return (
    <div className="mt-11">
      <Formik initialValues={initialValuesForm} onSubmit={submitHandler}>
        <Form>
          <CustomInput name="discount" type="number" label="Discount" />

          <div className="mt-8 w-full">
            <CustomButton type="submit" title="SUBMIT" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Discount;
