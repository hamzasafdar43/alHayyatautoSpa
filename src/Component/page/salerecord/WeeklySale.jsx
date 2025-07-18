import React, { useEffect, useState } from 'react';
import { useGetAllSalesQuery } from '../../../features/Api';
import CustomTable from '../../common/CustomTable';



function WeeklySale() {
  const [groupedSales, setGroupedSales] = useState([]);
  const { data: allSales = {}, isSuccess } = useGetAllSalesQuery();

  useEffect(() => {
    if (isSuccess && allSales?.allSale) {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 6);
  
      const filterWeeklySale = allSales?.allSale.filter((record) => {
        if (!record.createdAt) return false;
  
        const billDate = new Date(record.createdAt);
        if (isNaN(billDate)) return false;
  
        return billDate >= sevenDaysAgo && billDate <= today;
      });
  
      const grouped = {};
  
      filterWeeklySale.forEach((sale) => {
        const date = sale.createdAt.split("T")[0];
        const productId = sale.productId?._id;
        const key = `${date}_${productId}`;
  
        if (!grouped[key]) {
          grouped[key] = {
            Sr_No: 0,
            Date: date,
            Id: sale._id,
            Product_Name: sale.productId?.productName,
            Product_Image: `https://alhayyat-backend.onrender.com/uploads/${sale.productId?.image}`,
            Quantity: sale.quantitySold,
            Price: sale.sellingPrice,
          };
        } else {
          grouped[key].Quantity += sale.quantitySold;
          grouped[key].Price += sale.sellingPrice;
        }
      });
  
      const rows = Object.values(grouped).map((item, index) => ({
        ...item,
        Sr_No: index + 1,
      }));
  
      setGroupedSales(rows);
    }
  }, [allSales, isSuccess]);
  

  const columns = ["Sr_No", "Date", "Id", "Product_Name", "Product_Image", "Quantity", "Price", "Actions"];

  return (
    <div className='w-[90%]'>
      <div>
        <h1 className='my-4 font-[500] text-[24px]'>Weekly Sale Record ...</h1>
      </div>
      <div>
        <CustomTable rows={groupedSales} columns={columns} />
      </div>
    </div>
  );
}


export default WeeklySale