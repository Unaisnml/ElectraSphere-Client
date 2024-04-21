import React from 'react'
import {Cart}  from '../components/Cart'

const CartPage = () => {
  return (
    <section className='container mx-auto my-4 md:my-10 h-auto max-w-[85%] '>
      <h2 className='my-3 container text-lg font-semibold  '>Your Cart</h2>
        <Cart/>
    </section>
  )
}

export default CartPage