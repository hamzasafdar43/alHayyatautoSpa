import React from 'react';
import CustomTable from '../../../common/CustomTable';


function OilTodaySales({ dailySales }) {
  const columns = [
    "Sr_No",
    "Time", // 🔁 Changed from Date → Time
    "Id",
    "Product_Name",
    "Product_Image",
    "Quantity",
    "Price",
  ];

  // ✅ Map dailySales to table rows with TIME instead of DATE
  const rows = dailySales?.map((sale, index) => ({
    Sr_No: index + 1,
    Time: new Date(sale.createdAt).toLocaleTimeString(),
  Id: sale._id,
    Product_Name: sale.productId?.productName || "N/A",
    Product_Image: `${import.meta.env.VITE_BASE_URL}uploads/${sale.productId?.image}`,
    Quantity: sale.quantitySold,
    Price: `PKR ${sale.sellingPrice}`,
  })) || [];

  return (
    <div className='w-[90%] mx-auto'>
      <h1 className='my-4 font-semibold text-2xl'>Today Sale Record</h1>

      <CustomTable
        rows={rows}
        columns={columns}
      />
    </div>
  );
}

export default OilTodaySales;
