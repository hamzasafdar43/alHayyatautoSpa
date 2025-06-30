import React, { useEffect, useRef, useState } from "react";
import { FcSalesPerformance } from "react-icons/fc";
import { GiProfit } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { BsCashCoin } from "react-icons/bs";
import { useGetAllSalesQuery } from "../../../features/Api";
import MonthlySale from "./MonthlySale";
import TodaySale from "./TodaySale";
import WeeklySale from "./WeeklySale";
import Saleprofits from "./Saleprofits";

function SaleProductOilShop() {
  const [record, setRecord] = useState("all-carWash-bill");
  const [monthlyTotalSale, setMonthlyTotalSale] = useState(0);
  const [weeklyTotalSale, setWeeklyTotalSale] = useState(0);
  const [todayTotalSale, setTodayTotalSale] = useState(0);

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



  return (
    <div>
      <div className="h-[80px] w-full bg-white mt-[70px] mb-8 flex items-center justify-between px-8">
        <div className="flex gap-8">
          <h1 className="text-lg font-[500] ">Sale Product</h1>
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
                if (index === 0) setRecord("monthly_sale");
                else if (index === 1) setRecord("today_sale");
                else if (index === 2) setRecord("weekly_sale");
                else if (index === 3) setRecord("profits");
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
        {record === "monthly_sale" ? (
          <MonthlySale />
        ) : record === "today_sale" ? (
          <TodaySale />
        ) : record === "weekly_sale" ? (
          <WeeklySale />
        ) : (
          <Saleprofits />
        )}
      </div>
    </div>
  );
}

export default SaleProductOilShop;
