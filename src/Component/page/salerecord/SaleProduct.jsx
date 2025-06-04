import React, { useEffect, useRef, useState } from "react";
import { FcSalesPerformance } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { GiProfit } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { BsCashCoin } from "react-icons/bs";
import Commission from "../carWash/Commission";
import Generatebill from "./Generatebill";
import { useGetAllSalesQuery } from "../../../features/Api";
import MonthlySale from "./MonthlySale";
import TodaySale from "./TodaySale";
import WeeklySale from "./WeeklySale";
import Saleprofits from "./Saleprofits";

function SaleProduct() {
  const [record, setRecord] = useState("all-carWash-bill");
  const [monthlyTotalSale, setMonthlyTotalSale] = useState(0);
  const [weeklyTotalSale, setWeeklyTotalSale] = useState(0);
  const [todayTotalSale, setTodayTotalSale] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { data: allSales = {}, isSuccess } = useGetAllSalesQuery();


  useEffect(() => {

    if (isSuccess && allSales?.allSale) {
      const getCurrentMonthSale = (allSales.allSale || []).filter((item) => {
        const createdDate = new Date(item.createdAt);
        const now = new Date();
        return (
          createdDate.getMonth() === now.getMonth() &&
          createdDate.getFullYear() === now.getFullYear()
        );
      });
  
      const totalMonthlySale = getCurrentMonthSale.reduce((total, sale) => {
        return total + parseFloat(sale.sellingPrice || 0);
      }, 0);
  
      setMonthlyTotalSale(totalMonthlySale);


      const today = new Date().toISOString().split("T")[0];


      const filterTodaySale = allSales?.allSale.filter((record) => {
        if (!record.createdAt) return false; 
      
        const billDate = new Date(record.createdAt);
        if (isNaN(billDate)) return false; 
      
        const isToday = billDate.toISOString().split("T")[0] === today;
        
        return isToday 
      });
      const totalTodaySale = filterTodaySale.reduce((total, sale) => {
        return total + parseFloat(sale.sellingPrice || 0);
      }, 0);

      setTodayTotalSale(totalTodaySale)
      

      const todaySale = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(todaySale.getDate() - 6);
  
      const filterWeeklySale = allSales?.allSale.filter((record) => {
        if (!record.createdAt) return false;
  
        const billDate = new Date(record.createdAt);
        if (isNaN(billDate)) return false;
  
        return billDate >= sevenDaysAgo && billDate <= todaySale;
      });
  
      

      console.log("filterWeeklySale" , filterWeeklySale)

      const weeklyTotalSale = filterWeeklySale.reduce((total, sale) => {
        return total + parseFloat(sale.sellingPrice || 0);
      }, 0);

      setWeeklyTotalSale(weeklyTotalSale)
    }
  }, [allSales]);
  

  const saleDetails = [
    {
      icons: <FcSalesPerformance size={50} />,
      heading: "Monthly Sale",
      para: `PKR  ${monthlyTotalSale}`,
    },
    {
      icons: <BsCashCoin size={50} />,
      heading: "Today Sale",
      para: `PKR ${todayTotalSale}`,
    },
    {
      icons: <HiUsers size={50} />,
      heading: "Weekly Sale",
      para: `PKR 00, ${weeklyTotalSale}`,
    },
    {
      icons: <GiProfit size={50} />,
      heading: "Profits",
      para: `PKR `,
    },
  ];

  const newbillgenerateHandler = () => {
    setIsOpen(true);
  };

  const generateBillCloseHandler = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="h-[80px] w-full bg-white mt-[70px] mb-8 flex items-center justify-between px-8">
        <div className="flex gap-8">
          <h1 className="text-lg font-[500] ">Sale Product</h1>
          <h1
            className="text-lg font-[500] cursor-pointer "
            onClick={newbillgenerateHandler}
          >
            + Generate Bill
          </h1>
        </div>
        <div className="border-[1px] border-[#262626] p-1 sm:block hidden w-[300px] font-[500] rounded-[8px]">
          <form action="">
            <input
              type="text"
              placeholder="Search"
              className="ml-2 outline-none"
            />
          </form>
        </div>
      </div>
      <div className="w-[90%] mx-auto">
        <div className="flex lg:justify-between flex-wrap  justify-center ">
          {saleDetails.map((sale, index) => (
            <div
              className="bg-white lg:w-[250px]   md:w-[320px] w-[90%] md:mt-2 mt-5 md:mx-8 lg:mx-0  h-[100px] cursor-pointer rounded-[10px] flex items-center justify-center gap-8"
              onClick={() => {
                if (index === 0) setRecord("all-carWash-bill");
                else if (index === 1) setRecord("today-total-bill");
                else if (index === 2) setRecord("total-user");
                else if (index === 3) setRecord("total-commmission");
              }}
            >
              <div>{sale.icons}</div>
              <div>
                <div>{sale.heading}</div>
                <div className="font-[600] text-2xl ">{sale.para}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-[10px] mt-8 pt-4 mb-20 flex items-center justify-center h-auto  w-[90%] mx-auto ">
        {record === "all-carWash-bill" ? (
          <MonthlySale />
        ) : record === "today-total-bill" ? (
          <TodaySale />
        ) : record === "total-user" ? (
          <WeeklySale />
        ) : (
          <Saleprofits />
        )}
      </div>
      {isOpen && (
        <div className="fixed h-[100vh] w-full top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center z-50 justify-center ">
          <div className="lg:w-[40%] sm:w-[60%] w-[90%] px-4  h-auto border-2 rounded-[10px] border-[#262626]  bg-white  py-8">
            <div className="m-2 flex justify-end ">
              <IoCloseSharp size={20} onClick={generateBillCloseHandler} />
            </div>
            <div>
              <Generatebill setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SaleProduct;
