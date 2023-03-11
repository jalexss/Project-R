import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const recetaApi = createApi({
  reducerPath: "recetas",

  baseQuery,

  endpoints: (builder) => ({
    getRecetas: builder.mutation({
      query: ({ pagination = 0 }) => ({
        url: `/recetas?pagination=${pagination}`,
        method: "GET",
        timeout: 5000, // tiempo de espera de 5 segundos
      }),
    }),
    getRecetaById: builder.mutation({
      query: (recetaId) => `/recetas/recetaId/${recetaId}`,
    }),
    getRecetasByUser: builder.mutation({
      query: (usernameOrId) => ({
        url: `/recetas/user/${usernameOrId}`,
        method: "GET",
        timeout: 5000,
      }),
    }),
    createReceta: builder.mutation({
      query: ({ description, ingredients, instruction, minutes, title }) => ({
        url: "/recetas/create",
        method: "POST",
        body: { description, ingredients, instruction, minutes, title },
        timeout: 5000, // tiempo de espera de 5 segundos
      }),
    }),
    uploadImages: builder.mutation({
      query: ({ recetaId, imagesData }) => ({
        url: `/recetas/images/upload/${recetaId}`,
        method: "POST",
        body: imagesData,
        timeout: 5000, // tiempo de espera de 5 segundos
      }),
    }),
    updateReceta: builder.mutation({
      query: ({
        recetaId,
        description,
        ingredients,
        instruction,
        minutes,
        title,
      }) => ({
        url: `/recetas/${recetaId}`,
        method: "PUT",
        body: { description, ingredients, instruction, minutes, title },
        timeout: 5000, // tiempo de espera de 5 segundos
      }),
    }),
    deleteReceta: builder.mutation({
      query: (recetaId) => ({
        url: `/recetas/${recetaId}`,
        method: "DELETE",
        timeout: 5000, // tiempo de espera de 5 segundos
      }),
    }),
    searchReceta: builder.mutation({
      query: (searching = "") => ({
        url: `/recetas/search?query=${searching}`,
      }),
    }),
  }),
});

export const {
  useGetRecetasMutation,
  useGetRecetaByIdMutation,
  useGetRecetasByUserMutation,
  useCreateRecetaMutation,
  useUploadImagesMutation,
  useUpdateRecetaMutation,
  useDeleteRecetaMutation,
  useSearchRecetaMutation,
} = recetaApi;
