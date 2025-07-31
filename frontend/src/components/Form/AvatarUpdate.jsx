import React from 'react';
import { Camera } from 'lucide-react';

const AvatarUpdate = ({ avatarSrc, onImageChange }) => {
  return (
    <div className="flex justify-center"> 
      <div className="relative w-40 h-40">
        <img
          src={avatarSrc}
          alt="avatar"
          className="w-full h-full object-cover rounded-lg border-4 border-indigo-500"
        />
        <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
          <label htmlFor="image">
            <Camera className="w-6 h-6 text-indigo-500 cursor-pointer" />
          </label>
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={onImageChange}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default AvatarUpdate;
