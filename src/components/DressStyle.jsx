import React from "react";
import Heading from "./Heading";

const DressStyle = () => {
  return (
    //section
    <section className="container mx-auto ">
      {/* Category container */}
      <div className="container w-full bg-slate-200 rounded-lg px-12 pb-12  flex flex-col items-center justify-center ">
        <Heading label="BROWSE BY dress STYLE" />

        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex md:flex-row flex-col gap-x-4 gap-y-4 w-full">
            <div className="md:w-[35%] overflow-hidden rounded-lg cursor-pointer relative">
              <img
                src="image 11.jpg "
                className="w-full h-[250px] object-cover scale-150"
                alt=""
              />
              <h2 class="absolute  top-5 left-5 text-2xl font-[Poppins] text-black font-bold z-30">
                Casual
              </h2>
            </div>
            <div className="flex-1  overflow-hidden rounded-lg cursor-pointer relative ">
              <img
                src="image 13.jpg"
                className="w-full h-[250px] object-cover z-10 "
                alt=""
              />
              <h2 class="absolute  top-5 left-5 text-2xl font-[Poppins] text-black font-bold z-30">
                Formal
              </h2>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-x-4 gap-y-4 w-full">
            <div className="flex-1  overflow-hidden rounded-lg cursor-pointer relative ">
              <img
                src="image 12.jpg"
                className="w-full h-[250px] object-cover z-10 "
                alt=""
              />
              <h2 class="absolute  top-5 left-5 text-2xl font-[Poppins] text-black font-bold z-30">
                Party
              </h2>
            </div>
            <div className="md:w-[35%] overflow-hidden rounded-lg cursor-pointer relative">
              <img
                src="image 14.jpg "
                className="w-[250px] h-[250px] object-cover scale-150 "
                alt=""
              />
              <h2 class="absolute  top-5 left-5 text-2xl font-[Poppins] text-black font-bold z-30">
                Gym
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressStyle;
