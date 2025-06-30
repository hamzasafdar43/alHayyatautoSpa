import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

function CustomTable({ rows, columns, onClick, onClickDelete }) {
  const rowsPerPage = 5; // Define how many rows per page you want
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the rows to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  // Next page handler
  const nextHandler = () => {
    if (currentPage < Math.ceil(rows.length / rowsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Previous page handler
  const prevHandler = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="w-full">
      {/* Wrapping table with scrollable container for smaller screens */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className=" border-b-[1px]  bg-gray-100 border-b-gray-300 px-4 py-5 text-gray-600  text-sm text-center"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={` px-4 text-center border-b-[1px] border-b-gray-300 py-2 text-gray-600 text-sm font-[500] ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-white"
                    }`}
                  >
                    {column === "Actions" ? (
                      <div className="flex items-center h-20 gap-2 mx-auto justify-center w-[50px]">
                        <div
                          className=" flex text-red-600 text-sm rounded-[5px]  cursor-pointer"
                          onClick={() => onClickDelete(row)}
                        >
                          <AiFillDelete size={20} />
                          
                        </div>
                        <div
                          className="text-[#2563ea]  flex gap-1 items-center justify-center p-1 rounded-[5px]  cursor-pointer"
                          onClick={() => onClick(row)}
                        >
                          <FaEdit size={20} />
                          
                        </div>
                      </div>
                    ) : column === "Product_Image" ? (
                      <div className="w-[50px] h-[50px]  mx-auto ">
                        <img
                          src={row?.Product_Image}
                          alt="product"
                          className="w-full h-full  object-cover rounded"
                          onError={(e) => (e.target.src = "/fallback.jpg")}
                        />
                      </div>
                    ) : column === "Product_Quantity"  ? (
                      row.Product_Quantity < 2 ? (
                        
                            <div className="text-red-600  text-sm">
                            Stock running low –  ({row[column]})  available Item
                            </div>
                      
                      ) : (
                        row[column]
                      )
                    ): column === "Id" ? (
                      `00${row[column]?.toString().slice(0, 8)}`
                    ):(
                      row[column]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination buttons */}
      <div className="flex gap-5 my-8 justify-center md:justify-start">
        <button
          className="border-[2px] px-5 py-1 rounded-[8px] cursor-pointer hover:bg-[#262626] hover:text-white font-[500] border-[#262626]"
          onClick={prevHandler}
        >
          Prev
        </button>
        <button
          className="border-[2px] px-5 py-1 rounded-[8px] cursor-pointer hover:bg-[#262626] hover:text-white font-[500] border-[#262626]"
          onClick={nextHandler}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomTable;
