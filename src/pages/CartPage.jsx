import React from "react";
import { Cart } from "../components/Cart";
import { useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";

const CartPage = ({ title, message, buttonText, buttonLink }) => {
  const cart = useSelector((state) => state.cart);
  const shippingPrice = useSelector((state) => state.cart.shippingPrice);
  const { cartItems } = cart;
  return (
    <section className="container mx-auto my-4 md:mb-10 h-auto max-w-[85%] mt-28 ">
      {cartItems.length === 0 ? (
        <EmptyState
          title="Your Cart is Empty"
          message="No items in your cart yet. Let's go shopping!"
          buttonText="Back to Shop!"
          buttonLink="/"
        />
      ) : (
        <>
          <h2 className="my-3 container text-lg font-semibold  ">Your Cart</h2>
          <Cart cartItems={cartItems} shippingPrice={shippingPrice} />
        </>
      )}
    </section>
  );
};

export default CartPage;
