import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  carName: Yup.string().required("car name is required"),
  carWasher: Yup.string().required("car washer is required"),
  bill: Yup.string().required("bill is required"),
  phoneNumber: Yup.string().required("phone number is required"),
  commission: Yup.string().required("commission is required"),
});

export const updateRecordValidationSchema = Yup.object().shape({
  carName: Yup.string().required("car name is required"),
  carWasher: Yup.string().required("car washer is required"),
  bill: Yup.string().required("bill is required"),
  commission: Yup.string().required("commission is required"),
});



const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



export const registerUserFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  phoneNumber: Yup.string()
    .matches(
      /^(\+92|0)?3[0-9]{9}$/,
      "Enter valid Pakistan phone number"
    )
    .required("Phone number is required"),

  password: Yup.string()
    .required("Password is required")
    .matches(
      strongPasswordRegex,
      "Password must be 8+ characters and include uppercase, lowercase, number & special character"
    ),
});



export const loginUserFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  // ⚠️ For login we DO NOT enforce strong rule again
  password: Yup.string()
    .required("Password is required"),
});


  export const updateUservalidationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    email: Yup.string().required("email is required"),
    phoneNumber: Yup.string().required("phone number is required"),
   
  })



  export const addProductValidationSchema = Yup.object().shape({
 
    productName: Yup.string().required("product Name is required"),
    image: Yup.string().required("image is required"),
    price: Yup.string().required("price is required"),
    cost: Yup.string().required("cost is required"),
    quantity: Yup.string().required("quantity is required"),
    
  });


  export const saleProductValidationSchema = Yup.object().shape({
 
    productId: Yup.string().required("Select product"),
    quantitySold : Yup.string().required("add quantity"),
    sellingPrice: Yup.string().required("price is required"),
  
    
  });


 