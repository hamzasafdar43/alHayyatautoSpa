import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/createSlice";

import { IoIosHome } from "react-icons/io";
import { FaListUl } from "react-icons/fa6";
import { RiOilFill } from "react-icons/ri";
import { FaUserLarge, FaCarOn } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { AiOutlineHistory } from "react-icons/ai";
import { FaCarAlt, FaCarCrash } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

function Menue() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [logoutDropDown, setLogoutDropDown] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    oilShop: false,
    accessories: false,
    rent: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const sidebarIsOpenHandler = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const logOutUserHandler = async () => {
    const response = await dispatch(logout());
    console.log("logout response", response);
    navigate("/");
  };

  const mainMenu = [
    { name: "Dashboard", url: "/dashbord/home", icon: <IoIosHome /> },
    { name: "Car Wash Records", url: "/dashbord/car-wash-record", icon: <FaCarOn /> },
    { name: "Detailing Studio", url: "/dashbord/detailing-records", icon: <FaCarAlt /> },
  ];

  const oilShopGroup = [
    { name: "Oil Shop Inventory", url: "/dashbord/oil-shop", icon: <RiOilFill /> },
    { name: "Oil Shop Sales", url: "/dashbord/sale-product", icon: <FcSalesPerformance /> },
  ];

  const accessoriesGroup = [
    { name: "Accessories Inventory", url: "/dashbord/accessories-shop", icon: <FaCarCrash /> },
    { name: "Accessories Sales", url: "/dashbord/accessories-shop-record", icon: <FcSalesPerformance /> },
  ];

  const rentGroup = [
    { name: "Rental Records", url: "/dashbord/rents", icon: <FcSalesPerformance /> },
  ];

  const bottomMenu = [
    { name: "Taxi Stand Logs", url: "/dashbord/taxi_stand", icon: <FcSalesPerformance /> },
    { name: "General Expenses", url: "/dashbord/expense", icon: <FcSalesPerformance /> },
    { name: "User Profile", url: "/dashbord/user-profile", icon: <FaUserLarge /> },
    { name: "Activity History", url: "/dashbord/history", icon: <AiOutlineHistory /> },
  ];

  return (
    <>
      {/* Topbar Mobile */}
      <div className="h-[80px] lg:hidden bg-[#262626] flex items-center justify-between px-8 fixed top-0 left-0 right-0 z-50">
        <FaListUl size={25} className="cursor-pointer text-white" onClick={sidebarIsOpenHandler} />
        {user && (
          <div
            className="border border-gray-100 w-20 h-8 cursor-pointer flex justify-center items-center"
            onClick={() => setLogoutDropDown(!logoutDropDown)}
          >
            <h1 className="text-white capitalize font-[500]">
              {user?.user?.name}
            </h1>
          </div>
        )}
      </div>

      {/* Sidebar Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[70%] bg-[#1F2937] text-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpenSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:hidden  pt-[90px]`}
      >
        {/* Top Links */}
        <div className="px-4">
          {mainMenu.map((item, i) => (
            <NavLink
              key={i}
              to={item.url}
              onClick={sidebarIsOpenHandler}
              className={({ isActive }) =>
                `flex items-center py-2 px-2 rounded transition ${
                  isActive ? "bg-[#374151]" : "hover:bg-[#2563EB]"
                } gap-4`
              }
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}

          {/* Oil Shop Dropdown */}
          <div
            className="flex items-center justify-between py-2 px-2 hover:bg-[#2563EB] rounded cursor-pointer"
            onClick={() => toggleDropdown("oilShop")}
          >
            <div className="flex gap-3 items-center">
              <RiOilFill />
              <span className="text-sm">OilShop</span>
            </div>
            {dropdowns.oilShop ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
          {dropdowns.oilShop &&
            oilShopGroup.map((item, i) => (
              <NavLink
                key={i}
                to={item.url}
                onClick={sidebarIsOpenHandler}
                className="block px-6 py-1 text-sm hover:text-blue-300"
              >
                {item.name}
              </NavLink>
            ))}

          {/* Accessories Dropdown */}
          <div
            className="flex items-center justify-between py-2 px-2 hover:bg-[#2563EB] rounded cursor-pointer"
            onClick={() => toggleDropdown("accessories")}
          >
            <div className="flex gap-3 items-center">
              <FaCarCrash />
              <span className="text-sm">Accessories</span>
            </div>
            {dropdowns.accessories ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
          {dropdowns.accessories &&
            accessoriesGroup.map((item, i) => (
              <NavLink
                key={i}
                to={item.url}
                onClick={sidebarIsOpenHandler}
                className="block px-6 py-1 text-sm hover:text-blue-300"
              >
                {item.name}
              </NavLink>
            ))}

          {/* Rent Dropdown */}
          <div
            className="flex items-center justify-between py-2 px-2 hover:bg-[#2563EB] rounded cursor-pointer"
            onClick={() => toggleDropdown("rent")}
          >
            <div className="flex gap-3 items-center">
              <FcSalesPerformance />
              <span className="text-sm">Rent</span>
            </div>
            {dropdowns.rent ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
          {dropdowns.rent &&
            rentGroup.map((item, i) => (
              <NavLink
                key={i}
                to={item.url}
                onClick={sidebarIsOpenHandler}
                className="block px-6 py-1 text-sm hover:text-blue-300"
              >
                {item.name}
              </NavLink>
            ))}
        </div>

        {/* Bottom Menu */}
        <div className="mb-6 px-4">
          {bottomMenu.map((item, i) => (
            <NavLink
              key={i}
              to={item.url}
              onClick={sidebarIsOpenHandler}
              className={({ isActive }) =>
                `flex items-center py-2 px-2 rounded transition ${
                  isActive ? "bg-[#374151]" : "hover:bg-[#2563EB]"
                } gap-4`
              }
            >
              <span>{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Logout dropdown */}
      {logoutDropDown && (
        <div
          className="fixed h-[100vh] w-full top-0 left-0 z-50"
          onClick={() => setLogoutDropDown(false)}
        >
          <div
            className="bg-white border border-[#262626] w-[100px] absolute right-6 flex justify-center items-center p-1 cursor-pointer rounded mt-[60px]"
            onClick={logOutUserHandler}
          >
            <h1 className="font-[500]">LogOut</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default Menue;
