import React, { useMemo } from "react";

import CustomTable from "../../common/CustomTable";
import { useGetExpensesQuery } from "../../../features/Api";

function DailyExpense() {
 
  const { data: DailyExpense, refetch, isLoading, isError } = useGetExpensesQuery("daily");

  
  const columns = useMemo(
    () => ["Sr_No", "Id", "Category", "Amount", "Description", "Date", "Actions"],
    []
  );

 
  const rows = useMemo(() => {
    if (!DailyExpense?.data) return [];
    return DailyExpense.data
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
  }, [DailyExpense]);

  // Handlers
  const updateExpenseHandler = (row) => {
    console.log("Edit clicked:", row);
    // navigate or open modal to edit expense
  };

  const deleteExpenseHandler = (row) => {
    console.log("Delete clicked:", row);
    // call API to delete expense
  };

 
  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error fetching data</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow mx-auto w-[90%] mt-20">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Daily Expenses</h2>

      <CustomTable
        onClick={updateExpenseHandler}
        onClickDelete={deleteExpenseHandler}
        rows={rows}
        columns={columns}
      />
    </div>
  );
}

export default DailyExpense;
