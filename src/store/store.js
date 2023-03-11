import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./";
import {
  adminApi,
  authApi,
  commentApi,
  ratingApi,
  recetaApi,
  userApi,
} from "./api";
import { handleErrors } from "./middlewares";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [recetaApi.reducerPath]: recetaApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [ratingApi.reducerPath]: ratingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      recetaApi.middleware,
      userApi.middleware,
      commentApi.middleware,
      adminApi.middleware,
      ratingApi.middleware,
      handleErrors
    ),
});
