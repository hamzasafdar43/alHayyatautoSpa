import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useAddExpenseMutation, useGetExpensesQuery } from "../../../features/Api";

import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomSelect from "../../common/CustomSelect";
import { showToast } from "../../common/CustomToast";
import { useNavigate } from "react-router-dom";

function AddExpense() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("daily");
  const [addExpense] = useAddExpenseMutation()
    const {data , refetch} = useGetExpensesQuery()

  const dailyOptions = [
    { value: "guest_refreshment", label: "Guest Refreshment" },
    { value: "labour_food", label: "Labour Food" },
    { value: "labour_tea", label: "Labour Tea" },
    { value: "other", label: "Other" },
  ];

  const monthlyOptions = [
    { value: "rent_carwash_stand", label: "Rent (Carwash Stand)" },
    { value: "electricity_bill", label: "Electricity Bill" },
    { value: "gas_bill", label: "Gas Bill" },
    { value: "tax", label: "Tax" },
    { value: "other", label: "Other" },
  ];

  const validationSchema = Yup.object({
    expenseType: Yup.string().required("Please select expense type"),
    category: Yup.string().required("Please select a category"),
    amount: Yup.number().required("Enter amount"),
    date: Yup.date().required("Select a date"),
  });

  const initialValues = {
    expenseType: "daily",
    category: "",
    amount: "",
    date: "",
    description: "",
  };

  const handleSubmit = async(values, { resetForm }) => {
   try {

    const response = await addExpense(values).unwrap()

    if(response){
       showToast(response?.message || "Expense Add Successfully");
    }
   
  refetch()
    resetForm();
   } catch (error) {
     showToast(errorMessage, "error");
   }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-10 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
        Expense Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT - Daily Expense Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              🕓 Daily Expenses
            </h2>
            <button
              onClick={() => navigate("/dashbord/daily-expense")}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
            >
              View Details
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                <CustomSelect
                  name="category"
                  label="Select Category"
                  option={dailyOptions}
                  onChange={(e) => setFieldValue("category", e.target.value)}
                />

                <CustomInput
                  name="amount"
                  type="number"
                  label="Amount"
                  placeholder="Enter amount"
                />

                <CustomInput name="date" type="date" label="Date" />

                <CustomInput
                  name="description"
                  type="text"
                  label="Description"
                  placeholder="Optional note or details"
                />

                <div className="text-center">
                  <CustomButton
                    type="submit"
                    title="Save Daily Expense"
                    className="w-full"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* RIGHT - Monthly Expense Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              📅 Monthly Expenses
            </h2>
            <button
              onClick={() => navigate("/dashbord/monthly-expense")}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
            >
              View Details
            </button>
          </div>

          <Formik
            initialValues={{
              expenseType: "monthly",
              category: "",
              amount: "",
              date: "",
              description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                <CustomSelect
                  name="category"
                  label="Select Category"
                  option={monthlyOptions}
                  onChange={(e) => setFieldValue("category", e.target.value)}
                />

                <CustomInput
                  name="amount"
                  type="number"
                  label="Amount"
                  placeholder="Enter amount"
                />

                <CustomInput name="date" type="date" label="Date" />

                <CustomInput
                  name="description"
                  type="text"
                  label="Description"
                  placeholder="Optional note or details"
                />

                <div className="text-center">
                  <CustomButton
                    type="submit"
                    title="Save Monthly Expense"
                    className="w-full"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
