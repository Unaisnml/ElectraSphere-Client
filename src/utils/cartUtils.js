export const addDecimals = (num) => {
  return Number(Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //   Calculate item price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.count) / 100,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);
  console.log("itemsPrice type is", typeof itemsPrice);

  //   Calculate tax price
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);
  console.log("type of  taxPrice", typeof taxPrice);

  //   Calculate shipping price (order is greater than 500 shipping free, else 40 shipping charge)
  const shippingPrice = state.itemsPrice > 499 ? 0 : 40;
  state.shippingPrice = addDecimals(shippingPrice);
  console.log("type of  shippingPrice", typeof shippingPrice);

  //   Calculate total price
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  state.totalPrice = addDecimals(totalPrice);
  console.log("type of total price", typeof totalPrice);
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
