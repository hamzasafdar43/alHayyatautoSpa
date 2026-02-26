import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AccessoriesProductList from "./Component/page/accessories/AccessoriesProduct/AccessoriesProductList";
import AccessoriesSalesOverview from "./Component/page/accessories/AccessoriesSales/AccessoriesSalesOverview";
import AddExpense from "./Component/page/expense/AddExpense";
import CarWashRecord from "./Component/page/carWash/CarWashRecord";
import CheckMonthlyReports from "./Component/page/history/CheckMonthlyReports";
import CustomToast from "./Component/common/CustomToast";
import DailyExpense from "./Component/page/expense/DailyExpense";
import DailySales from "./Component/page/dailySales/DailySales";
import DetailingRecords from "./Component/page/detailingStudio/DetailingRecords";
import Employee from "./Component/page/employees/Employee";
import History from "./Component/page/history/History";
import Home from "./Component/Home";
import LayOut from "./Component/layout/LayOut";
import Menue from "./Component/page/Menue";
import MonthlyExpense from "./Component/page/expense/MonthlyExpense";
import OilProductList from "./Component/page/oliShop/OilProduct/OilProductList";
import OilSalesOverview from "./Component/page/oliShop/OilSales/OilSalesOverview";
import ProtectedRoute from "./Component/protectRoutes/ProtectedRoute";
import PublicRoute from "./Component/protectRoutes/PublicRoute";
import React from "react";
import Rents from "./Component/page/shopRent/Rents";
import SignIn from "./Component/page/accounts/SignIn";
import SignUp from "./Component/page/accounts/SignUp";
import TaxiStand from "./Component/page/taxiStand/TaxiStand";
import UserProfile from "./Component/page/accounts/UserProfile";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <CustomToast />

      <Router>
        {user?.user?.token && <Menue />}

        <Routes>
          {/* Reports */}
         
          <Route
           path="/history/:tab/month/:month"
            element={<CheckMonthlyReports />}
          />

          {/* Public Routes */}
          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashbord"
            element={
              <ProtectedRoute>
                <LayOut />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="oil-shop" element={<OilProductList />} />
            <Route path="accessories-shop" element={<AccessoriesProductList />} />
            <Route
              path="accessories-shop-record"
              element={<AccessoriesSalesOverview />}
            />
            
      <Route path="car-wash-record" element={<CarWashRecord />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="sale-product" element={<OilSalesOverview />} />
            <Route path="history" element={<History />} />
            <Route path="expense" element={<AddExpense />} />
            <Route path="monthly-expense" element={<MonthlyExpense />} />
            <Route path="daily-expense" element={<DailyExpense />} />
            <Route path="taxi_stand" element={<TaxiStand />} />
            <Route path="rents" element={<Rents />} />
            <Route path="detailing-records" element={<DetailingRecords />} />
            <Route path="employee" element={<Employee />} />
            <Route path="daily-sales" element={<DailySales />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
