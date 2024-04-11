import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosApp from "../customAxios";
import { getCartItemLS } from "../utils/usefulMethods";

export interface UserState {
  name: string;
  id: number | null;
  token?: string | null;
  type: string;
  loading?: boolean;
  cart_items_count?: number;
}

let initialState: UserState = {
  name: "",
  id: null,
  token: null,
  type: "default",
  loading: false,
};

export const login = createAsyncThunk(
  "login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axiosApp.post("/login", {
        email,
        password,
      });
      return response.data as UserState;
    } catch (err) {
      throw new Error("resource not found");
      return null;
    }
  }
);

export const getUser = createAsyncThunk("user", async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await axiosApp.get("/user");
    return response.data as UserState;
  } catch (err) {
    console.log(err);
    return null;
  }
});

export const logout = createAsyncThunk("logout", async (user: UserState) => {
  if (!user || !user.token) return;

  try {
    const response = await axiosApp.delete("/logout");
    return response && response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      if (state) {
        state.token = action.payload;
      }

      return state;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      if (state) {
        state = { ...state, ...action.payload };
        const token = action.payload?.token;
        if (token) {
          localStorage.setItem("token", token);
        }
      }

      return state;
    },
    updateCartCount: (state, action: PayloadAction<number>) => {
      if (state) {
        state = { ...state, cart_items_count: action.payload };
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      if (state) {
        state = { ...state, loading: true };
      }

      return state;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        const token = localStorage.getItem("token");
        state = { ...state, ...action.payload, token, loading: false };
      } else {
        localStorage.removeItem("token");
        const cartItemsLS = getCartItemLS(); // calculate quantity cart items from localStorage if  user is  not logged
        const productsCount = cartItemsLS.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        state = { ...state, cart_items_count: productsCount, loading: false };
      }

      return state;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      if (state) {
        state = { ...state, loading: true };
      }

      return state;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      if (action.payload) {
        state = initialState;
        localStorage.removeItem("token");
      }

      return state;
    });
  },
});

export const { setToken, setUser, updateCartCount } = userSlice.actions;

export default userSlice.reducer;
