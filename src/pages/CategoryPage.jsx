import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import ProductList from "../components/ProductList";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import { Loader } from "../components/Loader";
import {
  useGetProductsQuery,
  useGetFilteredProductsQuery,
} from "../slices/productApiSlice.js";

const CategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { keyword } = useParams();
  const queryParams = queryString.parse(location.search);

  const {
    data: allProducts,
    isLoading: allProductsLoading,
    error: allProductsError,
  } = useGetProductsQuery();
  const {
    data: filteredProducts,
    isLoading: filteredProductsLoading,
    error: filteredProductsError,
  } = useGetFilteredProductsQuery({
    keyword: keyword || "",
    page: queryParams.page || 1,
    category: queryParams.category || "",
    brand: queryParams.brand || "",
    rating: queryParams.rating || "",
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (
      filteredProducts &&
      filteredProducts.products &&
      filteredProducts.products.length > 0
    ) {
      setProducts(filteredProducts.products);
    } else if (
      allProducts &&
      allProducts.products &&
      allProducts.products.length > 0
    ) {
      setProducts(allProducts.products);
    } else {
      setProducts([]);
    }
  }, [filteredProducts, allProducts]);

  const updateUrlParams = (params) => {
    const newParams = {
      ...queryParams,
      ...params,
      page: 1, // Reset to first page on filter change
    };
    const searchString = queryString.stringify(newParams);
    navigate(`${location.pathname}?${searchString}`);
  };

  const handleCategoryChange = (event) => {
    updateUrlParams({ category: event.target.value });
  };

  const handleBrandChange = (event) => {
    updateUrlParams({ brand: event.target.value });
  };

  const handleRatingChange = (event) => {
    updateUrlParams({ rating: event.target.value });
  };

  const handleClearFilters = () => {
    updateUrlParams({ category: "", brand: "", rating: "" });
  };

  return (
    <div className="flex flex-row pt-28 p-16">
      {allProductsLoading || filteredProductsLoading ? (
        <Loader />
      ) : allProductsError || filteredProductsError ? (
        <p>
          {allProductsError?.data?.message ||
            filteredProductsError?.data?.message ||
            "Error loading products"}
        </p>
      ) : (
        <>
          <Filter
            categories={
              filteredProducts?.categories || allProducts?.categories || []
            }
            brands={filteredProducts?.brands || allProducts?.brands || []}
            selectedCategory={queryParams.category || ""}
            selectedBrand={queryParams.brand || ""}
            selectedRating={queryParams.rating || ""}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onRatingChange={handleRatingChange}
            onClearFilters={handleClearFilters}
          />
          <ProductList
            products={products}
            isLoading={allProductsLoading || filteredProductsLoading}
            error={allProductsError || filteredProductsError}
          />
        </>
      )}
    </div>
  );
};

export default CategoryPage;
