// src/components/AvatarUpload.jsx
import React from "react";
import { Store, Upload } from "lucide-react";

const AvatarUpload = ({ avatar, onFileChange }) => (
  <div>
    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar</label>
    <div className="mt-1 flex items-center space-x-4">
      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
        {avatar ? <img src={URL.createObjectURL(avatar)} alt="avatar" className="h-full w-full object-cover rounded-full" /> : <Store className="h-12 w-12 text-gray-300" aria-hidden="true" />}
      </span>
      <label htmlFor="file-input" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
        <span className="flex items-center">
          <Upload className="h-5 w-5 mr-2" aria-hidden="true" /> Upload a file
        </span>
        <input id="file-input" type="file" onChange={onFileChange} className="sr-only" />
      </label>
    </div>
  </div>
);

export default AvatarUpload;
