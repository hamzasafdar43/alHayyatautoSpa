import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  useGetAllOilShopProductsQuery,
  useGetDetailingBillByDateQuery,
  useGetFilteredOilSalesQuery,
  useUpdateOilShopProductMutation,
} from "../../../../features/Api";

import CustomButton from "../../../common/CustomButton";
import CustomInput from "../../../common/CustomInput";
import CustomSelect from "../../../common/CustomSelect";
import { saleProductValidationSchema } from "../../validations/FormValidation";
import { showToast } from "../../../common/CustomToast";

function CreateOilSaleBill({
  setCarWashBill,
  setSelectBillForm,
  selectedUpdateRecord,
  setIsOpen,
}) {
  const [products, setProducts] = useState([]);

  // 🔹 Fetch Accessories
  const { data: OilProductLists = [] } = useGetAllOilShopProductsQuery();
  const [updateAccessoriesSale] = useUpdateOilShopProductMutation();
  const { data: monthlySalesData = [], refetch } =
    useGetFilteredOilSalesQuery("month");

  useEffect(() => {
    if (OilProductLists?.data) {
      setProducts(OilProductLists.data);
    }
  }, [OilProductLists]);

  // 🔹 Initial Values (update mode support)
  const initialValuesForm = {
    category: "oilShop",
    productId: selectedUpdateRecord
      ? products.find(
          (p) => p.productName === selectedUpdateRecord.Product_Name,
        )?._id || ""
      : "",
    quantitySold: selectedUpdateRecord ? selectedUpdateRecord.Quantity : "",
    sellingPrice: selectedUpdateRecord ? selectedUpdateRecord.Price : "",
  };

  // 🔹 Product options for dropdown
  const saleProductOptions = products
    .filter((product) => product.quantity > 0)
    .map((product) => ({
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
            item.Id === selectedUpdateRecord.Id ? updatedValues : item,
          ),
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
  const updateSaleHandler = async (values) => {
    try {
      // 🟢 Validate the selected record
      if (!selectedUpdateRecord?.Id) {
        showToast("Invalid record selected for update", "error");
        return;
      }

      const response = await updateAccessoriesSale({
        id: selectedUpdateRecord.Id,
        ...values,
      }).unwrap();

      showToast(
        response?.message || "Accessories sale updated successfully!",
        "success",
      );
      setIsOpen(false);
      await refetch();
    } catch (error) {
      const errorMessage = error?.data?.message || "Failed to update record!";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div>
      <h1 className="text-[#262626] font-[700] text-2xl mx-auto w-full flex justify-center">
        {selectedUpdateRecord
          ? "Update Accessories"
          : "Accessories Sale Product"}
      </h1>

      <Formik
        enableReinitialize
        initialValues={initialValuesForm}
        onSubmit={selectedUpdateRecord ? updateSaleHandler : submitHandler}
        validationSchema={saleProductValidationSchema}
      >
        {({ setFieldValue, values }) => {
          const productCost =
            products.find((p) => p._id === values.productId)?.cost || 0;

          const quantity = Number(values.quantitySold) || 0;
          const sellingPrice = Number(values.sellingPrice) || 0;

          const totalCost = productCost * quantity;
          return (
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
              {sellingPrice < totalCost && values.sellingPrice !== "" && (
                <p className="text-red-500 text-sm mt-1">
                  Alert: Selling price is below total cost ({totalCost})
                </p>
              )}
              {/* Submit Button */}
              <div className="mt-8 w-full">
                <CustomButton
                  type="submit"
                  className={sellingPrice < totalCost ? "hidden" : "block"}
                  title={selectedUpdateRecord ? "Update" : "Submit"}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CreateOilSaleBill;
