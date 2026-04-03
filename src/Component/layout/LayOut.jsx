import {
  FaCarAlt,
  FaCarCrash,
  FaUsers,
} from "react-icons/fa";
import { FaCarOn, FaListUl, FaUserLarge } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineHistory } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";
import { IoIosHome } from "react-icons/io";
import { RiOilFill } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import { logout } from "../../features/createSlice";

function LayOut() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  // ✅ ALL MENUS COMBINED IN ONE ARRAY
  const menuItems = [
    {
      name: "Home",
      url: "/dashbord/home",
      icon: <IoIosHome />,
    },
    {
      name: "Car Wash Records",
      url: "/dashbord/car-wash-record",
      icon: <FaCarOn />,
    },
    {
      name: "Detailing Studio",
      url: "/dashbord/detailing-records",
      icon: <FaCarAlt />,
    },
     {
      name: "General Expenses",
      url: "/dashbord/expense",
      icon: <FcSalesPerformance />,
    },
    {
      name: "Employees Records",
      url: "/dashbord/employee",
      icon: <FaUsers />,
    },
    // {
    //   name: "User Profile",
    //   url: "/dashbord/user-profile",
    //   icon: <FaUserLarge />,
    // },
    {
      name: "Inventory Shop",
      icon: <RiOilFill />,
      children: [
        {
          name: "Oil Shop Inventory",
          url: "/dashbord/oil-shop",
          icon: <RiOilFill />,
        },
         {
          name: "Accessories Inventory",
          url: "/dashbord/accessories-shop",
          icon: <FaCarCrash />,
        },
        
      ],
    },
    {
      name: "Sales Records",
      icon: <FaCarCrash />,
      children: [
       
        {
          name: "Accessories Sales",
          url: "/dashbord/accessories-shop-record",
          icon: <FcSalesPerformance />,
        },
        {
          name: "Oil Shop Sales",
          url: "/dashbord/sale-product",
          icon: <FcSalesPerformance />,
        },
      ],
    },
    
   
    {
      name: "Activity History",
      children :[
 {
      name: "Daily Reports",
      url: "/dashbord/daily-sales",
      icon: <TbReportMoney />,
    },
    {
      name: "Monthly Reports",
      url: "/dashbord/monthly-sales",
      icon: <TbReportMoney />,
    },
      ]
    },
   
  ];

  return (
    <div className="flex w-full h-screen">

      {/* ✅ Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-14 bg-[#1F2937] text-white flex items-center justify-between px-4 z-50">
        <h1 className="font-bold">ALHAYYAT</h1>
        <FaListUl size={22} className="cursor-pointer" onClick={toggleSidebar} />
      </div>

      {/* ✅ Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full bg-[#1F2937] text-white transition-all duration-300 z-40
        ${isSidebarOpen ? "w-[230px]" : "w-0 lg:w-[230px]"}
        overflow-hidden`}
      >
        <div className="p-4 mt-14 lg:mt-6">

          {menuItems.map((item, index) => (
            <div key={index}>
              {item.children ? (
                <>
                  {/* Dropdown Parent */}
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#2563EB]"
                    onClick={() => toggleDropdown(item.name)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    {activeDropdown === item.name ? (
                      <MdKeyboardArrowUp size={25} />
                    ) : (
                      <MdKeyboardArrowDown size={25} />
                    )}
                  </div>

                  {/* Dropdown Children */}
                  {activeDropdown === item.name &&
                    item.children.map((child, i) => (
                      <NavLink
                        key={i}
                        to={child.url}
                        className={({ isActive }) =>
                          `block px-7 py-2 text-sm ${
                            isActive
                              ? "bg-[#374151]"
                              : "hover:bg-[#2563EB]"
                          }`
                        }
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          {child.icon}
                          {child.name}
                        </div>
                      </NavLink>
                    ))}
                </>
              ) : (
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 ${
                      isActive ? "bg-[#374151]" : "hover:bg-[#2563EB]"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              )}
            </div>
          ))}

          {/* Logout */}
          <div
            onClick={handleLogout}
            className="mt-5 px-4 py-3 cursor-pointer hover:bg-[#2563EB] fixed bottom-0 w-[200px]"
          >
            Logout
          </div>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 bg-gray-100 overflow-y-auto mt-14 lg:mt-0">
        <Outlet />
      </div>
    </div>
  );
}

export default LayOut;