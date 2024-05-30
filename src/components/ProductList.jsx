import React from "react";
import { Loader } from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";

const ProductList = ({ products, isLoading, error }) => {
  const filteredProduct = products.filter(
    (products) => products.name !== "Sample name"
  );
  return (
    <div className="w-3/4 p-4">
      {isLoading && <Loader />}
      {error && <p>Error loading products</p>}
      {filteredProduct && filteredProduct.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredProduct.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow-md min-w-44 w-auto"
            >
              <Link to={`/products/${product._id}`}>
                <div className="group md:rounded-md overflow-hidden cursor-pointer h-[200px] relative">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-contain transition duration-300 ease-in-out transform group-hover:scale-110"
                  />
                </div>
                <div className="my-3">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-500">{product.category}</p>
                  <p>{product.brand}</p>
                  <p>₹ {product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <Message variant="danger">
            No products found matching the selected filters.
          </Message>
        )
      )}
    </div>
  );
};

export default ProductList;
