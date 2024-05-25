import { createSlice } from "@reduxjs/toolkit";
import { updateWishlist } from "../utils/wishListUtils";

const initialState = localStorage.getItem("wishlist")
  ? JSON.parse(localStorage.getItem("wishlist"))
  : { wishlistItems: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;

      // Check if the item already exists in the wishlist
      const existItem = state.wishlistItems.find((x) => x._id === item._id);

      if (existItem) {
        return state;
      }
      state.wishlistItems.push(item);

      return updateWishlist(state);
    },
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      state.wishlistItems = state.wishlistItems.filter((x) => x._id !== itemId);
      return updateWishlist(state);
    },
    clearWishlist: (state, action) => {
      state.wishlistItems = [];
      return updateWishlist(state);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
