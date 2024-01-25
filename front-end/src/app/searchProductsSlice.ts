import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { formatQueryParams } from "../utils/queryParams";

export interface SearchProductsState {
  name: string;
  // categories: string[];
}

const initialState: SearchProductsState = {
  name: "",
  // categories: [],
};

interface FetchProductsInterface {
  name: string;
  category: string[] | number[];
}

type Product = any;

export const fetchProducts = createAsyncThunk<FetchProductsInterface, Product>(
  "products",
  async (filters) => {
    const qs = formatQueryParams(filters);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/products${qs}`
    );
    return response.data;
  }
);

export const searchProductsSlice = createSlice({
  name: "searchProducts",
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setInputNameValue } = searchProductsSlice.actions;

export default searchProductsSlice.reducer;
