import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer : {
        auth : authSlice,
        product : productSlice,
        users : userSlice,
    }
});

export default store;