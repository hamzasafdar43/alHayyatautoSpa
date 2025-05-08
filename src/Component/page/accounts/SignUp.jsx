import { Form, Formik } from "formik";
import React from "react";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../features/createSlice";
import { useDispatch } from "react-redux";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValuesForm = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  const singupHandler = async (values) => {
    try {
      const response = await dispatch(registerUser(values));
      console.log("sign up response" , response)
      if (response.payload.message === "User registered successfully") {
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="bg-[#262626] md:flex justify-between items-center w-full overflow-y-auto h-[100vh] ">
      <div className="w-[50px] h-[600px] bg-gray-100 md:block hidden"></div>
      <div className="text-center leading-[80px]">
        <h1 className="lg:text-[70px] md:text-[60px] text-[40px] font-[600] text-white">Welcome</h1>
        {/* <h1 className='text-[60px] font-[600] text-white'>ALHAYYAT-AUTO</h1> */}
      </div>
      <div className="lg:w-[30%] sm:w-[50%] w-[90%]  mx-auto  md:h-[600px] h-[520px] border-[2px] border-[#262626] lg:mx-5  md:mx-11 p-5 bg-gray-100">
        <div>
          <h1 className="md:text-[30px] text-[20px] font-[600] md:mt-11  text-[#262626]">
            Create An Account
          </h1>
        </div>
        <div className="mt-4">
          <Formik initialValues={initialValuesForm} onSubmit={singupHandler}>
            <Form>
              <div>
                <CustomInput name="name" type="text" label="Name" />
                <CustomInput name="email" type="text" label="Email" />
                <CustomInput
                  name="phoneNumber"
                  type="text"
                  label="Phone Number"
                />
                <CustomInput name="password" type="password" label="Password" />
              </div>
              <div className="mt-8 w-full">
                <CustomButton type="submit" title="SIGN_UP" />
              </div>
            </Form>
          </Formik>
        </div>
        <div className="my-5">
          <p>
            Already have an account{" "}
            <Link to="/">
              {" "}
              <span className="underline ml-2 font-[500] ">Sign_In</span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
