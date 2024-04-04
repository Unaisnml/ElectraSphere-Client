import React from "react";

const Table = () => {
  return (
    <section className="max-w-full">
      {/* Cart items container */}
      <div className="flex flex-col justify-between  border px-4 py-3">
        <div className="flex justify-between items-center space-x-3">
          <h4 className="text-sm font-semibold ">Product</h4>
          <h4 className="text-sm font-semibold">price</h4>
          <h4 className="text-sm font-semibold">Quatity</h4>
          <h4 className="text-sm font-semibold">Subtotal</h4>
        </div>
        <hr />
        <div className="flex justify-between items-center space-x-3 mt-8 shadow-md py-3 px-2">
          <div className="max-w-16 flex items-center justify-center">
            <img src="" alt="image" />
            <h4 className="text-base ">name</h4>
          </div>
          <h4 className="text-base ">$250</h4>
          <div className="flex space-x-1">
            <button className="rounded-full border  px-2.5 text-sm font-semibold hover:bg-red-600 hover:border-red-600 hover:text-white">
              -
            </button>
            <div className=" text-base px-2 py-0.5 border  ">5</div>
            <button className="rounded-full border  px-2 text-sm font-semibold hover:bg-red-600 hover:border-red-600 hover:text-white">
              +
            </button>
          </div>
          <h4 className="text-base ">$650</h4>
        </div>
      </div>

      {/* Update cart button */}
      <div className="flex justify-between mt-4">
        <button className="border md:py-2 py-1 md:px-4 px-2 text-sm">
          Return to Shop
        </button>
        <button className="border md:py-2 py-1 md:px-4 px-2 text-sm">
          Update Cart
        </button>
      </div>
      {/* Bottom container */}
      <div className="mt-5 flex justify-between ">
        {/* Apply coupon */}
        <div className="flex md:justify-between md:space-x-3 space-x-2 max-h-10">
          <input
            type="text"
            className="px-2 md:py-1 w-20 md:w-1/2 focus:border-none"
          />
          <button className="border md:py-2 py-1 md:px-4 px-1 text-sm ">
            Apply Coupon
          </button>
        </div>

        {/* Cart total */}
        <div className="flex  flex-col  justify-start border ">
          <h4 className="my-2 test-sm font-semibold">Cart total</h4>
          <div className="flex justify-between space-x-16 md:space-x-44">
            <p className="text-base ">Subtotal</p>
            <p className="text-base">$300</p>
          </div>
          <hr className="w-full border-gray-400 my-2" />
          <div className="flex justify-between space-x-8">
            <p className="text-base ">Shipping</p>
            <p className="text-base">Free</p>
          </div>
          <hr className="w-full border-gray-400 my-2" />
          <div className="flex justify-between space-x-8">
            <p className="text-base ">Total</p>
            <p className="text-base">$3000</p>
          </div>
          <hr className="w-full border-gray-400 my-2" />
          <div></div>
          <button className="justfy-center border md:py-2 py-1 md:px-4 px-2 text-sm bg-red-600 border-red-600 mt-4">
            Proceed to payment
          </button>
        </div>
      </div>
    </section>
  );
};

export default Table;
