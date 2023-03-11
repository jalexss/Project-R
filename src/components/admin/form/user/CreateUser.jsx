import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthStore } from "../../../../hooks";
import {
  RegisterConfirmPassword,
  RegisterEmail,
  RegisterFirstName,
  RegisterlastName,
  RegisterPassword,
  RegisterUsername,
} from "../../../auth";

export const CreateUser = () => {
  const { startRegister, registerResult } = useAuthStore();
  const [backendMessage, setBackendMessage] = useState({
    successfully: "",
    error: "",
  });
  const { isLoading, isError, error, isSuccess, status } = registerResult;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    startRegister(data);
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (isSuccess) {
        setBackendMessage({
          successfully: "User created successfully!",
          error: "",
        });
      }

      if (isError) {
        setBackendMessage({ successfully: "", error: "Error creating user" });
      }
    }
    return () => {
      ignore = true;
    };
  }, [status]);

  return (
    <Grid
      container
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      sx={{ boxShadow: 1, borderRadius: "1rem" }}
    >
      <Typography component="h1" variant="h4">
        Create User
      </Typography>
      <RegisterUsername register={register} isError={isError} errors={errors} />
      <RegisterEmail isError={isError} register={register} errors={errors} />
      <RegisterFirstName
        isError={isError}
        register={register}
        errors={errors}
      />
      <RegisterlastName isError={isError} register={register} errors={errors} />
      <RegisterPassword isError={isError} register={register} errors={errors} />
      <RegisterConfirmPassword
        isError={isError}
        register={register}
        errors={errors}
        getValues={getValues}
      />

      <Grid item xs={12}>
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
          sx={{ mt: 1, display: backendMessage.error ? "flex" : "none" }}
        >
          {error?.data.msg}
        </Alert>
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
          sx={{ mt: 1, display: backendMessage.successfully ? "flex" : "none" }}
        >
          {backendMessage.successfully}
        </Alert>
      </Grid>

      <Grid item xs={12} sx={{ mb: 2, mt: 1, position: "relative" }}>
        <Button
          type="submit"
          disabled={isLoading}
          variant="contained"
          fullWidth
        >
          Create Account
        </Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Grid>
    </Grid>
  );
};
