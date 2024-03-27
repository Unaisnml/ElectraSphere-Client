import React, { useState, useEffect } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prevCurrent) => {
      const nextIndex = (prevCurrent + 1) % slides.length;
      return nextIndex;
    });
  };

  const previousSlide = () => {
    setCurrent((prevCurrent) => {
      const prevIndex = (prevCurrent - 1 + slides.length) % slides.length;
      return prevIndex;
    });
  };

  //   useEffect(() => {

  //   }, [current]);

  return (
    <div className="container mt-20 overflow-hidden relative md:h-[450px]">
      <div
        className="flex transition ease-out duration-300"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((item) => (
          <img key={item.id} src={item.image} alt={item.alt || ""} />
        ))}
      </div>
      <div className="absolute top-0 w-full h-full flex justify-between items-center text-white px-4 md:px-10 text-2xl md:text-3xl   ">
        <div className="flex flex-col justify-between space-y-4 mx-auto md:mx-1 md:space-y-8 items-center md:items-start">
          <p className="text-base">iPhone 14 Series</p>
          <h3 className="text-2xl md:text-3xl md:max-w-40 md:max-h-16">Up to 10% off Voucher</h3>
        <button className="outline-none text-white text-sm md:text-lg ">
          Shop now
        </button>
      </div>
      </div>
      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((slide, i) => (
          <div
            key={"circle" + i}
            className={`rounded-full w-2 h-2 md:h-3 md:w-3 bg-white cursor-pointer
                ${i === current ? "bg-gray-300" : "bg-white"}`}
            onClick={() => {
              setCurrent(i);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
