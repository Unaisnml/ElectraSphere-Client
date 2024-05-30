
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const EmptyState = ({
  icon: Icon = AiOutlineShoppingCart,
  title = "Your Cart is Empty",
  message = "No items in your cart yet. Let's go shopping!",
  buttonText = "Back to Shop!",
  buttonLink = "/",
}) => {
  return (
    <section className="container flex justify-center mx-auto">
      <div className="flex flex-col justify-center my-20 items-center space-y-4 h-full">
        <Icon className="text-5xl text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
        <p className="text-gray-500">{message}</p>
        <Link
          to={buttonLink}
          className="px-4 py-2 rounded-full bg-green-500 text-white font-medium hover:bg-green-700"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
};

export default EmptyState;

