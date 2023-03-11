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
import { firstNameValidations } from "../../../../helpers";

const helperTextMain =
  "First Name must be greater than 3. Must be less than 20.";

export const UserFirstName = ({ user, setUser }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: user ? user.firstName : "",
    },
  });

  const onSubmit = (data) => {
    console.log("submit", data);
    updateUser({ userId: user._id, data: { firstName: data.firstName } })
      .unwrap()
      .then(() => {
        setUser({ ...user, firstName: data.firstName });
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h1" variant="h6">
        First name: {user ? user.firstName : ""}
      </Typography>
      <TextField
        disabled={user ? false : true}
        label="New first name"
        type="text"
        helperText={
          !!errors?.firstName ? errors.firstName.message : helperTextMain
        }
        error={!!errors?.firstName}
        {...register("firstName", firstNameValidations)}
      />
      <Button type="submit" variant="contained" disabled={user ? false : true}>
        Change
      </Button>
    </Grid>
  );
};
