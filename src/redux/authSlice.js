import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { login } from "../services/login-service";

const initialState = {
  user: null,
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
  isAuthenticated: !!Cookies.get("accessToken"),
  loading: false,
  error: null,
};

// Async thunk для логина
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (reqData, { rejectWithValue }) => {
    try {
      const response = await login(reqData); // твоя login функция
      const { accessToken, refreshToken } = response.data;

      // Сохраняем токены в cookie
      Cookies.set("accessToken", accessToken, { expires: 3 / 24 }); // 30 минут
      Cookies.set("refreshToken", refreshToken, { expires: 6 / 24 }); // 6 часов

      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;