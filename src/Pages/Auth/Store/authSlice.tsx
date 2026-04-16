import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import loginService from "../Services/loginService";
import registrationService from "../Services/registrationService";
import isAuthenticated from "../../../Utils/isAuthenticated";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AuthState = {
  isLoggedIn: isAuthenticated(),
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await loginService(fetch, data);
      const result = await response.json();
      if (!response.ok) return rejectWithValue(result.message || "Login Gagal");
      return result as User;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await registrationService(fetch, data);
      const result = await response.json();
      if (!response.ok)
        return rejectWithValue(result.message || "Registrasi Gagal");
      return result as User;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.successMessage = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        const responseData = action.payload.data;

        if (responseData && responseData.token) {
          localStorage.setItem("token", responseData.token);
          const expiry = Date.now() + 60 * 120 * 1000;
          localStorage.setItem("token_exp", expiry.toString());
          state.user = responseData;
        }

        console.log("<<<<", localStorage.getItem("token"));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.successMessage = "Akun berhasil dibuat!";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
