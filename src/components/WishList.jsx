import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiDeleteBin2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import Button from "../components/Button";
import { addToCart } from "../slices/cartSlice";
import { removeFromWishlist } from "../slices/wishlistSlice";
import { toast } from "react-toastify";

export const WishList = ({ wishlistItems }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    const { _id, name, price, image, stockQuantity } = item;
    console.log('Adding item to cart:', { _id, name, price, image, stockQuantity, count: 1 });
    dispatch(addToCart({ _id, name, price, image, stockQuantity, count: 1 }));
    toast.success("Item added to Cart");
  };

  const removeWishItemHandler = async (id) => {
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
      dispatch(removeFromWishlist(id));
      toast.success("Item has been deleted");
    }
  };

  return (
    // main container
    <section className=" flex flex-col  my-10 ">
      {/* Cart items container */}
      <div className="flex flex-col justify-between w-full h-full rounded-lg border p-6 gap-4 ">
        {/* wishlist items list contaner */}
        {wishlistItems.map((item) => (
          <div key={item._id} className="flex  gap-6 p-2 border-b">
            <Link to={`/products/${item._id}`}>
              <img
                src={item.image[0]}
                alt="product-img"
                className="rounded-lg  md:max-w-[8rem] max-h-[8rem]"
              />
            </Link>
            <div className="flex flex-col  justify-center w-full gap-2 ">
              {/* Container for product name and delete button */}
              <div className="flex justify-between items-center gap-7">
                <Link to={`/products/${item._id}`}>
                  <h3 className="md:text-xl text-sm font-bold ">{item.name}</h3>
                </Link>
                <button
                  className="py-1 px-1 rounded-lg border text-red-600 text-lg"
                  onClick={() => removeWishItemHandler(item._id)}
                >
                  <RiDeleteBin2Line />
                </button>
              </div>
              {/* Container for Product price and Count button */}
              <div className="flex md:flex-row  flex-col justify-start items-center gap-24">
                <h4 className="md:text-xl text-sm font-bold">₹ {item.price}</h4>
                
                <Button
                  label="Add to Cart"
                  onClick={() => addToCartHandler(item)}
                  stockQuantity={item.stockQuantity}
                  count={1}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
