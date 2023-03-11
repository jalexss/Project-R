import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const userApi = createApi({
  reducerPath: "users",

  baseQuery,

  endpoints: (builder) => ({
    addFavorite: builder.mutation({
      query: ({ userId, recetaId, addFavorite }) => ({
        url: `/users/${userId}/recetas/${recetaId}/favorites`,
        method: "POST",
        body: { addFavorite },
        timeout: 5000,
      }),
    }),
    myFavorites: builder.mutation({
      query: () => ({
        url: `/users/favorites`,
        method: "GET",
      }),
    }),
    myRecetas: builder.query({
      query: () => "/users/recetas/myRecetas",
    }),
    getUsers: builder.mutation({
      query: (username = "") => ({
        url: `/users/?username=${username}`,
        method: "GET",
        timeout: 5000,
      }),
    }),
    searchUser: builder.mutation({
      query: (searching = "") => ({
        url: `/users/search?query=${searching}`,
      }),
    }),
    uploadAvatar: builder.mutation({
      query: ({ avatar, userId }) => ({
        url: `/users/avatar/${userId}`,
        method: "PATCH",
        body: avatar,
        timeout: 5000,
      }),
    }),
    removeAvatar: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/avatar/${userId}`,
        method: "DELETE",
        timeout: 5000,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: data,
        timeout: 5000,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId = "") => ({
        url: `/users/${userId}`,
        method: "DELETE",
        timeout: 5000,
      }),
    }),
  }),
});

export const {
  useAddFavoriteMutation,
  useMyFavoritesMutation,
  useMyRecetasQuery,
  useGetUsersMutation,
  useSearchUserMutation,
  useUploadAvatarMutation,
  useRemoveAvatarMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
