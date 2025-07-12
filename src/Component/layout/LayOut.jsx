import React, { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import { FaListUl } from "react-icons/fa6";
import { RiOilFill } from "react-icons/ri";
import { FaUserLarge, FaCarOn } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { AiOutlineHistory } from "react-icons/ai";
import { FaCarAlt, FaCarCrash } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

function LayOut() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    oilShop: false,
    accessories: false,
    rent: false,
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sidebarIsOpenHandler = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const mainMenu = [
    {
      name: "Dashboard",
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
  ];

  const oilShopGroup = [
    {
      name: "Oil Shop Inventory",
      url: "/dashbord/oil-shop",
      icon: <RiOilFill />,
    },
    {
      name: "Oil Shop Sales",
      url: "/dashbord/sale-product",
      icon: <FcSalesPerformance />,
    },
  ];

  const accessoriesGroup = [
    {
      name: "Accessories Inventory",
      url: "/dashbord/accessories-shop",
      icon: <FaCarCrash />,
    },
    {
      name: "Accessories Sales",
      url: "/dashbord/accessories-shop-record",
      icon: <FcSalesPerformance />,
    },
  ];

  const rentGroup = [
    {
      name: "Rental Records",
      url: "/dashbord/rents",
      icon: <FcSalesPerformance />,
    },
  ];

  const bottomMenu = [
    {
      name: "Taxi Stand Logs",
      url: "/dashbord/taxi_stand",
      icon: <FcSalesPerformance />,
    },
    {
      name: "General Expenses",
      url: "/dashbord/expense",
      icon: <FcSalesPerformance />,
    },
    {
      name: "User Profile",
      url: "/dashbord/user-profile",
      icon: <FaUserLarge />,
    },
    {
      name: "Activity History",
      url: "/dashbord/history",
      icon: <AiOutlineHistory />,
    },
  ];

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div
        className={`h-screen lg:block hidden bg-[#1F2937] text-white shadow-lg transition-all duration-300 ${
          isOpenSidebar ? "w-[70px]" : "w-[230px]"
        } flex flex-col justify-between`}
      >
        {/* Header */}
        <div>
          <div className="p-4 flex items-center justify-between mt-8">
            {!isOpenSidebar && (
              <h1 className="text-2xl font-bold tracking-wider text-white">
                ALHAYYAT
              </h1>
            )}
            <FaListUl
              size={20}
              className="cursor-pointer"
              onClick={sidebarIsOpenHandler}
            />
          </div>

          {/* Top Menu Items */}
          <div className="mt-6">
            {mainMenu.map((item, index) => (
              <NavLink
                key={index}
                to={item.url}
                className={({ isActive }) =>
                  `flex items-center px-5 py-3 transition-all duration-200 ${
                    isActive ? "bg-[#374151]" : "hover:bg-[#2563EB]"
                  } ${isOpenSidebar ? "justify-center" : "gap-4"}`
                }
              >
                <span className="text-lg">{item.icon}</span>
                {!isOpenSidebar && (
                  <span className="text-sm font-medium tracking-wide">
                    {item.name}
                  </span>
                )}
              </NavLink>
            ))}

            {/* OilShop Dropdown */}
            <div
              className="cursor-pointer flex items-center gap-5 px-5 py-3 hover:bg-[#2563EB]"
              onClick={() => toggleDropdown("oilShop")}
            >
              <span>
                <RiOilFill />
              </span>
              {!isOpenSidebar && (
                <span className="text-sm font-medium">OilShop</span>
              )}
              <span className="ml-auto">
                {dropdowns.oilShop ? (
                  <MdKeyboardArrowUp size={25} />
                ) : (
                  <MdKeyboardArrowDown size={25} />
                )}
              </span>
            </div>
            {dropdowns.oilShop && !isOpenSidebar && (
              <div>
                {oilShopGroup.map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.url}
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-[#4c4646] block  py-2 rounded"
                        : "text-white hover:text-blue-300 block px-4 py-2"
                    }
                  >
                    <div className="flex mx-4">
                      <span className="mr-2">{item.icon}</span>{" "}
                      <span>{item.name}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}

            {/* Accessories Dropdown */}
            <div
              className="cursor-pointer flex items-center gap-5 px-5 py-3 hover:bg-[#2563EB]"
              onClick={() => toggleDropdown("accessories")}
            >
              <span>
                <FaCarCrash />
              </span>
              {!isOpenSidebar && (
                <span className="text-sm font-medium">Accessories</span>
              )}
              <span className="ml-auto">
                {dropdowns.accessories ? (
                  <MdKeyboardArrowUp size={25} />
                ) : (
                  <MdKeyboardArrowDown size={25} />
                )}
              </span>
            </div>
            {dropdowns.accessories && !isOpenSidebar && (
              <div>
                {accessoriesGroup.map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.url}
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-[#4c4646] block px-4 py-2 rounded"
                        : "text-white hover:text-blue-300 block px-4 py-2"
                    }
                  >
                    <div className="flex mx-4">
                      <span className="mr-2">{item.icon}</span>{" "}
                      <span>{item.name}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}

            {/* Rent Dropdown */}
            <div
              className="cursor-pointer flex items-center gap-5 px-5 py-3 hover:bg-[#2563EB]"
              onClick={() => toggleDropdown("rent")}
            >
              <span>
                <FcSalesPerformance />
              </span>
              {!isOpenSidebar && (
                <span className="text-sm font-medium">Rent</span>
              )}
              <span className="ml-auto">
                {dropdowns.rent ? (
                  <MdKeyboardArrowUp size={25} />
                ) : (
                  <MdKeyboardArrowDown size={25} />
                )}
              </span>
            </div>
            {dropdowns.rent && !isOpenSidebar && (
              <div>
                {rentGroup.map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.url}
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-[#4c4646] block px-4 py-2 rounded"
                        : "text-white hover:text-blue-300 block px-4 py-2"
                    }
                  >
                    <div className="flex mx-4">
                      <span className="mr-2">{item.icon}</span>{" "}
                      <span>{item.name}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Menu */}
        <div className="mb-5">
          {bottomMenu.map((item, index) => (
            <NavLink
              key={index}
              to={item.url}
              className={({ isActive }) =>
                `flex items-center px-5 py-3 transition-all duration-200 ${
                  isActive ? "bg-[#374151]" : "hover:bg-[#2563EB]"
                } ${isOpenSidebar ? "justify-center" : "gap-4"}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!isOpenSidebar && (
                <span className="text-sm font-medium tracking-wide">
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`bg-gray-100 overflow-y-auto h-screen ${
          isOpenSidebar ? "lg:w-[95%] w-full" : "lg:w-[85%] w-full"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default LayOut;
