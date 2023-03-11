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
import { useConfirmResetPasswordMutation } from "../../../../store/api";

export const UserResetPassword = ({ user }) => {
  const [confirmResetPassword, { isLoading }] =
    useConfirmResetPasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { email: user ? user.email : "" },
  });

  const onSubmit = ({ email }) => {
    console.log("submit", email);
    confirmResetPassword(email)
      .unwrap()
      .then(() => {
        console.log("confirmResetPassword successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h1" variant="h6">
        Reset password:
      </Typography>
      <TextField
        disabled={true}
        label="Email to confirm reset password"
        type="text"
        {...register("email")}
      />
      <Button type="submit" variant="contained" disabled={user ? false : true}>
        Change
      </Button>
    </Grid>
  );
};
