import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({products}) => {
  return (
    // Card container
    <div className="container my-20 mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center">
      {/* Card 1*/}
      {
        products.map((product)=>(<div key={product._id} className="w-full h-[350px] flex  flex-col justify-between space-y-2  rounded-md shadow hover:shadow-xl transition duration-300 ease-in-out p-3 cursor-pointer">
        <div className=" group rounded-md  overflow-hidden cursor-pointer h-[200px] relative">
        <Link to={`/products/${product._id}`}>
        <img
            className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-110 "
            src={product.image}
            alt=""
          /></Link>
         
          {/* <button className='px-10 py-4 bg-black outline-none text-white absolute bottom-0 left-0 right-0 hidden hover:block z-20'>Add to Cart</button> */}
        </div>
        <div className="flex flex-col items-start space-y-3">
          <Link Link to={`/products/${product._id}`}><h2 className="text-red-700 text-lg font-bold ">{product.name}</h2></Link>
          
          <h4 className="text-md font-semibold  ">${product.price}</h4>
          {/* reviews */}
          <div className="">
            
            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
          </div>
        </div>
      </div>))
      }
    </div>
  );
};

export default ProductCard;
