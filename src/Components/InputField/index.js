import React from "react";

const InputField = ({
  type,
  placeholder,
  name,
  onChange,
  id,
  className,
  value,
  required,
  disabled,
  min,
}) => {
  return (
    <input
      type={type}
      placeholder={`${placeholder}${required ? "*" : ""}`}
      name={name}
      onChange={onChange}
      id={id}
      className={className}
      value={value}
      required={required}
      disabled={disabled}
      min={min}
    />
  );
};

export default InputField;
