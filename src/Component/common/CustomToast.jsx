import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom toast function
export const showToast = (message, type = "success") => {
  toast(message, {
    type: type,
    className: `text-white font-medium px-4 py-2 rounded ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    }`,
    progressClassName: "bg-white",
  });
};

const CustomToast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
    />
  );
};

export default CustomToast;
