export const addDecimals = (num) => {
    return Number(Math.round(num * 100) / 100).toFixed(2);
  };
  
  export const updateWishlist = (state) => {
    // Calculate total price
    const totalPrice = state.wishlistItems.reduce(
      (acc, item) => acc + item.price,
      0
    );
    state.totalPrice = addDecimals(totalPrice);
  
    // Update localStorage
    localStorage.setItem("wishlist", JSON.stringify(state));
  
    return state; 
  };
  