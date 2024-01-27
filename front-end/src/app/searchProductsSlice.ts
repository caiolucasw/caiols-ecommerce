import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { formatQueryParams } from "../utils/queryParams";
import { FetchProductsInterface, ProductInterface } from "../utils/types";

export interface SearchProductsState {
  name: string;
  products: ProductInterface[];
  selectedProduct: ProductInterface | null;
  // categories: string[];
}

const initialState: SearchProductsState = {
  name: "",
  products: [],
  selectedProduct: null,
  // categories: [],
};

export const fetchProducts = createAsyncThunk(
  "products",
  async (filters: FetchProductsInterface) => {
    const qs = formatQueryParams(filters);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/products${qs}`
      );
      return response.data && response.data.data
        ? (response.data.data as ProductInterface[])
        : [];
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "product/{id}",
  async (id: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/products/${id}`
      );
      return response.data ? (response.data as ProductInterface) : null;
    } catch (err) {
      console.log(err);
      return null;
    }
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
      if (action.payload) {
        state.products = action.payload;
      }
      console.log(action.payload);
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      if (action.payload) {
        state.selectedProduct = action.payload;
      }
    });
  },
});

export const { setInputNameValue } = searchProductsSlice.actions;

export default searchProductsSlice.reducer;
