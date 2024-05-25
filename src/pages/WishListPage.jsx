import React from "react";
import { WishList } from "../components/WishList";
import { useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";
import { FaHeartCircleExclamation } from "react-icons/fa6";



const WishListPage = ({ title, message, buttonText, buttonLink,icon }) => {
  const wishList = useSelector((state) => state.wishList);
  //   const shippingPrice = useSelector((state) => state.cart.shippingPrice);
  const { wishlistItems } = wishList;
  return (
    <section className="container mx-auto my-4 md:mb-20 h-auto max-w-1/2 mt-28 ">
      {wishlistItems.length === 0 ? (
        <EmptyState
        icon= {FaHeartCircleExclamation}
          title="Your Wishlist is Empty"
          message="No items in your wishlist yet. Let's go shopping!"
          buttonText="Back to Shop!"
          buttonLink="/"
        />
      ) : (
        <>
          <h2 className="my-3 container text-lg font-semibold  ">Wish List</h2>
          <WishList wishlistItems={wishlistItems} />
        </>
      )}
    </section>
  );
};

export default WishListPage;
