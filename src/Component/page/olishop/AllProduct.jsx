import { useEffect, useState } from "react";
import { useGetAllProductQuery } from "../../../features/Api";
import CustomTable from "../../common/CustomTable";

function AllProduct({onClick}) {
  const [products, setProducts] = useState([]);
  const { data: allProduct = {}, isLoading, isError } = useGetAllProductQuery();

  useEffect(() => {
    if (allProduct?.data) {
      setProducts(allProduct.data);
    }
  }, [allProduct]);

  const columns = ["Sr_No", "Id", "Product_Image", "Product_Name", "Product_Quantity", "Price", "Cost", "Actions"];

  const rows = products.map((product, index) => ({
    Sr_No: index + 1,
    Id: product?._id,
    Product_Image: `http://localhost:5000/uploads/${product?.image}`,
    Product_Name: product?.productName,
    Product_Quantity: product?.quantity,
    Price: product?.price,
    Cost: product?.cost,
  }));

  return (
    <div className="w-[90%] ">
        <div>
            <h1 className="text-lg font-[500] my-4 ">
                All Product ......
            </h1>
        </div>
        <div>
        <CustomTable rows={rows} columns={columns} onClick={onClick} />
        </div>
      
    </div>
  );
}

export default AllProduct;
