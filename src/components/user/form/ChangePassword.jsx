import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthStore } from "../../../hooks";
import {
  passwordLoginValidations,
  passwordValidations,
} from "../../../helpers/AuthValidations";
import { useUpdateUserMutation } from "../../../store/api";

export const ChangePassword = () => {
  const { user, userIsLoading } = useAuthStore();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [backendMessage, setBackendMessage] = useState({
    successfully: "",
    error: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const helperTextMain = "Password Should be an Uppercase letter and a number";

  const confirmPasswordValidations = {
    required: "confirm your password",
    validate: (value) =>
      value === getValues("newPassword") || "Passwords do not match!.",
  };

  const onSubmit = (data) => {
    updateUser({
      userId: user.id,
      data: { password: data.password, newPassword: data.newPassword },
    })
      .unwrap()
      .then(({ msg }) => {
        reset();
        setBackendMessage({ successfully: msg, error: "" });
      })
      .catch(({ data }) => {
        setBackendMessage({ successfully: "", error: data.msg });
      });
  };

  return (
    <Grid item xs={11} lg={4} sx={{ boxShadow: 1, borderRadius: "1em" }}>
      {userIsLoading ? (
        <Typography>Loading... password</Typography>
      ) : (
        <>
          <Grid
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            container
            direction="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12}>
              <Typography variant="h6">Change Password</Typography>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <TextField
                    label="Password"
                    type="password"
                    placeholder="password"
                    fullWidth
                    helperText={
                      !!errors?.password
                        ? errors.password.message
                        : helperTextMain.password
                    }
                    error={!!errors?.password}
                    {...register("password", passwordLoginValidations)}
                    sx={{
                      mb: 2,
                    }}
                  />

                  <Divider />

                  <TextField
                    label="New password"
                    type="password"
                    fullWidth
                    helperText={
                      !!errors?.newPassword
                        ? errors.newPassword.message
                        : helperTextMain
                    }
                    error={!!errors?.newPassword}
                    {...register("newPassword", passwordValidations)}
                    sx={{
                      mt: 2,
                    }}
                  />

                  <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    helperText={
                      !!errors?.confirmPassword
                        ? errors.confirmPassword.message
                        : helperTextMain
                    }
                    error={!!errors?.confirmPassword}
                    {...register("confirmPassword", confirmPasswordValidations)}
                  />
                </>
              )}
            </Grid>
            <Grid item xs={12} display="flex">
              <Button variant="contained" type="submit">
                Change
              </Button>
            </Grid>
            <Grid item xs={12} display="flex">
              {backendMessage.successfully && (
                <Alert
                  severity="success"
                  action={
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setBackendMessage({ successfully: "", error: "" });
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {backendMessage.successfully}
                </Alert>
              )}
              {backendMessage.error && (
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setBackendMessage({ successfully: "", error: "" });
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{}}
                >
                  {backendMessage.error}
                </Alert>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};
