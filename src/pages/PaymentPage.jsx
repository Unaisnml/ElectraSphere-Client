import React from "react";
import PaymentMethod from "../components/PaymentMethod";

const PaymentPage = () => {
  return (
    <section className="container flex flex-col items-center justify-center mx-auto mt-36 mb-36 border rounded-lg py-8  w-1/2">
      <PaymentMethod />
    </section>
  );
};

export default PaymentPage;
