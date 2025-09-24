import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AddProduct from "../Component/page/olishop/AddProduct";

export const carWashBillApi = createApi({
  reducerPath: "carWashApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://alhayyat-backend.onrender.com/",
  // }),
  baseQuery: fetchBaseQuery({ baseUrl: '  http://localhost:5000/' }),
  endpoints: (builder) => ({
    submitCarWashBill: builder.mutation({
      query: (body) => ({
        url: "generate-bill",
        method: "POST",
        body: { records: body },
      }),
    }),
    getAllBills: builder.query({
      query: () => "carWash-bills",
    }),
    deleteBill: builder.mutation({
      query: (id) => ({
        url: `carWash-bill-delete/${id}`,
        method: "DELETE",
      }),
    }),

    updateBill: builder.mutation({
      query: ({ id, ...body }) => {
        return {
          url: `carWash-bills-update/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    AddProduct: builder.mutation({
      query: (body) => ({
        url: "add-product",
        method: "POST",
        body,
      }),
    }),
    getAllProduct: builder.query({
      query: () => "all-product",
    }),
    saleProduct: builder.mutation({
      query: (body) => ({
        url: "sale-product",
        method: "POST",
        body,
      }),
    }),
    getSaleProductRecord: builder.mutation({
      query: ({ id }) => {
        return {
          url: `sale-product/${id}`,
          method: "GET",
        };
      },
    }),
    getAllSales: builder.query({
      query: () => "all-sales",
    }),
    AddAccessoriesItem: builder.mutation({
      query: (body) => ({
        url: "add-accessories-item",
        method: "POST",
        body,
      }),
    }),
    getAllAccessoriesItem: builder.query({
      query: () => "all-accessories",
    }),
    getAllSaleAccessoriesItem: builder.query({
      query: () => "all-sale-accessories",
    }),
    getAlldetailingStudioBil: builder.query({
      query: () => "detailing-studio-bills",
    }),

    // ************************** Employees *************************
    employeeAdd: builder.mutation({
      query: (body) => ({
        url: "employees",
        method: "POST",
        body,
      }),
    }),
    getAllEmployees: builder.query({
      query: () => "employees",
    }),
    getEmployeeById: builder.query({
      query: (id) => `employees/${id}`, // GET request
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
    }),

    updateEmployee: builder.mutation({
      query: ({ id, ...body }) => {
        console.log("body" , body)
        return {
          url: `employees/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useSubmitCarWashBillMutation,
  useDeleteBillMutation,
  useUpdateBillMutation,
  useGetAllBillsQuery,
  useGetAllProductQuery,
  useAddProductMutation,
  useGetAllSalesQuery,
  useSaleProductMutation,
  useGetSaleProductRecordMutation,
  useGetAllAccessoriesItemQuery,
  useAddAccessoriesItemMutation,
  useGetAllSaleAccessoriesItemQuery,
  useGetAlldetailingStudioBilQuery,
  useEmployeeAddMutation,
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = carWashBillApi;
