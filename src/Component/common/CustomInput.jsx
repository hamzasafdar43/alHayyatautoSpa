import React from 'react';
import { useField } from 'formik';

const CustomInput = ({ label,  ...props  }) => {
  const [field, meta] = useField(props);
  const isFileInput = props.type === "file"

  return (
    <div className="mb-2">
      <label className="block mb-1 font-medium text-[#262626] ">{label}</label>
      <input
        {...field}
        {...props}
        value={isFileInput ? undefined : field.value}
        onChange={(e) => {
          field.onChange(e); 
          if (props.onChange) props.onChange(e); // trigger custom logic
        }}
        className="w-full p-2 border border-[#262626] rounded-[8px] "
      />
      {meta.touched && meta.error ? (
        <div className="text-red-700  mt-1 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomInput;
