import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Button from "./Button";
import {Loader} from "./Loader";

const ProductCard = ({ products = [], isLoading, error }) => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [displayProducts, setDisplayProducts] = useState(products.slice(0, 4));

  const handleViewAllClick = () => {
    setShowAllProducts(!showAllProducts);
    setDisplayProducts(showAllProducts ? products.slice(0, 4) : products);
  };

  return (
    // Card container
    <section className="flex flex-col  items-center justify-center pb-6 ">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.error}</div>
      ) : (
        <div className="container mx-auto grid place-items-center mb-10  grid-cols-2 md:grid-cols-4 md:gap-x-40 md:gap-y-4 ">
          {/* Card 1*/}

          {displayProducts.map((product) => (
            <div
              key={product._id}
              className="md:w-[275px] w-full h-[350px] flex  flex-col bg-white justify-between  max-lg:rounded-none shadow 
          hover:shadow-xl transition duration-300 ease-in-out p-3 cursor-pointer"
            >
              <div className=" group md:rounded-md  overflow-hidden cursor-pointer h-[200px] relative">
                <Link to={`/products/${product._id}`}>
                  <img
                    className="w-full h-full object-contain transition duration-300 ease-in-out transform group-hover:scale-110 "
                    src={product.image}
                    alt=""
                  />
                </Link>

                {/* <button className='px-10 py-4 bg-black outline-none text-white absolute bottom-0 left-0 right-0 hidden hover:block z-20'>Add to Cart</button> */}
              </div>
              <div className="flex flex-col items-start space-y-3">
                <Link Link to={`/products/${product._id}`}>
                  <h2 className="text-red-700 text-lg font-bold ">
                    {product.name}
                  </h2>
                </Link>

                <h4 className="text-md font-semibold  ">${product.price}</h4>
                {/* reviews */}
                <div className="">
                  <Rating
                    value={product.ratings}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={handleViewAllClick}
        label={showAllProducts ? "View Less" : "View All"}
      />
    </section>
  );
};

export default ProductCard;
