import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const SelectField = ({ id, label, category, setCategory, categoriesData, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    setCategory(value);
    setIsOpen(false);
  };

  return (
    <div className="mb-4" onClick={(e) => e.stopPropagation()}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
         {/* <span className="text-red-500">*</span> */}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className={`relative w-full bg-white border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          aria-haspopup="listbox"
          aria-expanded={isOpen ? "true" : "false"}
          aria-labelledby="listbox-label"
        >
          <span className="pl-8 block truncate">{category || "Choose a category"}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            role="listbox"
          >
            {categoriesData &&
              categoriesData.map((item) => (
                <li
                  key={item.title}
                  className="text-gray-900 cursor-pointer select-none relative py-2 pl-10 pr-9 hover:bg-indigo-600 hover:text-white"
                  role="option"
                  onClick={() => handleSelect(item.title)}
                >
                  <span className="font-normal block truncate">{item.title}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SelectField;
