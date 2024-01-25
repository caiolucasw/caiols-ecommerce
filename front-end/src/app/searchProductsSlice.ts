import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SearchProductsState {
    name: string;
    // categories: string[]; 
}

const initialState: SearchProductsState = {
    name: '',
    // categories: [],
}

export const searchProductsSlice = createSlice({
    name: 'searchProducts',
    initialState,
    reducers: {
        setInputNameValue: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        // addCategory: (state, action: PayloadAction<string>) => {
        //     state.categories.push(action.payload);
        // },
        // removeCategory: (state, action: PayloadAction<string>) => {
        //     state.categories = state.categories.filter((category) => category !== action.payload);
        // }
    }
});

export const { setInputNameValue } = searchProductsSlice.actions;

export default searchProductsSlice.reducer;