import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayOut from "./Component/layout/LayOut";
import Home from "./Component/Home";
import SignUp from "./Component/page/accounts/SignUp"
import SignIn from "./Component/page/accounts/SignIn"
import Menue from "./Component/page/Menue"






function App() {
  return (
    <div>
       <Router>
   <Menue/>
       <Routes>
       <Route path="/sign-up" element={<SignUp />} />
       <Route path="/" element={<SignIn />} />
         <Route path="/dashbord" element={<LayOut />}>
         <Route path="home" element={<Home />} />  
        </Route>
      </Routes>
    </Router>
    </div>
  )
}

export default App
