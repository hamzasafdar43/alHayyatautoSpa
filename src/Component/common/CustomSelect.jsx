import React from 'react';
import { useField } from 'formik';

const CustomSelect = ({ label, option = [], ...props }) => {
  const [field, meta] = useField(props);


  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-[#262626]">{label}</label>
      <select
        {...field}
        {...props}
        className="w-full p-2 border border-[#2626262] rounded-[8px]"
      >
        <option value="">Select an option</option>
        {option.map((option) => (
          <option  value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="text-red-700 mt-2 text-sm">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomSelect;
