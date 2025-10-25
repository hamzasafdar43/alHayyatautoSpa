import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Layout & Common Components
import LayOut from "./Component/layout/LayOut";
import CustomToast from "./Component/common/CustomToast";
import Menue from "./Component/page/Menue";

// Auth Pages
import SignUp from "./Component/page/accounts/SignUp";
import SignIn from "./Component/page/accounts/SignIn";
import UserProfile from "./Component/page/accounts/UserProfile";

// Pages
import Home from "./Component/Home";


import AccessoriesProductList from "./Component/page/accessories/AccessoriesProduct/AccessoriesProductList";
import AccessoriesSalesOverview from "./Component/page/accessories/AccessoriesSales/AccessoriesSalesOverview";


import CarWashRecord from "./Component/page/carWash/CarWashRecord";

import Expense from "./Component/page/expense/Expense";
import TaxiStand from "./Component/page/taxiStand/TaxiStand";
import Rents from "./Component/page/shopRent/Rents";
import DetailingRecords from "./Component/page/detailingStudio/DetailingRecords";
import Employee from "./Component/page/employees/Employee";
import History from "./Component/page/history/History";

// Reports
import DetailingMonthlyReport from "./Component/page/history/detailingrecord/DetailingMonthlyReport";
import CheckMonthlyReport from "./Component/page/history/carwashrecord/CheckMonthlyReport";

// Route Guards
import PublicRoute from "./Component/protectRoutes/PublicRoute";
import ProtectedRoute from "./Component/protectRoutes/ProtectedRoute";

import OilProductList from "./Component/page/oliShop/OilProduct/OilProductList";
import OilSalesOverview from "./Component/page/oliShop/OilSales/OilSalesOverview";

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
            path="/detailing-monthly-report/:month"
            element={<DetailingMonthlyReport />}
          />
          <Route
            path="/monthly-report/:month"
            element={<CheckMonthlyReport />}
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
            <Route path="expense" element={<Expense />} />
            <Route path="taxi_stand" element={<TaxiStand />} />
            <Route path="rents" element={<Rents />} />
            <Route path="detailing-records" element={<DetailingRecords />} />
            <Route path="employee" element={<Employee />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
