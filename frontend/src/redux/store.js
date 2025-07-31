import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    order : orderReducer,
    user: userReducer,
    product : productReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
    console.log("Updated State : ", store.getState())
})

export default store
