import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const adminApi = createApi({
  reducerPath: "admin",

  baseQuery,

  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => "/admin/dashboard",
    }),
  }),
});

export const { useGetDashboardQuery } = adminApi;
