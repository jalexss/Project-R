import { isRejectedWithValue } from "@reduxjs/toolkit";

export const handleErrors = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  //console.log("soy un middleware en el store! Hola!", action);

  if (isRejectedWithValue(action)) {
    const { data, status } = action.payload;

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";

      return;
    }
  }

  return next(action);
};
