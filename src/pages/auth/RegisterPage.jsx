import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Grid, Button, Link, Alert, CircularProgress } from "@mui/material";

import { AuthLayout } from "../../layouts";
import { useAuthStore } from "../../hooks";
import {
  RegisterConfirmPassword,
  RegisterEmail,
  RegisterFirstName,
  RegisterlastName,
  RegisterPassword,
  RegisterUsername,
} from "../../components/auth";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { startRegister, registerResult } = useAuthStore();
  const { isLoading, isError, error, isSuccess } = registerResult;
  const [isActiveAlert, setIsActiveAlert] = useState(false);

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
        return navigate("/auth/confirmEmail");
      }

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
  }, [isSuccess, isError]);

  // useEffect(() => {
  //   let ignore = false;

  //   if (!ignore) {

  //   }

  //   return () => {
  //     ignore = true;
  //   };
  // }, [isError]);

  return (
    <AuthLayout title="Register">
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
          <RegisterUsername
            errors={errors}
            register={register}
            isActiveAlert={isActiveAlert}
            setIsActiveAlert={setIsActiveAlert}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <RegisterEmail
            errors={errors}
            register={register}
            isActiveAlert={isActiveAlert}
            setIsActiveAlert={setIsActiveAlert}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <RegisterFirstName
            errors={errors}
            register={register}
            isActiveAlert={isActiveAlert}
            setIsActiveAlert={setIsActiveAlert}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <RegisterlastName
            errors={errors}
            register={register}
            isActiveAlert={isActiveAlert}
            setIsActiveAlert={setIsActiveAlert}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <RegisterPassword
            errors={errors}
            register={register}
            isActiveAlert={isActiveAlert}
            setIsActiveAlert={setIsActiveAlert}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <RegisterConfirmPassword
            errors={errors}
            register={register}
            getValues={getValues}
            isActiveAlert={isActiveAlert}
            setIsActiveAlert={setIsActiveAlert}
          />
        </Grid>

        <Grid item xs={12} sx={{ my: 2, position: "relative" }}>
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

        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ mt: 2, mb: 1 }}
        >
          <Link component={RouterLink} color="secondary.main" to="/auth/login">
            Already Account?
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
