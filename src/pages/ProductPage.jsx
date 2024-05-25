import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Button from "../components/Button";
import { HiOutlineHeart } from "react-icons/hi2";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../slices/productApiSlice";
import { Loader } from "../components/Loader";
import CountButton from "../components/CountButton";
import { addToCart } from "../slices/cartSlice";
import { addToWishlist } from "../slices/wishlistSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Message from "../components/Message";
import WriteReview from "../components/CreateReview";

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState("");
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
  const submitHandler = async ({ rating, comment }) => {
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };
  useState(() => {
    if (product) {
      setSelectedImage(product.image[0]);
    }
  }, [product]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, count }));
    toast.success('Item added to Cart')
  };

  const addToWishlistHandler = () =>{
    dispatch(addToWishlist({...product}))
    toast.success('Item added to wishlish')
  }

  const [count, setCount] = useState(1);
  const incrementCount = () => {
    if (count < product.stockQuantity) {
      setCount((prevCount) => prevCount + 1);
    }
  };
  console.log(count);
  const decrementCount = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  return (
    <section className="container mx-auto mt-32 pb-11">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.error}</div>
      ) : (
        <div className=" flex  md:flex-row flex-col items-center  gap-6  py-8 mx-auto mt-10 shadow">
          <div className="w-1/2 h-auto  flex  space-y-4 items-center justify-center gap-8 overflow-hidden ">
            <div className="md:grid grid-cols-1 gap-3 overflow-hidden justify-center min-w-20 hidden">
              {product.image.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  onClick={() => handleImageClick(image)}
                  className="max-w-[90px] md:max-h-[75px] rounded-md hover:border border-gray-600 cursor-pointer"
                />
              ))}
            </div>
            {/* Image preview area */}
            <img
              src={selectedImage || product.image[0]}
              alt=""
              className="md:max-w-[70%] max-h-[22rem] object-contain"
            />
          </div>
          <div className=" flex flex-col justify-start py-6 px-6">
            <h3 className="md:text-3xl text-xl  mb-2">{product.name}</h3>
            <div className="flex items-center justify-between leading-3 space-x-3">
              <Rating
                value={product.ratings}
                text={`${product.numReviews} reviews`}
              />
              {product.stockQuantity > 0 ? (
                <p className="text-md text-green-500 font-medium">In Stock</p>
              ) : (
                <p className="text-md text-red-500 font-medium">Out of Stock</p>
              )}
            </div>
            <h2 className="text-xl font-semibold my-4 ">₹ {product.price}</h2>
            <p className="mt-2 md:leading-5 md:max-w-xl max-w-full  text-sm font-normal md:w-full ">
              {product.description}
            </p>
            <hr className=" border-gray-700 h-1 w-full my-2 " />
            {/* <div className="flex items-center text-md font-semibold space-x-3 ">
              <p>Colors:</p>
              <span className="w-4 h-4 rounded-full bg-red-600  border-black border-solid border-2"></span>
              <span className="w-4 h-4 rounded-full bg-green-600  border-black border-solid border-2"></span>
            </div> */}
            <div className=" mt-4 flex space-x-2 ">
              <CountButton
                count={count}
                onIncrement={incrementCount}
                onDecrement={decrementCount}
                stockQuantity={product.stockQuantity}
              />
              <Button
                label="Add to Cart"
                onClick={addToCartHandler}
                stockQuantity={product.stockQuantity}
                count={product.count}
              />
              <button
              onClick={addToWishlistHandler}
               className="py-1  px-2 border md:text-3xl text-xl hover:bg-black rounded-xl hover:border-black text-black hover:text-white font-semibold border-black border-solid">
                <HiOutlineHeart />
              </button>
            </div>
            {product.stockQuantity <= 10 ? (
              <span className="my-4 opacity-50">
                Only {product.stockQuantity} items available!
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      <div className="my-8 py-8 w-full">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {product && product.reviews && product.reviews.length === 0 && (
          <Message>No Reviews</Message>
        )}
        {/* Write new reviews here */}
        <WriteReview
          submitHandler={submitHandler}
          loadingProductReview={loadingProductReview}
        />
        {/* Reviews List */}
        <div className="grid md:grid-cols-4 grid-cols-2 gap-3 mt-6 ">
          {product && product.reviews
            ? product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="flex flex-col p-4  shadow border-gray-300 bg-white rounded-lg "
                >
                  <p className="font-medium text-lg my-1">{review.name}</p>
                  <Rating value={review.rating} />
                  <p className="text-sm  max-w-64 mt-2">{review.comment}</p>
                </div>
              ))
            : ""}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
