import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, updateUser } from "../../../features/createSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserFormValidationSchema,
  updateUservalidationSchema,
} from "../validations/FormValidation";
import { showToast } from "../../common/CustomToast";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => user.user);

  console.log("user" , user)

  const initialValuesForm = {
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    phoneNumber: user?.user?.phoneNumber || "",
  };

  const updateUserHandler = async (values) => {
    try {
      const response = await dispatch(
        updateUser({ values, userId: user?.user?._id })
      );

      console.log("resoponse" , response)
      if (response?.payload?.message === "User updated successfully") {
        showToast(response?.payload?.message, "success");
      }else{
         showToast(response?.payload?.message, "error");
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "Something went wrong!";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className=" flex justify-center items-center w-full overflow-y-auto h-[100vh] ">
      <div className="text-center leading-[80px]"></div>
      <div className="lg:w-[30%] sm:w-[50%] w-[90%]  mx-auto  h-auto border-[1px] border-[#262626] rounded-[10px] lg:mx-5  md:mx-11 p-5 bg-gray-100">
        <div>
          <h1 className="md:text-[30px] text-[20px] font-[600]   text-[#262626]">
            Update_Profile
          </h1>
        </div>
        <div className="mt-4">
          <Formik
            initialValues={initialValuesForm}
            onSubmit={updateUserHandler}
            validationSchema={updateUservalidationSchema}
          >
            <Form>
              <div>
                <CustomInput name="name" type="text" label="Name" />
                <CustomInput name="email" type="email" label="Email" />
                <CustomInput
                  name="phoneNumber"
                  type="text"
                  label="Phone Number"
                />
              </div>
              <div className="mt-8 w-full">
                <CustomButton type="submit" title="Update" />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
