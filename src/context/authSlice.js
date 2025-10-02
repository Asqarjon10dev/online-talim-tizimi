import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token") || null;

const initialState = {
  token: initialToken,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!initialToken,           // ← flag
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens(state, action) {
      const { access_token, refresh_token } = action.payload || {};
      state.token = access_token || null;
      state.refreshToken = refresh_token || null;
      state.isAuthenticated = !!access_token;        // ← flag update
      if (access_token) localStorage.setItem("token", access_token);
      else localStorage.removeItem("token");
      if (refresh_token) localStorage.setItem("refreshToken", refresh_token);
      else localStorage.removeItem("refreshToken");
    },
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload || null));
    },
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;                 // ← flag reset
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setTokens, setUser, logout } = authSlice.actions;

// ixtiyoriy selectorlar
export const selectIsAuthenticated = (s) => s.auth.isAuthenticated;
export const selectUser = (s) => s.auth.user;

export default authSlice.reducer;
