import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import axios from "axios";
import Rating from "../components/Rating";
import Button from "../components/Button";
import { HiOutlineHeart } from "react-icons/hi2";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import CountButton from "../components/CountButton";
import { addToCart } from "../slices/cartSlice";

const ProductPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, count }));
    // console.log("Product price from add to cart",typeof(product.price) ,typeof(count));
  };
  console.log("Got product.........", product);

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
  // const [product, setProduct] = useState({});
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `http://localhost:5000/api/products/${productId}`
  //       );
  //       setProduct(data);
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //     }
  //   };

  //   fetchProduct();
  // }, [productId]);

  return (
    <section className="container mx-auto">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.error}</div>
      ) : (
        <div className=" flex  md:flex-row flex-col items-center  gap-6  py-12 ">
          <div className="w-1/2 h-auto  flex  space-y-4 items-center justify-center gap-8 overflow-hidden ">
            <div className="md:grid grid-cols-1  gap-2 overflow-hidden justify-center min-w-20  hidden">
              <img
                src={product.image}
                alt=""
                className="md:max-w-[100px] md:max-h-[75px] rounded-md hover:border border-gray-600 cursor-pointer "
              />
              <img
                src={product.image}
                alt=""
                className="md:max-w-[100px] md:max-h-[75px] rounded-md hover:border border-gray-600 cursor-pointer "
              />
              <img
                src={product.image}
                alt=""
                className="md:max-w-[100px] md:max-h-[75px] rounded-md hover:border border-gray-600 cursor-pointer "
              />
              <img
                src={product.image}
                alt=""
                className="md:max-w-[100px] md:max-h-[75px] rounded-md hover:border border-gray-600 cursor-pointer "
              />
            </div>

            <img
              src={product.image}
              alt=""
              className="md:max-w-[70%] max-h-[22rem] object-contain"
            />
          </div>
          <div className=" flex flex-col justify-start py-6">
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
            <p className="mt-2 md:leading-5 md:max-w-xl max-w-48 text-sm font-normal md:w-full ">
              {product.description}
            </p>
            <hr className=" border-gray-700 h-1 w-full my-2 " />
            <div className="flex items-center text-md font-semibold space-x-3 ">
              <p>Colors:</p>
              <span className="w-4 h-4 rounded-full bg-red-600  border-black border-solid border-2"></span>
              <span className="w-4 h-4 rounded-full bg-green-600  border-black border-solid border-2"></span>
            </div>
            <div className=" mt-4 flex space-x-2 ">
              <CountButton
                count={count}
                onIncrement={incrementCount}
                onDecrement={decrementCount}
              />
              <Button
                label="Add to Cart"
                onClick={addToCartHandler}
                stockQuantity={product.stockQuantity}
                count={product.count}
              />
              <button className="py-1 md:px-2 px-2 border md:text-3xl text-xl hover:bg-red-600 rounded-xl hover:border-red-600 text-black hover:text-white font-semibold border-black border-solid">
                <HiOutlineHeart />
              </button>
            </div>

            {/* <div className="mt-4 flex flex-col border border-gray-600 rounded-sm">
              <div className="flex">
                <div className="text-xl items-center justify-center  my-4 mx-2">
                  <CiDeliveryTruck />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold">Free Delivery</h4>
                  <p className="text-xs w-full">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <hr className=" border-gray-600 h-0.5 w-full" />
              <div className="flex">
                <div className="text-xl  items-center justify-center  my-2 mx-2">
                  <FaRotate />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold">Return Delivery</h4>
                  <p className="text-xs w-full">10 Days Return</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductPage;
