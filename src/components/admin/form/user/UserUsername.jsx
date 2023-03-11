import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useUpdateUserMutation } from "../../../../store/api";

export const UserUsername = ({ user, setUser }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const helperTextMain =
    "Username must be greater than 3. Must be less than 20.";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log("submit", data);
    updateUser({ userId: user._id, data: { username: data.username } })
      .unwrap()
      .then(() => {
        setUser({ ...user, username: data.username });
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h1" variant="h6">
        Username: {user ? user.username : ""}
      </Typography>
      <TextField
        disabled={user ? false : true}
        label="New username"
        type="text"
        helperText={
          !!errors?.username ? errors.username.message : helperTextMain
        }
        error={!!errors?.username}
        {...register("username")}
      />
      <Button type="submit" variant="contained" disabled={user ? false : true}>
        Change
      </Button>
    </Grid>
  );
};
