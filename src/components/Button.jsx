import React from "react";

const Button = ({ label, icon }) => {
  return (
    <button className="flex items-center justify-center text-center bg-red-600 md:py-3  md:px-2 px-1 text-white md:font-semibold md:text-xl tex-sm rounded-md md:min-w-[120px]">
      {label}
    </button>
  );
};

export default Button;
