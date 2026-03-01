import {
  useGetAllBillsDetailingQuery,
  useGetAllBillsQuery,
  useGetAllSaleAccessoriesQuery,
  useGetExpensesByDateQuery,
  useGetExpensesQuery,
  useGetFilteredOilSalesQuery,
} from "../../../features/Api";

import React from "react";

function MonthlyHistory() {
  const { data: carWash = [], isLoading, error } =
    useGetAllBillsQuery("year");
  const { data: detailing = [] } =
    useGetAllBillsDetailingQuery("year");
  const { data: oil = [] } =
    useGetFilteredOilSalesQuery("year");
  const { data: accessories = [] } =
    useGetAllSaleAccessoriesQuery("year");
  const { data: monthlyExpense } =
    useGetExpensesQuery("monthly");
  const { data: dailyExpense } =
    useGetExpensesQuery("daily");

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 p-4">Error</div>;

  const currentYear = new Date().getFullYear();
  const toNumber = (v) => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));


  const monthlyReport = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "long" }),
    carWashBill: 0,
    carWashCommission: 0,
    detailingBill: 0,
    detailingCommission: 0,
    oilSale: 0,
    oilCost: 0,
    oilProfit: 0,
    accSale: 0,
    accCost: 0,
    accProfit: 0,
    dailyExpense: 0,
    monthlyExpense: 0,
  }));

  // Car Wash
  carWash.forEach((b) => {
    const m = new Date(b.createdAt).getMonth();
    const total = toNumber(b.bill);
    const commission = toNumber(b.commission);
    monthlyReport[m].carWashBill += total;
    monthlyReport[m].carWashCommission += commission;
  });

 
  

  // Detailing
  detailing.forEach((b) => {
    const m = new Date(b.createdAt).getMonth();
    const total = toNumber(b.detailingBill);
    const commission = toNumber(b.commission);
    monthlyReport[m].detailingBill += total;
    monthlyReport[m].detailingCommission += commission;
  });

  // Oil Shop
  oil.forEach((b) => {
    const m = new Date(b.createdAt).getMonth();
    const sale = toNumber(b.sellingPrice);
    const cost = toNumber(b.productId?.cost);
    monthlyReport[m].oilSale += sale;
    monthlyReport[m].oilCost += cost;
    monthlyReport[m].oilProfit += sale - cost;
  });

  // Accessories
  accessories.forEach((b) => {
    const m = new Date(b.createdAt).getMonth();
    const sale = toNumber(b.sellingPrice);
    const cost = toNumber(b.productId?.cost);
    monthlyReport[m].accSale += sale;
    monthlyReport[m].accCost += cost;
    monthlyReport[m].accProfit += sale - cost;
  });

  // Expenses
  monthlyExpense?.data?.forEach((e) => {
    const m = new Date(e.createdAt).getMonth();
    monthlyReport[m].monthlyExpense += toNumber(e.amount);
  });

  dailyExpense?.data?.forEach((e) => {
    const m = new Date(e.createdAt).getMonth();
    monthlyReport[m].dailyExpense += toNumber(e.amount);
  });

 return (
  <div className="w-[95%] mx-auto my-10 space-y-10">
    <h2 className="text-3xl font-bold text-center">
      Monthly Financial Report ({currentYear})
    </h2>

    {monthlyReport.map((r, i) => {
      const serviceProfit =
        (r.carWashBill - r.carWashCommission) +
        (r.detailingBill - r.detailingCommission);

      const productProfit = r.oilProfit + r.accProfit;

      const totalExpense = r.dailyExpense + r.monthlyExpense;

      const netProfit =
        serviceProfit + productProfit ;

       

      return (

        <div
          key={i}
         
        >
          <h3 className="text-xl font-semibold text-blue-600 my-2">
            {r.month}
          </h3>
          <div  className=" rounded-2xl p-6 border-gray-200 border-[1px] space-y-6">

          <div className="grid md:grid-cols-4 gap-6">

            {/* Services */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-bold mb-2">Services</h4>
              <p>CarWash: {r.carWashBill - r.carWashCommission}</p>
              <p>Detailing: {r.detailingBill - r.detailingCommission}</p>
              <p className="text-green-600 font-semibold">
                Profit: {serviceProfit.toFixed(0)}
              </p>
            </div>

            {/* Products */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-bold mb-2">Products</h4>
              <p>Oil Profit: {r.oilProfit.toFixed(0)}</p>
              <p>Accessories Profit: {r.accProfit.toFixed(0)}</p>
              <p className="text-green-600 font-semibold">
                Total: {productProfit.toFixed(0)}
              </p>
            </div>

            {/* Expenses */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-bold mb-2 text-red-600">Expenses</h4>
              <p>Daily: {r.dailyExpense.toFixed(0)}</p>
              <p>Monthly: {r.monthlyExpense.toFixed(0)}</p>
              <p className="font-semibold">
                Total: {totalExpense.toFixed(0)}
              </p>
            </div>

            {/* Net Profit */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-bold mb-2">Services+Products</h4>
              <p
                className={`text-2xl font-bold ${
                  netProfit >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {netProfit.toFixed(0)}
              </p>
            </div>

          </div>
        </div>
        </div>
      );
    })}
  </div>
);

}

export default MonthlyHistory;
