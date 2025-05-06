import React, { useState } from "react";
import { FcSalesPerformance } from "react-icons/fc";
import CarWashbillRecord from "./page/CarWashbillRecord";
import Commission from "./page/Commission";
import AllUsers from "./page/AllUsers";

function Home() {
  const [record, setRecord] = useState("");
  const saleDetails = [
    {
      icons: <FcSalesPerformance size={50} />,
      heading: "All Bills",
      para: "$2,456",
    },
    {
      icons: <FcSalesPerformance size={50} />,
      heading: "Today Bill",
      para: "$2458",
    },
    {
      icons: <FcSalesPerformance size={50} />,
      heading: "Total Vistor",
      para: "$9876",
    },
    {
      icons: <FcSalesPerformance size={50} />,
      heading: "Commissions",
      para: "$098789",
    },
  ];
  return (
    <div>
      <div className="h-[80px] w-full bg-white mt-[70px] flex items-center justify-between px-8">
        <div className="flex gap-8">
          <h1 className="text-lg font-[500] ">Generate Bill</h1>
          <h1 className="text-lg font-[500] cursor-pointer ">+ Add new Bill</h1>
        </div>
        <div className="border-[1px] border-[#262626] p-1 w-[300px] font-[500] rounded-[8px]">
          <form action="">
            <input
              type="text"
              placeholder="Search"
              className="ml-2 outline-none"
            />
          </form>
        </div>
      </div>
      <div className=" flex  justify-center gap-11">
        {saleDetails.map((sale, index) => (
          <div
            className="bg-white w-[250px] my-8 h-[100px] cursor-pointer rounded-[10px] flex items-center justify-center gap-8"
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
      <div className="bg-white rounded-[10px] flex items-center justify-center h-[400px]  w-[90%] mx-auto ">
        {record === "all-carWash-bill" ? (
          <CarWashbillRecord />
        ) : record === "today-total-bill" ? (
          <Commission />
        ) : record === "total-user" ? (
          <AllUsers />
        ) : (
          <Commission />
        )}
      </div>
    </div>
  );
}

export default Home;
