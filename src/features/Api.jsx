import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carWashBillApi = createApi({
  reducerPath: "carWashApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({

    // ====================================================================================
    // 🟨 🚗 CAR WASH API
    // ====================================================================================
    submitCarWashBill: builder.mutation({
      query: (body) => ({
        url: "generate-bill",
        method: "POST",
        body: { records: body },
      }),
    }),

    getAllBills: builder.query({
      query: (filter) => `carWash-bills?filter=${filter}`,
    }),

    getCarWashBillByDate: builder.query({
      query: (startDate) =>
        startDate
          ? `carWash-bill-date?date=${new Date(startDate).toISOString()}`
          : "carWash-bill-date",
    }),

    updateCommissionStatus: builder.mutation({
      query: (data) => ({
        url: "commission-paid",
        method: "POST",
        body: data, // expects { _id }
      }),
    }),

    deleteBill: builder.mutation({
      query: (id) => ({
        url: `carWash-bill-delete/${id}`,
        method: "DELETE",
      }),
    }),

    updateBill: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `carWash-bills-update/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // ====================================================================================
    // 🟨 🧽 DETAILING STUDIO API
    // ====================================================================================
    getAllBillsDetailing: builder.query({
      query: (filter) => `detailing/bills?filter=${filter}`,
    }),

    getDetailingBillByDate: builder.query({
      query: (startDate) =>
        startDate
          ? `detailing/bills-by-date?date=${new Date(startDate).toISOString()}`
          : "detailing/bills-by-date",
    }),

    updateCommissionStatusDetailing: builder.mutation({
      query: (data) => ({
        url: "detailing/update-commission",
        method: "PUT",
        body: data, // expects { _id }
      }),
    }),

    // ====================================================================================
    // 🟨 🛢️ OIL SHOP (PRODUCTS & SALES)
    // ====================================================================================
    addOilShopProduct: builder.mutation({
      query: (body) => ({
        url: "add-product",
        method: "POST",
        body,
      }),
    }),

     getoilShopBillByDate: builder.query({
      query: (startDate) =>
        startDate
          ? `/bills-by-date?date=${new Date(startDate).toISOString()}`
          : "/sales",
    }),


    getAllOilShopProducts: builder.query({
      query: () => "all-products",
    }),

    updateOilShopProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-product/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteOilShopProduct: builder.mutation({
      query: (id) => ({
        url: `delete-product/${id}`,
        method: "DELETE",
      }),
    }),

    addOilSale: builder.mutation({
      query: (body) => ({
        url: "add-sale",
        method: "POST",
        body,
      }),
    }),

    getFilteredOilSales: builder.query({
      query: (filter) => `sales?filter=${filter}`,
    }),

    updateOilSale: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `update-sale/${id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteOilSale: builder.mutation({
      query: (id) => ({
        url: `delete-sale/${id}`,
        method: "DELETE",
      }),
    }),
    // ====================================================================================
    // 🟨 🧰 ACCESSORIES API
    // ====================================================================================
    addAccessoriesItem: builder.mutation({
      query: (body) => ({
        url: "add-accessories-item",
        method: "POST",
        body,
      }),
    }),

      getAccessoriesBillByDate: builder.query({
      query: (startDate) =>
        startDate
          ? `/accessories-bills-by-date?date=${new Date(startDate).toISOString()}`
          : "/all-accessories",
    }),

    deleteAccessoriesItems: builder.mutation({
      query: (id) => ({
        url: `delete-accessories-items/${id}`,
        method: "DELETE",
      }),
    }),

    updateAccessoriesItems: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-accessories-items/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    getAllAccessoriesItems: builder.query({
      query: () => "all-accessories",
    }),

    getAllSaleAccessories: builder.query({
      query: (filter) => `accessories-sales?filter=${filter}`,
    }),

    deleteAccessoriesSale: builder.mutation({
      query: (id) => ({
        url: `accessories-sales-delete/${id}`,
        method: "DELETE",
      }),
    }),

    updateAccessoriesSale: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `accessories-sales-update/${id}`,
        method: "PUT",
        body,
      }),
    }),


    // ====================================================================================
    // 🟨 👥 EMPLOYEES API
    // ====================================================================================
    addEmployee: builder.mutation({
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
      query: (id) => `employees/${id}`,
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
    }),

    updateEmployee: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `employees/${id}`,
        method: "PUT",
        body,
      }),
    }),


    // ====================================================================================
    // 🟨 🧾 EXPENSE API (Newly Added)
    // ====================================================================================
    addExpense: builder.mutation({
      query: (body) => ({
        url: "expense",
        method: "POST",
        body,
      }),
    }),

    getExpensesByDate: builder.query({
      query: (startDate) =>
        startDate
          ? `/expense-by-date?date=${new Date(startDate).toISOString()}`
          : "/all-expenses",
    }),

    getExpenses: builder.query({
      query: (type) => (type ? `expenses?type=${type}` : "expenses"),
    }),

    updateExpense: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `expense/${id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `expense/${id}`,
        method: "DELETE",
      }),
    }),


  }),
});



// ====================================================================================
// 🟨 Exported Hooks (auto-generated by RTK Query)
// ====================================================================================

export const {
  //🟨 Car Wash
  useSubmitCarWashBillMutation,
  useGetAllBillsQuery,
  useGetCarWashBillByDateQuery,
  useUpdateCommissionStatusMutation,
  useDeleteBillMutation,
  useUpdateBillMutation,

  //🟨 Detailing
  useGetAllBillsDetailingQuery,
  useGetDetailingBillByDateQuery,
  useUpdateCommissionStatusDetailingMutation,

  //🟨 Oil Shop
  useAddOilShopProductMutation,
  useGetAllOilShopProductsQuery,
  useUpdateOilShopProductMutation,
  useGetoilShopBillByDateQuery,
  useDeleteOilShopProductMutation,

  useAddOilSaleMutation,
  useGetFilteredOilSalesQuery,
  useUpdateOilSaleMutation,
  useDeleteOilSaleMutation,

  //🟨 Accessories
  useAddAccessoriesItemMutation,
  useGetAllAccessoriesItemsQuery,
  useGetAllSaleAccessoriesQuery,
  useGetAccessoriesBillByDateQuery,
  useDeleteAccessoriesSaleMutation,
  useUpdateAccessoriesSaleMutation,
  useDeleteAccessoriesItemsMutation,
  useUpdateAccessoriesItemsMutation,

  //🟨 Employees
  useAddEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,

  //🟨 Expense
  useAddExpenseMutation,
  useGetExpensesQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpensesByDateQuery,

} = carWashBillApi;
