import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function CustomPopup({
  show = false,
  heading = "Confirm Action",
  title = "Are you sure you want to continue?",
  cancelText = "Cancel",
  confirmText = "Confirm",
  onCancel,
  onConfirm,
}) {
  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 text-center"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {heading}
            </h2>
            <p className="text-gray-600 mb-6">{title}</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={onCancel}
                className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CustomPopup;
