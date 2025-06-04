import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  useAddProductMutation,
  useGetAllProductQuery,
  useSubmitCarWashBillMutation,
} from "../../../features/Api";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { addProductValidationSchema } from "../validations/FormValidation";
import { showToast } from "../../common/CustomToast";

function AddProduct({ setIsOpen, product }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [AddProduct] = useAddProductMutation();
  const {
    data: allProduct = {},
    isLoading,
    isError,
    refetch,
  } = useGetAllProductQuery();
  console.log("allProduct", product);

  useEffect(() => {
    if (product?.Product_Image) {
      setPreviewImage(product.Product_Image);
    }
  }, [product]);


  const initialValuesForm = {
    productName: product?.Product_Name || "",
    image:product?.Product_Image || "",
    price: product?.Price || "",
    cost: product?.Cost || "",
    quantity: product?.Product_Quantity || "",
  };

  const submitHandler = async (values) => {
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("image", values.image);
    formData.append("price", values.price);
    formData.append("cost", values.cost);
    formData.append("quantity", values.quantity);

    try {
      const response = await AddProduct(formData).unwrap();
      refetch();
      if (response.message === "Product added successfully.") {
        showToast(response?.message, "success");
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "Something went wrong!";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-[#262626] font-[700] text-2xl mx-auto w-full flex justify-center">
          Oil Shop
        </h1>
      </div>

      <Formik
        initialValues={initialValuesForm}
        onSubmit={submitHandler}
        validationSchema={addProductValidationSchema}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <CustomInput
                name="productName"
                type="text"
                label="Product Name"
              />
              {previewImage && (
                <div className="mb-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-32 h-32 object-cover border rounded"
                  />
                </div>
              )}
              <CustomInput
                name="image"
                type="file"
                label="Product Image"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  if (file) {
                    setFieldValue("image", file);
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
              />
              <CustomInput name="price" type="number" label="Price" />
              <CustomInput name="cost" type="number" label="Cost" />
              <CustomInput name="quantity" type="number" label="Quantity" />
            </div>
            <div className="mt-8 w-full">
              <CustomButton type="submit" title="Add Product" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddProduct;
