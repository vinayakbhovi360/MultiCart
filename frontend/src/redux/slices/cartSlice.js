import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((ele) => ele._id === item._id);

      if (isItemExist) {
        // If the item exists, increase its quantity
        state.cart = state.cart.map((ele) =>
          ele._id === isItemExist._id
            ? { ...ele, quantity: (ele.quantity || 1) + 1 } // Increment the quantity, ensuring quantity is initialized
            : ele
        );
      } else {
        // If the item doesn't exist, add it to the cart with a quantity of 1
        state.cart.push({ ...item, quantity: 1 });
      }

      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((ele) => ele._id !== action.payload);

      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((ele) => ele._id === action.payload);

      if (item) {
        if (item.quantity > 1) {
          // Decrease the quantity if it's more than 1
          state.cart = state.cart.map((ele) =>
            ele._id === item._id ? { ...ele, quantity: (ele.quantity || 1) - 1 } : ele
          );
        } else {
          // If quantity is 1, remove the item from the cart
          state.cart = state.cart.filter((ele) => ele._id !== action.payload);
        }

        // Update localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cart));
      }
    },
    clearCart: (state) => {
      state.cart = []; 
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
