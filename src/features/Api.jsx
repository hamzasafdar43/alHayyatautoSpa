import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const carWashBillApi = createApi({
  reducerPath: 'carWashApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    submitCarWashBill: builder.mutation({
      query: (body) => ({
        url: 'carWash-bill',
        method: 'POST',
        body,
      }),
    }),
    getAllBills: builder.query({
      query: () => 'carWash-bills',
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
          body
        };
      }
    })
  }),
});

export const {
  useSubmitCarWashBillMutation,
  useDeleteBillMutation,
  useUpdateBillMutation,
  useGetAllBillsQuery,
} = carWashBillApi;
