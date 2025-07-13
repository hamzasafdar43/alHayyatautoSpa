import React from 'react';

const CustomButton = ({ type = 'button', onClick, title, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-10 bg-[#1F2937] text-white text-sm font-semibold rounded-md 
        hover:bg-[#1f1f1f] active:scale-[0.98] transition-all duration-150 ease-in-out 
        shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#444] ${className}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
