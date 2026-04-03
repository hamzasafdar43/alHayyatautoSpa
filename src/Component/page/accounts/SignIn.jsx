import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import React from "react";
import { loginUser } from "../../../features/createSlice";
import { loginUserFormValidationSchema } from "../validations/FormValidation";
import { showToast } from "../../common/CustomToast";
import { useDispatch } from "react-redux";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValuesForm = {
    email: "",
    password: "",
  };

  const singInHandler = async (values) => {
  const response = await dispatch(loginUser(values));

  console.log("response", response);

  if (loginUser.fulfilled.match(response)) {
    showToast("Login successful", "success");

    setTimeout(() => {
      navigate("/dashbord");
    }, 3000);

  } else {
    showToast(response.payload || "Login failed", "error");
  }
};
  return (
    <div className="bg-[#262626] flex flex-col md:flex-row justify-center md:justify-between items-center w-full overflow-y-auto h-screen">

    <div className="w-[50px] h-[600px] bg-gray-100 md:block hidden"></div>
    <div className="text-center leading-[80px]">
      <h1 className="lg:text-[70px] md:text-[60px] text-[40px] font-[600] text-white">Welcome</h1>
      {/* <h1 className='text-[60px] font-[600] text-white'>ALHAYYAT-AUTO</h1> */}
    </div>
    <div className="lg:w-[30%] md:w-[40%]  md:h-[600px] h-[400px] border-[2px] border-[#262626]  mx-5 md:mx-11 p-5 bg-gray-100">
      <div>
        <h1 className="md:text-[30px] text-[20px] font-[600] md:mt-11  text-[#262626]">
          Create An Account
        </h1>
      </div>
        <div className="mt-4">
          <Formik initialValues={initialValuesForm} onSubmit={singInHandler} validationSchema={loginUserFormValidationSchema}>
            <Form>
              <div>
                <CustomInput name="email" type="email" label="Email" />
                <CustomInput name="password" type="text" label="Password" />
              </div>
              <div className="mt-8 w-full">
                <CustomButton type="submit" title="SIGN_IN" />
              </div>
            </Form>
          </Formik>
        </div>
        <div className="my-5">
          <p>
            Don't have an account{" "}
            <Link to="/sign-up">
              {" "}
              <span className="underline ml-2 font-[500] ">Sign_UP</span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
