import React, { useEffect, useState } from 'react'
import CustomTable from '../common/CustomTable'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../features/createSlice';
import { current } from '@reduxjs/toolkit';

function Commission() {
  const [allBills , setAllBills] = useState([])
  const [selectedcarWasher , setSelectedcarWasher] = useState("")

  useEffect(() => {
    console.log('selected car washer:', selectedcarWasher);
  }, [selectedcarWasher]);


  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
              
              if(data){
                  setAllBills(data)
              }
          } catch (error) {
              console.log("Error" , error)
          }
      }
      getAllBillHandler()
  },[])
  

  const columns = ["Sr_No","Date" , "Name" , "Commission"]
 

  const today = new Date().toISOString().split("T")[0];

  const filteredBills = allBills.filter((record) => {
    if (!record.createdAt) return false; // skip if createdAt is missing
  
    const billDate = new Date(record.createdAt);
    if (isNaN(billDate)) return false; // skip if date is invalid
  
    const isToday = billDate.toISOString().split("T")[0] === today;
    const isWasherMatch = selectedcarWasher ? record.carWasher === selectedcarWasher : true;

   
    return isToday && isWasherMatch;
  });

  const totalCommission = filteredBills.reduce((total, record) => {
    return total + parseFloat(record.commission || 0);
  }, 0);
  
  const rows = filteredBills.map((record, index) => ({
    Sr_No: index + 1,
    Date: new Date(record.createdAt).toLocaleDateString(),
    Name: record.carWasher,
    Commission: record.commission,
  }));
  
  return (
    <div className='w-[90%]'>
      <form onSubmit={(e)=>{
e.preventDefault()
      }}>
        <select  className='border-[1px] border-[#262626] rounded-[10px] w-[50%] p-2 my-8' onChange={(e) => setSelectedcarWasher(e.target.value)} name='carWasher'>
          {
            users.map((user , index)=>(
              <option value={user.name}>{user.name}</option>
            ))
          }
        </select>
      </form>
      <div>
      <CustomTable rows={rows} columns={columns} />
      </div>
      {selectedcarWasher && (
  <div className="text-lg font-semibold my-4">
    Total Commission for {selectedcarWasher}: PKR{totalCommission}
  </div>
)}

    </div>
  )
}

export default Commission