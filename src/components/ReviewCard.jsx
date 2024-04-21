import React from "react";
import Heading from "./Heading";
import Rating from "./Rating";

const ReviewCard = () => {
  return (
    <section className="container mx-auto items-center justify-center ">
      <div className="flex md:items-start   md:justify-start justify-center md:mx-auto mx-20">
        <Heading label="OUR HAPPY CUSTOMERS" />
      </div>
      <div className="flex gap-4">
        {/* Card 1 */}
        <div className="flex flex-col p-5  border border-gray-300 bg-white rounded-lg ">
          <Rating />
          <h3 className="font-semibold text-lg my-2 font-[Poppins]">
            Username
          </h3>
          <p className="text-sm font-[Poppins] max-w-64">
            "I'm blown away by the quality and style of the clothes I received
            from Shop.co. From casual wear to elegant dresses, every piece I've
            bought has exceeded my expectations.”
          </p>
        </div>
        {/* Card 2 */}
        <div className="flex flex-col p-5 border border-gray-300 bg-white rounded-lg ">
          <Rating />
          <h3 className="font-semibold text-lg my-2 font-[Poppins]">
            Username
          </h3>
          <p className="text-sm font-[Poppins] max-w-64">
            "I'm blown away by the quality and style of the clothes I received
            from Shop.co. From casual wear to elegant dresses, every piece I've
            bought has exceeded my expectations.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewCard;
