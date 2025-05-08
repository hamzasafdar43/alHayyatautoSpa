import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function CustomTable({ rows, columns, onClick , onClickDelete }) {
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
        <table className="w-full table-auto border-collapse border border-[#262626]">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="border border-[#d2626] px-4 py-2 text-left"
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
                    className={`border border-[#262626] px-4 py-2 ${
                      rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    {column === "Actions" ? (
                      <div className="flex gap-2">
                        <div
                          className="bg-[#D17C16] flex p-1 text-white rounded-[5px] w-[70px] cursor-pointer"
                          onClick={() => onClickDelete(row)}
                        >
                          <MdDelete size={20} />
                          <h1 className="text-sm">Delete</h1>
                        </div>
                        <div
                          className="bg-[#2563ea] flex gap-1 items-center justify-center p-1 text-white rounded-[5px] w-[70px] cursor-pointer"
                          onClick={() => onClick(row)}
                        >
                          <FaEdit size={20} />
                          <h1 className="text-sm">Edit</h1>
                        </div>
                      </div>
                    ) : (
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
