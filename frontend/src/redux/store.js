import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from './slices/orderSlice'; 

const store = configureStore({
    reducer : {
        auth : authSlice,
        product : productSlice,
        users : userSlice,
        cart : cartSlice,
        order: orderSlice,
    }
});

export default store;