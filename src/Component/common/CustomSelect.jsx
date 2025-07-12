import React from 'react';
import { useField } from 'formik';

const CustomSelect = ({ label, onChange, option = [], ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        {...field}
        {...props}
        onChange={onChange}
        className={`w-full px-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out
        ${meta.touched && meta.error ? "border-red-500" : ""}`}
      >
        <option value="">Select an option</option>
        {option.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="text-red-600 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomSelect;
