import React, { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import { FaListUl } from "react-icons/fa6";

function LayOut() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const sideBarList = [
    {
      name: "Home",
      url: "/dashbord/home",
      icon: <IoIosHome />,
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
          isOpenSidebar ? "w-[5%] " : "w-[17%] "
        }`}
      >
        <div className="text-white m-5">
          <FaListUl
            size={25}
            className="cursor-pointer mt-[80px]"
            onClick={sidebarIsOpenHandler}
          />
        </div>
        <div>
          <h1
            className={`text-white font-[700] text-2xl mx-auto w-full flex justify-center mt-16 ${
              isOpenSidebar && "hidden"
            }`}
          >
            AlHayyatAuto
          </h1>
        </div>
        <div className="mt-11">
          {sideBarList.map((sidebar, index) => (
            <div key={index}>
              <NavLink
                to={sidebar.url}
                className={({ isActive }) =>
                  isActive
                    ? ` h-10 bg-gray-100 mx-auto  ${
                        isOpenSidebar
                          ? "flex items-center justify-center w-[70%]"
                          : "flex items-center w-[90%]"
                      }  px-4 gap-5 text-[#262626] rounded-[10px] text-lg font-[500] `
                    : " flex items-center w-[90%] h-11 mx-auto gap-5 px-4"
                }
              >
                {sidebar.icon}{" "}
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
          isOpenSidebar ? "lg:w-[95%] w-full " : "lg:w-[83%] w-full "
        } `}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default LayOut;
