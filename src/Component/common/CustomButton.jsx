import React from 'react';

const CustomButton = ({ type = 'button', onClick,title }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      
      className="bg-[#daa520] w-[100%] h-10 rounded-[10px] text-white font-[500] text-[20px]"
    >
      {title}
    </button>
  );
};

export default CustomButton;
