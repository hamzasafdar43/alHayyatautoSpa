import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AccessoriesProductList from "./Component/page/accessories/AccessoriesProduct/AccessoriesProductList";
import AccessoriesSalesOverview from "./Component/page/accessories/AccessoriesSales/AccessoriesSalesOverview";
import AddExpense from "./Component/page/expense/AddExpense";
import CarWashRecord from "./Component/page/carWash/CarWashRecord";
import CustomToast from "./Component/common/CustomToast";
import DailyExpense from "./Component/page/expense/DailyExpense";
import DailyHistory from "./Component/page/history/DailyHistory";
import DetailingRecords from "./Component/page/detailingStudio/DetailingRecords";
import Employee from "./Component/page/employees/Employee";
import Home from "./Component/Home";
import LayOut from "./Component/layout/LayOut";
import MonthlyExpense from "./Component/page/expense/MonthlyExpense";
import MonthlyHistory from "./Component/page/history/MonthlyHistory";
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
        {/* {user?.user?.token && <Menue />} */}

        <Routes>
         

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
            <Route path="expense" element={<AddExpense />} />
            <Route path="monthly-expense" element={<MonthlyExpense />} />
            <Route path="daily-expense" element={<DailyExpense />} />
            <Route path="taxi_stand" element={<TaxiStand />} />
            <Route path="rents" element={<Rents />} />
            <Route path="detailing-records" element={<DetailingRecords />} />
            <Route path="employee" element={<Employee />} />
            <Route path="daily-sales" element={<DailyHistory />} />
           <Route path="monthly-sales" element={<MonthlyHistory />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
