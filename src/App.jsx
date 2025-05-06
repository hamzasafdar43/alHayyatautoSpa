import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayOut from "./Component/layout/LayOut";
import SingleUserCommission from "../../../alHayyat/frontend/alHayyat/src/Component/page/SingleUserCommission";
import CarWashBill from "./Component/page/CarWashBill";
import AllUsers from "./Component/page/AllUsers";
import CarWashbillRecord from "./Component/page/CarWashbillRecord";
import Commission from "./Component/page/Commission";
import Home from "./Component/Home";





function App() {
  return (
    <div>
       <Router>
   
       <Routes>
         <Route path="/" element={<LayOut />}>
         <Route path="home" element={<Home />} />
         <Route path="bill" element={<CarWashBill />} />
           <Route path="bill-record" element={<CarWashbillRecord />} />
           <Route path="users" element={<AllUsers />} />
           <Route
            path="SingleUserCommission"
            element={<Commission />}
          />
        </Route>
      </Routes>
    </Router>
    </div>
  )
}

export default App
