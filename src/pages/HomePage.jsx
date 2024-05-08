import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
// import axios from "axios";
import CompanyLogos from "../components/CompanyLogos";
import Heading from "../components/Heading";
import DressStyle from "../components/DressStyle";
import ReviewCard from "../components/ReviewCard";
import Line from "../components/Line";
import { useGetProductsQuery } from "../slices/productApiSlice";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <main className="relative">
      <section>
        <Hero />
      </section>
      <section>
        <CompanyLogos />
      </section>
      <section>
        <Heading label="NEW ARRIVALS" />
      </section>
      <section>
        
        {products && ( 
          <ProductCard
            products={products}
            isLoading={isLoading}
            error={error}
          />
        )}
      </section>
      <section className="flex items-center justify-center my-8">
        <Line />
      </section>
      <section>
        <section>
          <Heading label="Top Selling" />
        </section>
        {products && (
          <ProductCard
            products={products}
            isLoading={isLoading}
            error={error}
          />
        )}
      </section>
      <section>
        <DressStyle />
      </section>
      <section className="mb-32">
        <ReviewCard />
      </section>
    </main>
  );
};

export default HomePage;
