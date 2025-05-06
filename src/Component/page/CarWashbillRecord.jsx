import React, { useEffect, useState } from 'react'
import CustomTable from '../common/CustomTable'

function CarWashbillRecord() {
const [allBills , setAllBills] = useState([])


useEffect(()=>{
    const getAllBillHandler = async() => {
        try {
            const response = await fetch("http://localhost:5000/carWash-bills" , {
                method:"GET",
                headers:{
                    "Content-Type": "application/json"

                }

            })

            const data = await response.json()
            console.log("bill data" , data)
            if(data){
                setAllBills(data)
            }
        } catch (error) {
            console.log("Error" , error)
        }
    }
    getAllBillHandler()
},[])


const rows = allBills.map((bills, index) => ({
    Sr_No: index + 1,
    Date: new Date(bills.createdAt).toLocaleDateString("en-GB", { timeZone: "Asia/Karachi" }),
    CarName: bills.carName,
    CarWasher: bills.carWasher,
    Price: bills.bill,
    Commission: bills?.commission,
   
  }));
  
    
      const columns = ["Sr_No", "Date" , "CarName", "CarWasher" , "Price" , "Commission"  , "Action"];
  return (
   
        
    <div className='w-[90%]'>
    <div>
            <h1 className='my-4 font-[500] text-lg'>Car Wash Bill Record...</h1>
        </div>
           <CustomTable rows={rows} columns={columns} />
    </div>
    
  )
}

export default CarWashbillRecord