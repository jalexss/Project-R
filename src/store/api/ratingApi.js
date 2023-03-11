import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const ratingApi = createApi({
  reducerPath: "rating",

  baseQuery,

  endpoints: (builder) => ({
    addRatingToReceta: builder.mutation({
      query: ({ recetaId, value }) => ({
        url: `/rating/receta/${recetaId}`,
        method: "PUT",
        body: { value },
        timeout: "5000",
      }),
    }),
  }),
});

export const { useAddRatingToRecetaMutation } = ratingApi;
