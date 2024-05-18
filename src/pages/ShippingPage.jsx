import React, { useState } from "react";
import ShippingAddress from "../components/ShippingAddress";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingPage = () => {
  console.log("message from shippingPage component");
  const initialValues = {
    houseName: "",
    streetAdress: "",
    city: "",
    state: "",
    postalCode: "",
  };
  return (
    <section className="container flex flex-col items-center justify-center mx-auto mt-32 mb-36 border rounded-lg py-8  w-1/2">
      <ShippingAddress initialValues={initialValues} />
    </section>
  );
};

export default ShippingPage;
