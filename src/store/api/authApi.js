import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authUser",

  baseQuery,

  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "/auth/",
        method: "POST",
        body: { username, password },
        timeout: 5000, // tiempo de espera de 5 segundos
      }),
    }),
    register: builder.mutation({
      query: (data = {}) => ({
        url: "/auth/new",
        method: "POST",
        body: data,
        timeout: 5000, // tiempo de espera de 5 segundos
      }),
    }),
    getDataUser: builder.mutation({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
    }),
    checkConfirmationCode: builder.mutation({
      query: (confirmationCode = "") => ({
        url: `/auth/confirm/${confirmationCode}`,
        method: "GET",
      }),
    }),
    confirmResetPassword: builder.mutation({
      query: (email = "") => ({
        url: "/auth/confirmResetPassword",
        method: "POST",
        body: { email },
      }),
    }),
    checkResetPasswordCode: builder.mutation({
      query: (resetPasswordCode = "") => ({
        url: `/auth/resetPassword/${resetPasswordCode}`,
        method: "GET",
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ resetPasswordCode, password }) => ({
        url: `/auth/resetPassword/${resetPasswordCode}`,
        method: "POST",
        body: { password },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetDataUserMutation,
  useConfirmResetPasswordMutation,
  useCheckResetPasswordCodeMutation,
  useResetPasswordMutation,
  useCheckConfirmationCodeMutation,
} = authApi;
