import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },

    incrementItemCount: (state, action) => {
      const { itemId } = action.payload;
      const item = state.cartItems.find((item) => item._id === itemId);
      if (item) {
        item.count += 1;
        return updateCart(state);
      }
    },
    decrementItemCount: (state, action) => {
      const { itemId } = action.payload;
      const item = state.cartItems.find((item) => item._id === itemId);
      if (item) {
        item.count -= 1;
        return updateCart(state);
      }
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  incrementItemCount,
  decrementItemCount,
  removeCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
