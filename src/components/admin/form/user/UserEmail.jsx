import {
  Button,
  Grid,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useUpdateUserMutation } from "../../../../store/api";

export const UserEmail = ({ user, setUser }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("submit", data);
    updateUser({ userId: user._id, data: { email: data.email } })
      .unwrap()
      .then(() => {
        //TODO : HACER QUE CONFIRMEN EMAIL
        setUser({ ...user, email: data.email });
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Typography component="h1" variant="h6">
        Email
      </Typography>
      <TextField
        disabled={user ? false : true}
        label="New email"
        type="email"
        helperText={
          !!errors?.email ? errors.email.message : "This field must be a Email"
        }
        error={!!errors?.email}
        {...register("email")}
      />
      <Button type="submit" variant="contained" disabled={user ? false : true}>
        Change
      </Button>
    </Grid>
  );
};
