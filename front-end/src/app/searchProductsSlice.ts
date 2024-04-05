import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosApp from "../customAxios";
import { formatQueryParams } from "../utils/queryParams";
import {
  BrandProductsCountInterface,
  CategoryProductsCountInterface,
  ProductInterface,
} from "../utils/types";

interface CategorySelectedInterface {
  [key: number]: CategoryProductsCountInterface;
}

interface BrandSelectedInterface {
  [key: number]: BrandProductsCountInterface;
}

export interface Filters {
  categories: CategorySelectedInterface;
  brands: BrandSelectedInterface;
  price: number[];
}
export interface SearchProductsState {
  name: string;
  products: ProductInterface[];
  loading: boolean;
  filters: Filters;
}

const initialState: SearchProductsState = {
  name: "",
  products: [],
  loading: false,
  filters: {
    categories: {},
    brands: {},
    price: [0, 0],
  },
};

interface CategoryName {
  categoryName: string;
}

type FetchProductsInterface =
  | (Filters & { name?: string; categoryName?: string })
  | CategoryName;

export const fetchProducts = createAsyncThunk(
  "products",
  async (filters: FetchProductsInterface) => {
    const objHasKeys = Object.keys(filters).length > 1;
    let qs = "";

    // check if it has other filters besides categoryName
    if (objHasKeys) {
      qs = formatQueryParams({
        ...filters,
        brands: Object.keys((filters as Filters).brands),
        categories: Object.keys((filters as Filters).categories),
      });
    } else {
      qs = formatQueryParams(filters);
    }

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
      return state;
    },

    // -----------------------
    // remove or add brand
    // ----------------------

    setBrand: (
      state,
      action: PayloadAction<{
        brand: BrandProductsCountInterface;
        type: string;
      }>
    ) => {
      const { brand, type } = action.payload;
      const brands = state.filters.brands;

      switch (type) {
        case "ADD":
          if (!brands[brand.id]) {
            state = {
              ...state,
              filters: {
                ...state.filters,
                brands: {
                  ...state.filters.brands,
                  [brand.id]: brand,
                },
              },
            };
          }
          break;
        case "REMOVE":
          if (brands[brand.id]) {
            const auxBrands = { ...state.filters.brands };
            delete auxBrands[brand.id];
            state = {
              ...state,
              filters: {
                ...state.filters,
                brands: auxBrands,
              },
            };
          }
          break;
        default:
          break;
      }

      return state;
    },

    // -----------------------
    // remove or add category
    // ----------------------

    setCategory: (
      state,
      action: PayloadAction<{
        category: CategoryProductsCountInterface;
        type: string;
      }>
    ) => {
      const { category, type } = action.payload;
      const categories = state.filters.categories;

      switch (type) {
        case "ADD":
          if (!categories[category.id]) {
            state = {
              ...state,
              filters: {
                ...state.filters,
                categories: {
                  ...state.filters.categories,
                  [category.id]: category,
                },
              },
            };
          }
          break;
        case "REMOVE":
          if (categories[category.id]) {
            const auxCategories = { ...state.filters.categories };
            delete auxCategories[category.id];
            state = {
              ...state,
              filters: {
                ...state.filters,
                categories: auxCategories,
              },
            };
          }

          break;
        default:
          break;
      }

      return state;
    },

    setPriceRange: (state, action: PayloadAction<number[]>) => {
      console.log(action);
      const price = action.payload;
      if (price.length === 2) {
        state = {
          ...state,
          filters: {
            ...state.filters,
            price,
          },
        };
      }

      return state;
    },

    clearSearchProducts: (state) => {
      state = initialState;
      return state;
    },
    // ---------------
    // ---------------
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload;
      }
      state.loading = false;
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setInputNameValue,
  setBrand,
  setCategory,
  clearSearchProducts,
  setPriceRange,
} = searchProductsSlice.actions;

export default searchProductsSlice.reducer;
