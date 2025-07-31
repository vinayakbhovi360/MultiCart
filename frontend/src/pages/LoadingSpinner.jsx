import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="animate-spin h-16 w-16 border-8 border-solid border-gray-300 border-t-transparent rounded-full"></div>
    </div>
  );
};

export default LoadingSpinner;
