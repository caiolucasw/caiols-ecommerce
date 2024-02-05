import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserState {
  name: string;
  id: number | null;
  token?: string | null;
  loading?: boolean;
}

let initialState: UserState = {
  name: "",
  id: null,
  token: null,
  loading: false,
};

export const login = createAsyncThunk(
  "login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data as UserState;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

export const getUser = createAsyncThunk("user", async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/user`,
      {
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          'Authorizaton': `Bearer ${token}`,
        },
      }
    );
    return response.data as UserState;
  } catch (err) {
    console.log(err);
    return null;
  }
});

// export const fetchProduct = createAsyncThunk(
//   "product/{id}",
//   async (id: string) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_API_URL}/products/${id}`
//       );
//       return response.data ? (response.data as ProductInterface) : null;
//     } catch (err) {
//       console.log(err);
//       return null;
//     }
//   }
// );

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      if (state) {
        state.token = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      if (state) state.loading = true;
      return state;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state = { ...state, ...action.payload, loading: false };
      const token = action.payload?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      return state;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        const token = localStorage.getItem("token");
        state = { ...state, ...action.payload, token, loading: false };
        return state;
      } else {
        localStorage.removeItem("token");
      }
    });
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
