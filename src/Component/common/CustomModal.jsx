// 📂 src/components/common/CustomModal.jsx
import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // 🔒 Modal not visible when false

  return (
    <div className="fixed h-[100vh] w-full top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
      <div className="lg:w-[40%] sm:w-[60%] w-[90%] px-11 h-auto border-2 rounded-[10px] border-[#262626] bg-white py-8 relative shadow-lg animate-fadeIn">
        <div className="absolute top-3 right-3 cursor-pointer">
          <IoCloseSharp size={24} onClick={onClose} />
        </div>

        {/* 🔥 Dynamic Component / Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
