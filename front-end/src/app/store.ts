import { configureStore } from "@reduxjs/toolkit";
import searchProductsReducer from './searchProductsSlice';


export const store = configureStore({
    reducer: {
        searchProducts: searchProductsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;