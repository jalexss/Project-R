import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export default fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL}`,
  // credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set("x-token", token);
    }
    return headers;
  },
});
