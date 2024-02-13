import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosApp from "../customAxios";
import { formatQueryParams } from "../utils/queryParams";
import { FetchProductsInterface, ProductInterface } from "../utils/types";

export interface SearchProductsState {
  name: string;
  products: ProductInterface[];
  // selectedProduct: ProductInterface | null;
  loading: boolean;
  // categories: string[];
}

const initialState: SearchProductsState = {
  name: "",
  products: [],
  // selectedProduct: null,
  loading: false,
  // categories: [],
};

export const fetchProducts = createAsyncThunk(
  "products",
  async (filters: FetchProductsInterface) => {
    const qs = formatQueryParams(filters);
    try {
      const response = await axiosApp.get(`/products${qs}`);
      return response.data && response.data.data
        ? (response.data.data as ProductInterface[])
        : [];
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload;
      }
      state.loading = false;
    });
  },
});

export const { setInputNameValue } = searchProductsSlice.actions;

export default searchProductsSlice.reducer;
