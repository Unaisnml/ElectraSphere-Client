import React from "react";

const Heading = ({ label }) => {
  return (
    
    <h1 className="flex items-center justify-center my-12 text-4xl font-bold font-[Poppins] md:max-w-full sm:max-w-[20rem] max-w-[30rem] ">
      {label}
    </h1>
  );
};

export default Heading;
