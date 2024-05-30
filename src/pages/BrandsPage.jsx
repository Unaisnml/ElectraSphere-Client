import React from "react";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Message from "../components/Message";
import { Loader } from "../components/Loader";

const BrandsPage = () => {
  const {
    data: allProducts,
    isLoading: allProductsLoading,
    error: allProductsError,
  } = useGetProductsQuery();

  // Get unique brands from the products
  const brands = allProducts
    ? Array.from(new Set(allProducts.map((product) => product.brand)))
    : [];

  return (
    <main className="container mx-auto md:mb-24 h-auto max-w-[85%] mt-44 mb-40 pb-52 ">
      {allProductsLoading ? (
        <Loader />
      ) : allProductsError ? (
        <Message variant="danger">{allProductsError.message}</Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          {brands.length > 0 ? (
            brands.map((brand, index) => (
              <div
                key={index}
                className="bg-red-100 p-4 rounded-lg text-center text-red-900"
              >
                <p className="text-lg font-semibold">{brand}</p>
              </div>
            ))
          ) : (
            <p>No brands available.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default BrandsPage;
