import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  useGetAllProductQuery,
  useGetAllSalesQuery,
  useGetSaleProductRecordMutation,
  useSaleProductMutation,
} from "../../../features/Api";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import CustomSelect from "../../common/CustomSelect";
import { saleProductValidationSchema } from "../validations/FormValidation";
import { useDispatch } from "react-redux";
import { showToast } from "../../common/CustomToast";


function Generatebill({ setIsOpen }) {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const {
    data: allProduct = {},
    isLoading,
    isError,
    refetch : allProductRefetch
  } = useGetAllProductQuery();
   const { data: allSales = {}, isSuccess  , refetch } = useGetAllSalesQuery();

  const [
    saleProduct,
    { data, isLoading: saleProductLoading, isError: saleProductError ,   },
  ] = useSaleProductMutation();
  const [saleProductData] = useGetSaleProductRecordMutation();

  const dispatch = useDispatch();

  const isMatchProductId = products.filter(
    (product) => product._id === selectedProductId
  );

  const initialValuesForm = {
    productId: "",
    quantitySold: "",
    sellingPrice: isMatchProductId.price || "",
  };

  

  useEffect(() => {
    if (allProduct?.data) {
      setProducts(allProduct.data);
    }
  }, [allProduct]);

  const saleProductName = products.map((product) => {
    return {
      value: product._id,
      label: product.productName,
      product: product,
    };
  });

  const submitHandler = async (values) => {
    setSelectedProductId(values?.productId);
    try {
      const response = await saleProduct(values).unwrap();
      refetch();
      allProductRefetch();
  
      if (response?.message === "Product sale successfully") {
        showToast(response?.message, "success"); 
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      } else if (response?.error?.data?.message === "Invalid product or insufficient stock") {
        showToast("Invalid product or insufficient stock", "error");
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
          Sale_Product
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
      const product = products.find(p => p._id === values.productId);
      if (product && values.quantitySold) {
        const price = Number(product.price) * Number(values.quantitySold);
        setFieldValue("sellingPrice", price);
      }
    }, [values.productId, values.quantitySold]);

    return (
      <Form>
        <CustomSelect
          name="productId"
          label="Product Name"
          option={saleProductName}
          onChange={(e) => {
            const selectedProductId = e.target.value;
            setFieldValue("productId", selectedProductId);
            const selectedProduct = products.find(p => p._id === selectedProductId);
            if (selectedProduct && values.quantitySold) {
              const price = Number(selectedProduct.price) * Number(values.quantitySold);
              setFieldValue("sellingPrice", price);
            } else {
              setFieldValue("sellingPrice", "");
            }
          }}
        />

        <CustomInput name="quantitySold" type="number" label="Quantity" />

        <CustomInput name="sellingPrice" type="number" label="Total Price" disabled />

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

export default Generatebill;
