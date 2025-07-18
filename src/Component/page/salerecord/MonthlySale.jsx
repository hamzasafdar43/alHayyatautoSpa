import React, { useEffect, useState } from 'react';
import { useGetAllSalesQuery } from '../../../features/Api';
import CustomTable from '../../common/CustomTable';

function MonthlySale() {
  const [groupedSales, setGroupedSales] = useState([]);
  const { data: allSales = {}, isSuccess } = useGetAllSalesQuery();

  console.log("sales oilShop" , allSales)

  useEffect(() => {
    if (isSuccess && allSales?.allSale) {

      const getCurrentMonthSale = allSales.allSale.filter((item) => {
        const createdDate = new Date(item.createdAt);
        const now = new Date();
        return (
          createdDate.getMonth() === now.getMonth() &&
          createdDate.getFullYear() === now.getFullYear()
        );
      });

      const grouped = {};

      getCurrentMonthSale.forEach((sale) => {
        const date = sale.createdAt.split("T")[0];
        const productId = sale.productId?._id;
        const key = `${date}_${productId}`;

        if (!grouped[key]) {
          grouped[key] = {
            Sr_No: 0, // will be added later
            Date: date,
            Id: sale._id,
            Product_Name: sale.productId?.productName,
            Product_Image: `https://alhayyat-backend.onrender.com/uploads/${sale.productId?.image}`,
            Quantity: sale.quantitySold,
            Price: sale.sellingPrice,
          };
        } else {
          grouped[key].Quantity += sale.quantitySold;
          grouped[key].Price += sale.sellingPrice; // optional: total price
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
        <h1 className='my-4 font-[500] text-[24px]'>Monthly Sale Record ...</h1>
      </div>
      <div>
        <CustomTable rows={groupedSales} columns={columns} />
      </div>
    </div>
  );
}

export default MonthlySale;
