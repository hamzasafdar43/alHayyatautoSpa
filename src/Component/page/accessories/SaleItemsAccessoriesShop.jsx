import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  useGetAllAccessoriesItemQuery,
} from "../../../features/Api";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import CustomSelect from "../../common/CustomSelect";
import { saleProductValidationSchema } from "../validations/FormValidation";


function SaleItemsAccessoriesShop({ setCarWashBill, setSelectBillForm }) {
  const [products, setProducts] = useState([]);
  const { data: allIAccessoriestems = {} } = useGetAllAccessoriesItemQuery();


   useEffect(() => {
    if (allIAccessoriestems?.data) {
      setProducts(allIAccessoriestems.data);
    }
  }, [allIAccessoriestems]);



  const initialValuesForm = {
    category: "accessoriesShop",
    productId: "",
    quantitySold: "",
    sellingPrice:  "",
  };



  const saleProductName = products.map((product) => {
    return {
      value: product._id,
      label: product.productName,
      product: product,
    };
  });



  const submitHandler = async (values) => {
   try {
     const selectedProduct = products.find((p) => p._id === values.productId);
    const selectedProductName = selectedProduct
      ? selectedProduct.productName
      : "";

    const updatedValues = {
      ...values,
      productName: selectedProductName,
    };

    setCarWashBill((prev) => [...prev, updatedValues]);
    setSelectBillForm("");
   } catch (error) {
    console.log("error" , error)
   }
  };

  return (
    <div>
      <div>
        <h1 className="text-[#262626] font-[700] text-2xl mx-auto w-full flex justify-center">
          Accessories Sale_Product
        </h1>
      </div>
      <Formik
        initialValues={initialValuesForm}
        onSubmit={submitHandler}
        validationSchema={saleProductValidationSchema}
      >
        {({ setFieldValue, values }) => {
          // Automatically update sellingPrice when quantity changes
          useEffect(() => {
            const product = products.find((p) => p._id === values.productId);
            if (product && values.quantitySold) {
              const price = Number(product.price) * Number(values.quantitySold);
              setFieldValue("sellingPrice", price);
            }
          }, [values.productId, values.quantitySold]);

          return (
            <Form>
              <CustomInput
                name="category"
                type="text"
                label="Category"
                value={values.category}
                disabled
              />
              <CustomSelect
                name="productId"
                label="Product Name"
                option={saleProductName}
                onChange={(e) => {
                  const selectedProductId = e.target.value;
                  setFieldValue("productId", selectedProductId);
                  const selectedProduct = products.find(
                    (p) => p._id === selectedProductId
                  );
                  if (selectedProduct && values.quantitySold) {
                    const price =
                      Number(selectedProduct.price) *
                      Number(values.quantitySold);
                    setFieldValue("sellingPrice", price);
                  } else {
                    setFieldValue("sellingPrice", "");
                  }
                }}
              />

              <CustomInput name="quantitySold" type="number" label="Quantity" />

              <CustomInput
                name="sellingPrice"
                type="number"
                label="Total Price"
                disabled
              />

              <div className="mt-8 w-full">
                <CustomButton type="submit" title="Submit" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SaleItemsAccessoriesShop;
