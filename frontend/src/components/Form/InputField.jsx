// src/components/InputField.jsx
import React from "react";

const InputField = ({ id, label, type = "text", value, onChange, error, icon, autoComplete }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete} 
        className={`block w-full pl-10 pr-3 py-2 border ${error ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        placeholder={`Your ${label}`}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  </div>
);

export default InputField;
