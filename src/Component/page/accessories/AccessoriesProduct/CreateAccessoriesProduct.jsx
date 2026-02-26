import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  useAddAccessoriesItemMutation,
  useGetAllAccessoriesItemsQuery,
  useUpdateAccessoriesItemsMutation,
} from "../../../../features/Api";
import CustomInput from "../../../common/CustomInput";
import CustomButton from "../../../common/CustomButton";
import { addProductValidationSchema } from "../../validations/FormValidation";
import { showToast } from "../../../common/CustomToast";

function CreateAccessoriesProduct({ setIsOpen, selectRecordIndex }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [AddProduct] = useAddAccessoriesItemMutation();
  const { refetch } = useGetAllAccessoriesItemsQuery();
  const [updateAccessoriesItems] = useUpdateAccessoriesItemsMutation()

  useEffect(() => {
    if (selectRecordIndex?.Product_Image) {
      setPreviewImage(selectRecordIndex.Product_Image);
    }
  }, [selectRecordIndex]);

  const initialValuesForm = {
    productName: selectRecordIndex?.Product_Name || "",
    image: selectRecordIndex?.Product_Image || "",
    price: selectRecordIndex?.Price || "",
    cost: selectRecordIndex?.Cost || "",
    quantity: selectRecordIndex?.Product_Quantity
      || "",
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

  const updateAccessoriesItemHandler = async (values) => {
    try {
      if (!selectRecordIndex?.Id) {
        showToast("Invalid record selected for update", "error");
        return;
      }

      const formData = new FormData();
      formData.append("productName", values.productName);
      formData.append("price", values.price);
      formData.append("cost", values.cost);
      formData.append("quantity", values.quantity);

      // ✅ If user selected new image, append it — otherwise skip
      if (values.image && typeof values.image !== "string") {
        formData.append("image", values.image);
      }

      const response = await updateAccessoriesItems({
        id: selectRecordIndex.Id,
        data: formData,
      }).unwrap();

      showToast(response?.message || "Accessories item updated successfully!", "success");
      setIsOpen(false);
      await refetch();
    } catch (error) {
      const errorMessage = error?.data?.message || "Failed to update record!";
      showToast(errorMessage, "error");
    }
  };


  return (
    <div>
      <div>
        {selectRecordIndex ? (
          <h1 className="text-[#262626] font-[700] text-2xl mx-auto w-full flex justify-center">
            Update Accessories item
          </h1>
        ) : (
          <h1 className="text-[#262626] font-[700] text-2xl mx-auto w-full flex justify-center">
            Add Accessories
          </h1>)}

      </div>
      <Formik
        initialValues={initialValuesForm}
        onSubmit={selectRecordIndex ? updateAccessoriesItemHandler : submitHandler}
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
              <CustomButton type="submit" title={selectRecordIndex ? "UPDATE" : "ADD"} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateAccessoriesProduct;
