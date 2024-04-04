import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "../components/Rating";
import Button from "../components/Button";
import { HiOutlineHeart } from "react-icons/hi2";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaRotate } from "react-icons/fa6";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <section>
      <div className="container flex items-center  justify-center space-x-2 mx-auto px-6 max-lg:mt-2 mt-8 ">
        <div className="w-1/2 h-auto  flex flex-col justify-between space-y-4 items-center">
          <img
            src={product.image}
            alt=""
            className="max-lg:max-w-[80%] max-lg:max-h-auto object-contain"
          />
          <div className="grid grid-cols-4 md:gap-4 gap:2 overflow-hidden justify-center  space-x-1">
            <img
              src={product.image}
              alt=""
              className="md:max-w-[100px] md:max-h-[75px] rounded-md hover:border border-gray-600 cursor-pointer  "
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
        </div>
        <div className=" bg-blue-400 flex flex-col justify-start">
          <h3 className="md:text-3xl text-xl leading- mb-2">{product.name}</h3>
          <div className="flex items-center justify-between leading-3 space-x-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <p className="text-md text-green-500 font-medium">In Stock</p>
          </div>
          <p className="mt-3 md:leading-5 md:max-w-xl max-w-48 text-sm font-normal md:w-full ">
            {product.description}
          </p>
          <hr className=" border-gray-700 h-1 w-full my-2 " />
          <div className="flex items-center text-md font-semibold space-x-3 ">
            <p>Colors:</p>
            <span className="w-4 h-4 rounded-full bg-red-600  border-black border-solid border-2"></span>
            <span className="w-4 h-4 rounded-full bg-green-600  border-black border-solid border-2"></span>
          </div>
          <div className=" mt-4 flex space-x-2 ">
            <Button label="Add to Cart" />
            <button className="py-1 md:px-4 px-2 border md:text-3xl text-xl hover:bg-red-600 hover:border-red-600 text-black hover:text-white font-semibold border-black border-solid">
              <HiOutlineHeart />
            </button>
          </div>

          <div className="mt-4 flex flex-col border border-gray-600 rounded-sm">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
