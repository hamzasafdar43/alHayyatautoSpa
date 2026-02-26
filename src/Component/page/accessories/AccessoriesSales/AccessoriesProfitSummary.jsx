import React from 'react';


function AccessoriesProfitSummary({monthlyProfit , todayProfit}) {
  

  const saleProfits = [
    { title: "Today Profit", para: `PKR ${todayProfit}` },
    { title: "Monthlty Profit", para: `PKR ${monthlyProfit}` },
    // { title: "Monthly Profit", para: `PKR ${monthlyTotalSale}` },
  ];

  return (
    <div className="w-[90%]">
      <div className="md:flex gap-8 my-8">
        {saleProfits.map((sale, index) => (
          <div
            key={index}
            className="md:w-[40%] w-[90%] h-[120px] my-2 mx-auto rounded-[10px] p-4 bg-gray-100"
          >
            <div className="font-[500]">{sale?.title}</div>
            <div>{sale?.para}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccessoriesProfitSummary;
