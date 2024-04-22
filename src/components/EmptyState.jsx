import React from "react";
// import { emptyCart } from '../assets/images'
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Button from "./Button";

const EmptyState = () => {
  return (
    <section className="container flex justify-center mx-auto">
      <div className="flex flex-col justify-center my-20 items-center space-y-4 h-full">
        <AiOutlineShoppingCart className="text-5xl text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-700">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500">
          No Items in your cart yet. Let's go shopping!
        </p>
        <Link
          to="/"
          className="px-4 py-2 rounded-full bg-green-500 text-white font-medium hover:bg-green-700"
        >
          Back to Shop!
        </Link>
      </div>
    </section>
  );
};

export default EmptyState;
