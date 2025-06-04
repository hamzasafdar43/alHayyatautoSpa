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


export const registerUserFormValidationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    email: Yup.string().required("email is required"),
    phoneNumber: Yup.string().required("phone number is required"),
    password: Yup.string().required("password is required"),
  });


  export const loginrUserFormValidationSchema = Yup.object().shape({
 
    email: Yup.string().required("email is required"),
    password: Yup.string().required("password is required"),
    
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


 