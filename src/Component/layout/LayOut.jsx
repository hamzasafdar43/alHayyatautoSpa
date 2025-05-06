import React from "react";
import { IoIosHome } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import Menue from "../page/Menue";

function LayOut() {
  const sideBarList = [
    {
      name: "Home",
      url: "/home",
      icon: <IoIosHome />,
    },
    {
      name: "Bill Generate",
      url: "/bill",
      icon: <IoIosHome />,
    },
    {
      name: "Record",
      url: "/bill-record",
      icon: <IoIosHome />,
    },
    {
      name: "Users",
      url: "/users",
      icon: <IoIosHome />,
    },
    {
      name: "Commission",
      url: "/SingleUserCommission",
      icon: <IoIosHome />,
    },
  ];

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div className="w-[17%] h-[100vh]  bg-[#262626] text-white">
        <div>
            <h1 className="text-white font-[700] text-2xl mx-auto w-full flex justify-center mt-16">AlHayyatAuto</h1>
        </div>
        <div className="mt-11">
        {sideBarList.map((sidebar, index) => (
          <div key={index} >
            <NavLink
              to={sidebar.url}
              className={({ isActive }) =>
                isActive ? "w-[90%] h-10 bg-gray-100 mx-auto flex items-center  px-4 gap-5 text-[#262626] rounded-[10px] text-lg font-[500] " : " flex items-center w-[90%] h-11 mx-auto gap-5 px-4"
              }
            >

              {sidebar.icon} {sidebar.name}
            </NavLink>
          </div>
        ))}
      </div>
      </div>

      {/* Main content */}
      <div className="flex-1  bg-gray-100 overflow-y-auto">
        <div>
          <Menue/>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default LayOut;
