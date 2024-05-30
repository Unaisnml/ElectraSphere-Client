import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Message from "./Message";
import { useGetTopRatedProductsQuery } from "../slices/productApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopRatedProductsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (products && products.length > 0) {
      const interval = setInterval(() => {
        handleNext();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, products]);

  const handleNext = () => {
    if (products && products.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }
  };

  const handlePrev = () => {
    if (products && products.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + products.length) % products.length
      );
    }
  };

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <div className="relative container mx-auto overflow-hidden bg-primary mb-4 ">
      <div
        className="flex transition-transform duration-500 ease-in-out  w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="flex-shrink-0 w-full flex items-center px-8"
            style={{ width: "100%" }}
          >
            <div className="w-1/2 p-4">
              <h2 className="text-left text-black text-2xl font-semibold mb-4">
                {product.name} @ ₹{product.price}
              </h2>
              <p className="text-left text-black mb-6 text-xl ">
                <i>{product.description}</i>
              </p>
              <Link
                to={`/products/${product._id}`}
                className="py-3 px-5 bg-black text-white rounded-lg"
              >
                Buy now
              </Link>
            </div>
            <Link to={`/products/${product._id}`} className="w-1/2">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-80 object-cover"
              />
            </Link>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
        aria-label="Previous"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
        aria-label="Next"
      >
        &#10095;
      </button>
    </div>
  );
};

export default ProductCarousel;
