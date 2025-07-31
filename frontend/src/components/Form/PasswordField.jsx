import React from "react";
import { Eye, EyeOff } from 'lucide-react';

const PasswordField = ({
  id,
  value,
  onChange,
  error,
  visible,
  setVisible,
  autoComplete
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {id}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        id={id}
        type={visible ? "text" : "password"}
        name={id}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`block w-full pl-10 pr-3 py-2 border ${error ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        placeholder={`your ${id}`}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-3 flex items-center"
        onClick={() => setVisible(!visible)}
      >
        {visible ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
      </button>
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

export default PasswordField;
