import React from 'react';

const CustomButton = ({ type = 'button', onClick,title , className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      
      className={`bg-[#262626] w-[100%] h-10 cursor-pointer rounded-[10px] text-white font-[500] text-[20px] ${className}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
