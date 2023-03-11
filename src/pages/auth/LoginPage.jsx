import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Grid, Button, Link, Alert, CircularProgress } from "@mui/material";

import { AuthLayout } from "../../layouts";
import { useAuthStore } from "../../hooks";
import { LoginPassword, LoginUsername } from "../../components/auth";

export const LoginPage = () => {
  const { startLogin, loginResult } = useAuthStore();
  const { isLoading, isError, error } = loginResult;
  const [isActiveAlert, setIsActiveAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    startLogin(data);
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (isError) {
        setIsActiveAlert(true);
        setTimeout(() => {
          setIsActiveAlert(false);
        }, 9000);
      }
    }

    return () => {
      ignore = true;
    };
  }, [isError]);

  return (
    <AuthLayout title="Login">
      <Grid
        container
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {isActiveAlert && (
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Alert severity="error" sx={{ mt: 1, display: "flex" }}>
              {error?.data.msg}
            </Alert>
          </Grid>
        )}

        <Grid item xs={12} sx={{ mt: 2 }}>
          <LoginUsername
            errors={errors}
            register={register}
            isActiveAlert={isActiveAlert}
            setIsActiveAlert={setIsActiveAlert}
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <LoginPassword
            errors={errors}
            register={register}
            isActiveAlert={isActiveAlert}
            setIsActiveAlert={setIsActiveAlert}
          />
        </Grid>

        <Grid item xs={12} sx={{ mb: 2, mt: 2, position: "relative" }}>
          <Button
            type="submit"
            disabled={isLoading}
            variant="contained"
            fullWidth
          >
            Login
          </Button>
          {isLoading && (
            <CircularProgress
              color="secondary"
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

        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ mt: 2, mb: 1 }}
        >
          <Link
            component={RouterLink}
            color="secondary.main"
            to="/auth/register"
          >
            Create a account
          </Link>
          <Link
            component={RouterLink}
            color="secondary.main"
            to="/auth/forgot-password"
          >
            Forgot pasword?
          </Link>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
