import React from 'react';
import { useField } from 'formik';

const CustomInput = ({ label, className = "", ...props }) => {
  const [field, meta] = useField(props);
  const isFileInput = props.type === "file";

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}

      <input
        {...field}
        {...props}
        value={isFileInput ? undefined : field.value}
        onChange={(e) => {
          field.onChange(e);
          if (props.onChange) props.onChange(e);
        }}
        className={`w-full px-4 py-2 text-sm rounded-md border border-gray-300 outline-none transition duration-150 ease-in-out
        ${className} 
        ${meta.touched && meta.error ? "border-red-500" : ""} 
        ${props.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />

      {meta.touched && meta.error && (
        <div className="text-red-600 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomInput;

