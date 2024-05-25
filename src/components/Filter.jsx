import React from "react";

const Filter = ({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  selectedRating,
  onCategoryChange,
  onBrandChange,
  onRatingChange,
  onClearFilters,
}) => {
  return (
    <div className="w-1/4 p-4">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <label htmlFor="categoryFilter" className="block mb-2 font-semibold">
          Category
        </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={onCategoryChange}
          className="w-full p-2 border rounded bg-blue-100 outline-none"
        >
          <option value="">All</option>
          {categories &&
            categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div className="mb-4">
        <label htmlFor="brandFilter" className="block mb-2 font-semibold">
          Brand
        </label>
        <select
          id="brandFilter"
          value={selectedBrand}
          onChange={onBrandChange}
          className="w-full p-2 border rounded bg-blue-100 outline-none"
        >
          <option value="">All</option>
          {brands &&
            brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
        </select>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <label htmlFor="ratingFilter" className="block mb-2 font-semibold">
          Rating
        </label>
        <select
          id="ratingFilter"
          value={selectedRating}
          onChange={onRatingChange}
          className="w-full p-2 border rounded bg-blue-100 outline-none"
        >
          <option value="">All</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      <button
        className="mt-3 w-full p-2 bg-gray-600 text-white rounded"
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
