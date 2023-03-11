import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const commentApi = createApi({
  reducerPath: "comments",

  baseQuery,

  endpoints: (builder) => ({
    getComments: builder.mutation({
      query: () => ({
        url: "/comments",
        method: "GET",
        timeout: "5000",
      }),
    }),
    createComment: builder.mutation({
      query: ({ recetaId, comment }) => ({
        url: `/comments/${recetaId}`,
        method: "POST",
        body: { comment },
        timeout: 5000, // tiempo de espera de 5 segundos
      }),
    }),
    getCommentsByRecetaId: builder.mutation({
      query: ({ recetaId, pagination = 1 }) => ({
        url: `/comments/receta/${recetaId}?pagination=${pagination}`,
        method: "GET",
        timeout: 5000, // tiempo de espera de 5 segundos
      }),
    }),
    deleteCommentById: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
        timeout: 5000, // tiempo de espera de 5 segundos
      }),
    }),
    updateCommentById: builder.mutation({
      query: ({ commentId, comment }) => ({
        url: `/comments/${commentId}`,
        method: "PUT",
        body: { comment },
        timeout: 5000, // tiempo de espera de 5 segundos
      }),
    }),
  }),
});

export const {
  useGetCommentsMutation,
  useCreateCommentMutation,
  useGetCommentsByRecetaIdMutation,
  useDeleteCommentByIdMutation,
  useUpdateCommentByIdMutation,
} = commentApi;
