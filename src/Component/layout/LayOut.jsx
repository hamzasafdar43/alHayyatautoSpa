import React, { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import { FaListUl } from "react-icons/fa6";
import { RiOilFill } from "react-icons/ri";
import { FaUserLarge } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { AiOutlineHistory } from "react-icons/ai";
import { FaCarAlt } from "react-icons/fa";
import { FaCarCrash } from "react-icons/fa";
import { FaCarOn } from "react-icons/fa6";

function LayOut() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const sideBarList = [
    {
      name: "Home",
      url: "/dashbord/home",
      icon: <IoIosHome />,
    },
    {
      name: "Car Wash",
      url: "/dashbord/car-wash-record",
      icon: <FaCarOn />,
    },
    {
      name: " Detailing Studio",
      url: "/dashbord/car-detailing",
      icon: <FaCarAlt />,
    },
    {
      name: "OilShop",
      url: "/dashbord/oil-shop",
      icon: <RiOilFill />,
    },
    {
      name: " OilShop Sales",
      url: "/dashbord/sale-product",
      icon: <FcSalesPerformance />,
    },
    {
      name: " Accessories Shop",
      url: "/dashbord/accessories-shop",
      icon: <FaCarCrash />,
    },
    {
      name: " Accessories  Sale",
      url: "/dashbord/accessories-shop-record",
      icon: <FcSalesPerformance />,
    },
    {
      name: "Texi Stand",
      url: "/dashbord/taxi_stand",
      icon: <FcSalesPerformance />,
    },
    {
      name: "Gernal Expense",
      url: "/dashbord/expense",
      icon: <FcSalesPerformance />,
    },
     {
      name: "Rent",
      url: "/dashbord/rents",
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

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div
        className={` h-[100vh] lg:block hidden bg-[#262626] text-white ${
          isOpenSidebar ? "w-[5%] " : "w-[15%] "
        }`}
      >
        <div className="text-white mx-5">
          <FaListUl
            size={20}
            className="cursor-pointer mt-[80px]"
            onClick={sidebarIsOpenHandler}
          />
        </div>
        <div>
          <h1
            className={`text-white font-[700] text-2xl mx-auto w-full flex justify-center mt-5 ${
              isOpenSidebar && "hidden"
            }`}
          >
            ALHAYYAT
          </h1>
        </div>
        <div className="mt-11">
          {sideBarList.map((sidebar, index) => (
            <div key={index}>
              <NavLink
                to={sidebar.url}
                className={({ isActive }) =>
                  isActive
                    ? ` h-11 bg-[#4c4646] w-full text-white text-md  ${
                        isOpenSidebar
                          ? "flex items-center justify-center w-[70%]"
                          : "flex items-center w-[90%]"
                      }  px-4 gap-5 text-[#262626]  text-md font-[500] `
                    : " hover:bg-[#257aea] flex items-center w-[100%] h-11 gap-5 px-4"
                }
              >
                <span>{sidebar.icon}</span>
                <span className={`${isOpenSidebar && "hidden"}`}>
                  {sidebar.name}
                </span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        className={`  bg-gray-100 overflow-y-auto h-[100vh]  ${
          isOpenSidebar ? "lg:w-[95%] w-full " : "lg:w-[85%] w-full "
        } `}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default LayOut;
