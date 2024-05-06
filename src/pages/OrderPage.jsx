import React from 'react'
import OrderSummary from '../components/OrderSummary'

const OrderPage = () => {
  return (
    <section className="container mx-auto my-4 md:my-10 h-auto max-w-[85%] ">
      <h2 className="my-3 container text-2xl font-bold  ">Order Summary</h2>
      <OrderSummary/>
      </section>
  )
}

export default OrderPage