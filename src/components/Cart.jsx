import React from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";
import CountButton from "./CountButton";
import { GoTag } from "react-icons/go";
import Button from "./Button";

export const Cart = () => {
  const count = 4;
  return (
    // main container
    <section className=" flex md:flex-row flex-col gap-6 mx-auto ">
      {/* Cart items container */}
      <div className="flex flex-col justify-between md:w-[65%] w-full rounded-lg border p-4 max-h-[11rem]  ">
        {/* cart items list contaner */}
        <div className="flex  gap-6 ">
          <Link>
            <img
              src="/airpod.jpg"
              alt="product-img"
              className="rounded-lg border md:max-w-[10rem] max-h-[8rem]"
            />
          </Link>

          <div className="flex flex-col  justify-center w-full gap-2 ">
            {/* Container for product name and delete button */}
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold ">Product Name</h3>
              <button className="py-1 px-1 rounded-lg border text-red-600 text-lg">
                <RiDeleteBin2Line />
              </button>
            </div>
            <p>Size :Large</p>
            <p>Color :Red</p>
            {/* Container for Product price and Count button */}
            <div className="flex justify-between ">
              <h4 className="text-xl font-bold">Price: ₹ 99.66 </h4>
              <CountButton count={count} />
            </div>
          </div>
        </div>
      </div>

      {/* Cart total container*/}
      <div className="flex  flex-col rounded-lg border p-4 gap-4 text-base ">
        <h4 className="my-2 text-lg font-semibold">Cart total</h4>
        <div className="flex justify-between space-x-16 md:space-x-44">
          <p>Subtotal</p>
          <p>$300</p>
        </div>
        <div className="flex justify-between space-x-16 md:space-x-44">
          <p>Discount</p>
          <p>20%</p>
        </div>
        <div className="flex justify-between space-x-8">
          <p>Delivery Charge</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between space-x-8">
          <p>Total</p>
          <p>$3000</p>
        </div>
        <div className="flex justify-between space-x-4 relative">
          <input
            type="text"
            placeholder="Add your promo code "
            className="w-full border-none focus:outline-none text-sm font-semibold  rounded-full bg-gray-300 px-8 py-2"
          />
          <GoTag className="absolute text-lg font-semibold -left-1 top-2.5 " />
          <button className="rounded-full border-none bg-black text-white font-medium text-lg px-3 py-1">
            Apply
          </button>
        </div>

        <Button label=" Proceed to payment" />
      </div>
    </section>
  );
};
