import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiDeleteBin2Line } from "react-icons/ri";
import { GoTag } from "react-icons/go";
import CountButton from "./CountButton";
import Button from "./Button";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  decrementItemCount,
  incrementItemCount,
  removeCartItem,
} from "../slices/cartSlice";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const Cart = ({ cartItems, shippingPrice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const removeCartItemHandler = async (id) => {
    const confirmation = await Swal.fire({
      width: "400px",
      padding: "15px",
      title: "Are you sure!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      dispatch(removeCartItem(id));
      Swal.fire("Deleted!", "Your item has been deleted.", "success");
    }
  };

  const handleIncrement = async (itemId) => {
    dispatch(incrementItemCount({ itemId }));
  };

  const handleDecrement = async (itemId) => {
    dispatch(decrementItemCount({ itemId }));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    // main container
    <section className=" flex md:flex-row flex-col gap-6 mx-auto my-10 ">
      {/* Cart items container */}

      <div className="flex flex-col justify-between md:w-[65%] w-full h-full rounded-lg border p-6 gap-4 ">
        {/* cart items list contaner */}
        {cartItems.map((item) => (
          <div key={item._id} className="flex  gap-6 p-2 border-b">
            <Link to={`/products/${item._id}`}>
              <img
                src={item.image}
                alt="product-img"
                className="rounded-lg  md:max-w-[8rem] max-h-[8rem]"
              />
            </Link>

            <div className="flex flex-col  justify-center w-full gap-2 ">
              {/* Container for product name and delete button */}
              <div className="flex justify-between">
                <Link to={`/products/${item._id}`}>
                  <h3 className="md:text-xl text-sm font-bold ">{item.name}</h3>
                </Link>
                <button
                  className="py-1 px-1 rounded-lg border text-red-600 text-lg"
                  onClick={() => removeCartItemHandler(item._id)}
                >
                  <RiDeleteBin2Line />
                </button>
              </div>
              <p>Size :Large</p>
              <p>Color :Red</p>
              {/* Container for Product price and Count button */}
              <div className="flex md:flex-row  flex-col justify-between gap-4">
                <h4 className="md:text-xl text-sm font-bold">₹ {item.price}</h4>
              <div className="w-1/2 md:w-fit">

                <CountButton
                  count={item.count}
                  stockQuantity={item.stockQuantity}
                  onIncrement={() => handleIncrement(item._id)}
                  onDecrement={() => handleDecrement(item._id)}
                  />
                  </div>
                <span>₹ {Math.round(item.price * item.count)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart total container*/}
      <div className="flex  flex-col rounded-lg border p-4 gap-4 text-base h-full">
        <h4 className="my-2 text-lg font-semibold">Cart total</h4>
        <div className="flex justify-between space-x-16 md:space-x-">
          <p>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.count, 0)})
            items
          </p>
          {/* <p key={item._id}>₹ {cartItems.reduce((acc, item)=> acc + (item.count * item.price))}</p> */}
          <p key="sub-total">
            ₹{" "}
            {cartItems
              .reduce((acc, item) => acc + item.count * item.price, 0)
              .toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between space-x-16 md:space-x-44">
          <p>Discount</p>
          <p>20%</p>
        </div>
        <div className="flex justify-between space-x-8">
          <p>Delivery Charge</p>
          <p>{shippingPrice}</p>
        </div>
        <div className="flex justify-between space-x-8">
          <p>Total</p>
          <p>₹ </p>
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

        <Button label=" Continue to Shipping" onClick={checkoutHandler} />
      </div>
    </section>
  );
};
