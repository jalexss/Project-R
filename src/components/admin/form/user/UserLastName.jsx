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
import { lastNameValidations } from "../../../../helpers";
import { useUpdateUserMutation } from "../../../../store/api";

export const UserLastName = ({ user, setUser }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const helperTextMain =
    "Last Name must be greater than 3. Must be less than 20.";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("submit", data);
    updateUser({ userId: user._id, data: { lastName: data.lastName } })
      .unwrap()
      .then(() => {
        setUser({ ...user, lastName: data.lastName });
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h1" variant="h6">
        Last name: {user ? user.lastName : ""}
      </Typography>
      <TextField
        disabled={user ? false : true}
        label="New last Name"
        type="text"
        helperText={
          !!errors?.lastName ? errors.lastName.message : helperTextMain
        }
        error={!!errors?.lastName}
        {...register("lastName", lastNameValidations)}
      />
      <Button type="submit" variant="contained" disabled={user ? false : true}>
        Change
      </Button>
    </Grid>
  );
};
