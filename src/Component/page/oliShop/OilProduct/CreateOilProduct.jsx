import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { showToast } from "../../../common/CustomToast";
import { addProductValidationSchema } from "../../validations/FormValidation";
import CustomInput from "../../../common/CustomInput";
import CustomButton from "../../../common/CustomButton";
import { useAddOilShopProductMutation, useGetAllOilShopProductsQuery, useUpdateOilShopProductMutation } from "../../../../features/Api";


function CreateOilProduct({ setIsOpen, selectedRecord }) {
  const [previewImage, setPreviewImage] = useState(null);

  // ✅ API Hooks
  const [addOilProduct] = useAddOilShopProductMutation();
  const [updateOilProduct] = useUpdateOilShopProductMutation();
  const { refetch } = useGetAllOilShopProductsQuery();

  // ✅ When editing, prefill image preview
  useEffect(() => {
    if (selectedRecord?.Product_Image) {
      setPreviewImage(selectedRecord.Product_Image);
    }
  }, [selectedRecord]);

  // ✅ Initial form values
  const initialValuesForm = {
    productName: selectedRecord?.Product_Name || "",
    image: selectedRecord?.Product_Image || "",
    price: selectedRecord?.Price || "",
    cost: selectedRecord?.Cost || "",
    quantity: selectedRecord?.Product_Quantity || "",
  };

  // ✅ Add new oil product
  const handleAddProduct = async (values) => {
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("image", values.image);
    formData.append("price", values.price);
    formData.append("cost", values.cost);
    formData.append("quantity", values.quantity);

    try {
      const response = await addOilProduct(formData).unwrap();
      if (response?.message === "Product added successfully.") {
        showToast(response?.message, "success");
        await refetch();
        setTimeout(() => setIsOpen(false), 1500);
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "Failed to add product!";
      showToast(errorMessage, "error");
    }
  };

  // ✅ Update oil product
  const handleUpdateProduct = async (values) => {
    try {
      if (!selectedRecord?.Id) {
        showToast("Invalid record selected for update", "error");
        return;
      }

      const formData = new FormData();
      formData.append("productName", values.productName);
      formData.append("price", values.price);
      formData.append("cost", values.cost);
      formData.append("quantity", values.quantity);

      // Only append new image if user selected one
      if (values.image && typeof values.image !== "string") {
        formData.append("image", values.image);
      }

      const response = await updateOilProduct({
        id: selectedRecord.Id,
        data: formData,
      }).unwrap();

      showToast(response?.message || "Oil product updated successfully!", "success");
      await refetch();
      setTimeout(() => setIsOpen(false), 1500);
    } catch (error) {
      const errorMessage = error?.data?.message || "Failed to update product!";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div>
      <h1 className="text-[#262626] font-[700] text-2xl mx-auto w-full flex justify-center mb-4">
        {selectedRecord ? "Update Oil Product" : "Add Oil Product"}
      </h1>

      <Formik
        initialValues={initialValuesForm}
        onSubmit={selectedRecord ? handleUpdateProduct : handleAddProduct}
        validationSchema={addProductValidationSchema}
      >
        {({ setFieldValue }) => (
          <Form>
            <CustomInput name="productName" type="text" label="Product Name" />

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

            <div className="mt-8 w-full">
              <CustomButton
                type="submit"
                title={selectedRecord ? "UPDATE" : "ADD"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateOilProduct;
