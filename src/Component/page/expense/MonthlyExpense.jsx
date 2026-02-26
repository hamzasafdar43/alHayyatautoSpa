import React, { useMemo, useState } from "react";

import AddExpense from "./AddExpense";
import CustomTable from "../../common/CustomTable";
import { useGetExpensesQuery } from "../../../features/Api";
import { useNavigate } from "react-router-dom";

function MonthlyExpense() {
  const [isOpen , setIsOpen] = useState(false)
  const [selectedIdex , setSelectedIndex] = useState(null)
  const { data: MonthlyExpense, refetch, isLoading, isError } = useGetExpensesQuery("monthly");

  const navigate = useNavigate();


 
  const columns = useMemo(
    () => ["Sr_No", "Id", "Category", "Amount", "Description", "Date", "Actions"],
    []
  );

 
  const rows = useMemo(() => {
    if (!MonthlyExpense?.data) return [];
    return MonthlyExpense.data
      .slice()
      .reverse()
      .map((expense, index) => ({
        Sr_No: index + 1,
        Id: expense._id,
        Category: expense.category?.replace(/_/g, " "), 
        Amount: expense.amount,
        Description: expense.description || "—",
        Date: new Date(expense.date).toLocaleDateString("en-GB"),
      }));
  }, [MonthlyExpense]);

  // Edit / Delete Handlers
  const updateExpenseHandler = (row) => {
   try {
    setSelectedIndex(row.Id);
      setIsOpen(true);
    
      navigate(`/dashboard/expense/${row.Id}`);
   } catch (error) {
    
   }
  };

  const deleteExpenseHandler = (row) => {
  try {
    setSelectedIndex(row.Id)
  } catch (error) {
    
  }
  };

  // Handle loading/error UI
  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error fetching data</div>;

  return (
    <>
    <div className="p-4 bg-white rounded-lg shadow mx-auto mt-20 w-[90%]">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Monthly Expenses</h2>

      <CustomTable
        onClick={updateExpenseHandler}
        onClickDelete={deleteExpenseHandler}
        rows={rows}
        columns={columns}
      />
    </div>

 
    </>

  );
}

export default MonthlyExpense;
