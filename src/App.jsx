import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayOut from "./Component/layout/LayOut";
import Home from "./Component/Home";
import SignUp from "./Component/page/accounts/SignUp"
import SignIn from "./Component/page/accounts/SignIn"
import Menue from "./Component/page/Menue"
import PublicRoute from "./Component/protectRoutes/PublicRoute";
import ProtectedRoute from "./Component/protectRoutes/ProtectedRoute";
import Olishop from "./Component/page/olishop/Olishop";
import UserProfile from "./Component/page/accounts/UserProfile";
import SaleProduct from "./Component/page/salerecord/SaleProduct"
import History from "./Component/page/history/History";
import { ToastContainer } from "react-toastify";
import CustomToast from "./Component/common/CustomToast";
import CarDetailing from "./Component/page/cardetailing/CarDetailing"
import AccessoriesShop  from "./Component/page/accessories/AccessoriesShop"
import AccessoriesShopRecord from "./Component/page/accessories/AccessoriesShopRecord";
import CarWashRecord from "./Component/page/carWash/CarWashRecord";






function App() {
  return (
    <div>
       <CustomToast/>
       <Router>
   <Menue/>
       <Routes>
       <Route path="/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
       <Route path="/" element={<PublicRoute><SignIn /></PublicRoute>} />
         <Route path="/dashbord" element={<ProtectedRoute><LayOut /></ProtectedRoute>}>
         <Route path="home" element={<Home />} />  
         <Route path="oil-shop" element={<Olishop />} />
         <Route path="car-detailing" element={< CarDetailing />} />
         <Route path="accessories-shop" element={<AccessoriesShop />} />
         <Route path="accessories-shop-record" element={<AccessoriesShopRecord />} />
         <Route path="oil-shop" element={<Olishop />} />
         <Route path="car-wash-record" element={<CarWashRecord />} />
         <Route path="user-profile" element={<UserProfile />} />
         <Route path="sale-product" element={< SaleProduct/>} />
         <Route path="history" element={< History/>} />
        </Route>
      </Routes>
    </Router>
    </div>
  )
}

export default App
