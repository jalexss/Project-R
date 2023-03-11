import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // 'authenticated, 'not-authenticated'
    user: null,
    token: null,
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = null;
      state.token = null;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload.user;
      state.token = payload.token;
    },
    onLogout: (state) => {
      state.status = "not-authenticated";
      state.user = null;
      state.token = null;
    },
    authenticated: (state, { payload }) => {
      state.status = "authenticated";
      state.token = payload;
    },

    loadedUser: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
    },
  },
});

export const { loadedUser, onChecking, onLogin, onLogout, authenticated } =
  authSlice.actions;
