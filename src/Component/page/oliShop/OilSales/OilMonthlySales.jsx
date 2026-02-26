import React, { useState } from "react";
import { useDeleteAccessoriesSaleMutation, useDeleteOilSaleMutation, useGetAllSaleAccessoriesQuery, useGetFilteredOilSalesQuery } from "../../../../features/Api";

import CustomModal from "../../../common/CustomModal";
import CustomPopup from "../../../common/CustomPopup";
import CustomTable from "../../../common/CustomTable";
import { showToast } from "../../../common/CustomToast";

function OilMonthlySales() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectRecordIndex, setSelectRecordIndex] = useState(null);
  const [deleteAccessoriesSale, { isLoading: isDeleting }] = useDeleteOilSaleMutation();
  const { data: monthlySalesData = [] , refetch  : refetchDelete  } = useGetFilteredOilSalesQuery("month");



  // 🟢 Prepare rows for the table
  const rows = monthlySalesData.map((sale, index) => ({
    Sr_No: index + 1,
    Date: new Date(sale.createdAt).toLocaleDateString("en-GB", {
      timeZone: "Asia/Karachi",
    }),
    Id: sale._id,
    Product_Name: sale.productId?.productName || "N/A",
    Product_Image: `${import.meta.env.VITE_BASE_URL}uploads/${sale.productId?.image}`,
    Quantity: sale.quantitySold,
    Price: `${sale.sellingPrice}`,

  }));

  const columns = [
    "Sr_No",
    "Date",
    "Id",
    "Product_Name",
    "Product_Image",
    "Quantity",
    "Price",
    "Actions",
  ];

  const deleteAccessoriesShopRecordHandler = (record) => {
    setSelectRecordIndex(record);
    setShowDeletePopup(true);
  };

  const updateAccessoriesShopRecordHandler = (record) => {
    try {
      setSelectRecordIndex(record)
      setIsOpen(true)
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      if (!selectRecordIndex?.Id) return showToast("Invalid record ID", "error");

      const response = await deleteAccessoriesSale(selectRecordIndex.Id).unwrap();

      showToast(response?.message || "Record deleted successfully", "success");
      setShowDeletePopup(false);

      await refetchDelete()

    } catch (error) {
      const errorMessage = error?.data?.message || "Failed to delete record!";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="w-[90%]">
      <div>
        <h1 className="my-4 font-medium text-[24px]">Monthly Sale Record</h1>
      </div>
      <div>
        <CustomTable rows={rows} columns={columns} onClickDelete={deleteAccessoriesShopRecordHandler} onClick={updateAccessoriesShopRecordHandler} />
      </div>
      <div>
        {isOpen &&
          <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <SaleItemsAccessoriesShop selectedUpdateRecord={selectRecordIndex} setIsOpen={setIsOpen} />
          </CustomModal>

        }
      </div>
      {showDeletePopup && (
        <CustomPopup
          show={showDeletePopup}
          heading="Delete Record?"
          title={
            isDeleting
              ? "Deleting record, please wait..."
              : "Are you sure you want to delete this record?"
          }
          cancelText="Cancel"
          confirmText={isDeleting ? "Deleting..." : "Delete"}
          onCancel={() => setShowDeletePopup(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default OilMonthlySales;
