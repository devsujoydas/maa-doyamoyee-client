import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-[50dvh] flex justify-center items-center">
      <div className="w-10 h-10 border-2 border-orange-500 border-dashed rounded-full animate-spin transition-all"></div>
    </div>
  );
};

export default LoadingSpinner;
