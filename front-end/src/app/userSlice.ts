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
      throw new Error("resource not found");
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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data as UserState;
  } catch (err) {
    console.log(err);
    return null;
  }
});

export const logout = createAsyncThunk("logout", async (user: UserState) => {
  if (!user || !user.token) return;

  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_API_URL}/logout`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response && response.data;
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
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        const token = localStorage.getItem("token");
        state = { ...state, ...action.payload, token, loading: false };
        return state;
      } else {
        localStorage.removeItem("token");
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

export const { setToken, setUser } = userSlice.actions;

export default userSlice.reducer;
