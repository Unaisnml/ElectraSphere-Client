import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import CompanyLogos from "../components/CompanyLogos";
import Heading from "../components/Heading";
import DressStyle from "../components/DressStyle";
import ReviewCard from "../components/ReviewCard";
import Line from "../components/Line";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { useSelector } from "react-redux";
import AdminHome from "./Admin/AdminHome";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: products, isLoading, error } = useGetProductsQuery();
  const filteredProducts = products?.filter(product => product.isDelivered > 5);
  return (
    <main className="relative mt-10">
      {
        !userInfo?.isAdmin && (
          <>
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
            products={filteredProducts}
            // isLoading={isLoading}
            // error={error}
          />
        )}
      </section>
      <section>
        <DressStyle />
      </section>
      <section className="mb-32">
        <ReviewCard />
      </section>
    </>
        )
      }
      {
        userInfo?.isAdmin && (
          <>
          <AdminHome/>
          </>
        )
      }
    </main>
  );
};

export default HomePage;
