import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useGetAllAccessoriesItemsQuery } from "../../../features/Api";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import CustomSelect from "../../common/CustomSelect";
import { saleProductValidationSchema } from "../validations/FormValidation";

function SaleItemsAccessoriesShop({
  setCarWashBill,
  setSelectBillForm,
  selectedUpdateRecord,
}) {
  const [products, setProducts] = useState([]);


  // 🔹 Fetch Accessories
  const { data: allAccessoriesItems = [] } = useGetAllAccessoriesItemsQuery();

  useEffect(() => {
    if (allAccessoriesItems?.data) {
      setProducts(allAccessoriesItems.data);
    }
  }, [allAccessoriesItems]);

  // 🔹 Initial Values (update mode support)
  const initialValuesForm = {
    category: "accessoriesShop",
   productId: selectedUpdateRecord
  ? products.find(
      (p) => p.productName === selectedUpdateRecord.Product_Name
    )?._id || ""
  : "",
    quantitySold: selectedUpdateRecord ? selectedUpdateRecord.Quantity : "",
    sellingPrice: selectedUpdateRecord ? selectedUpdateRecord.Price : "",
  };

  // 🔹 Product options for dropdown
  const saleProductOptions = products.map((product) => ({
    value: product._id,
    label: product.productName,
    product,
  }));


 

  // 🔹 Submit handler
  const submitHandler = async (values) => {
    try {
      const selectedProduct = products.find((p) => p._id === values.productId);
      const updatedValues = {
        ...values,
        productName: selectedProduct?.productName || "",
      };

      if (selectedUpdateRecord) {
        // 🔸 Update existing record
        setCarWashBill((prev) =>
          prev.map((item) =>
            item.Id === selectedUpdateRecord.Id ? updatedValues : item
          )
        );
      } else {
        // 🔸 Add new sale record
        setCarWashBill((prev) => [...prev, updatedValues]);
      }

      setSelectBillForm("");
    } catch (error) {
      console.error("Error in submitting:", error);
    }
  };

  return (
    <div>
      <h1 className="text-[#262626] font-[700] text-2xl mx-auto w-full flex justify-center">
        {selectedUpdateRecord ? "Update Accessories" : "Accessories Sale Product"}
      </h1>

      <Formik
        enableReinitialize
        initialValues={initialValuesForm}
        onSubmit={submitHandler}
        validationSchema={saleProductValidationSchema}
      >
        {({ setFieldValue, values }) => (
          <Form>
            {/* Category (fixed) */}
            <CustomInput
              name="category"
              type="text"
              label="Category"
              value={values.category}
              disabled
            />

            {/* Product Select */}
           <CustomSelect
  name="productId"
  label="Product Name"
  option={saleProductOptions}
  value={values.productId || ""}
  onChange={(e) => {
    const selectedProductId = e.target.value;
    setFieldValue("productId", selectedProductId);
  }}
/>


            {/* Quantity */}
            <CustomInput name="quantitySold" type="number" label="Quantity" />

            {/* Price */}
            <CustomInput
              name="sellingPrice"
              type="number"
              label="Total Price"
            />

            {/* Submit Button */}
            <div className="mt-8 w-full">
              <CustomButton
                type="submit"
                title={selectedUpdateRecord ? "Update" : "Submit"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SaleItemsAccessoriesShop;
