import React, { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/createSlice";
import { FaListUl } from "react-icons/fa6";
import { RiOilFill } from "react-icons/ri";
import { FaUserLarge } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { AiOutlineHistory } from "react-icons/ai";

function Menue() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [logoutDropDown , setLogoutDropDown ] = useState(false)
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch()
  const navigate = useNavigate()

 const sideBarList = [
    {
      name: "Home",
      url: "/dashbord/home",
      icon: <IoIosHome />,
    },
    {
      name: "OliShop",
      url: "/dashbord/oil-shop",
      icon: <RiOilFill />,
    },
    {
      name: "Sales",
      url: "/dashbord/sale-product",
      icon: <FcSalesPerformance />,
    },
    {
      name: "Profile",
      url: "/dashbord/user-profile",
      icon: <FaUserLarge />,
    },
    {
      name: "History",
      url: "/dashbord/history",
      icon: <AiOutlineHistory />,
    },
   
  ];
 
  const sidebarIsOpenHandler = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };


  const logoutDropDownHandler = () => {
    setLogoutDropDown(!logoutDropDown)
  }

  const logOutUserHandler = async() => {
 const response = await dispatch(logout())
 console.log("logout response" , response)
 navigate("/")
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="h-[80px] bg-[#262626] flex items-center justify-between px-8 fixed top-0 left-0 right-0 z-50">
        <div>
          <FaListUl
            size={25}
            className="cursor-pointer text-white lg:hidden block"
            onClick={sidebarIsOpenHandler}
          />
        </div>
        {user && (<div className="border border-gray-100 w-20 h-8 cursor-pointer flex justify-center items-center" onClick={logoutDropDownHandler}>
          <h1 className="text-white capitalize font-[500]">
            {user?.user?.name}
          </h1>
        </div>)}
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed top-0 left-0 h-full w-[60%] bg-[#262626] z-40 transform transition-transform duration-300 ease-in-out ${
          isOpenSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="m-8">
          <FaListUl
            size={25}
            className="cursor-pointer text-white"
            onClick={sidebarIsOpenHandler}
          />
        </div>
        <div className="mt-11">
          {sideBarList.map((sidebar, index) => (
            <div key={index}>
              <NavLink
                to={sidebar.url}
                onClick={sidebarIsOpenHandler}
                className={({ isActive }) =>
                  isActive
                    ? "h-10 bg-gray-100 flex items-center w-[90%] mx-auto px-4 gap-5 text-[#262626] rounded-[10px] text-lg font-[500]"
                    : "flex items-center w-[90%] h-11 mx-auto gap-5 px-4 text-white"
                }
              >
                {sidebar.icon}
                <span>{sidebar.name}</span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      {
        logoutDropDown && (
          <div className="fixed h-[100vh] w-full top-0 left-0  z-50" onClick={()=>setLogoutDropDown(false)}>
          <div className="bg-white border-[1px] border-[#262626] w-[100px] absolute right-6 flex justify-center items-center p-1 cursor-pointer rounded-[4px] z-50 mt-[60px]" onClick={logOutUserHandler}>
            <h1 className="font-[500]">LogOut</h1>
          </div>
          </div>
        )
      }
    </>
  );
}

export default Menue;
