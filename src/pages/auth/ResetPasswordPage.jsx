import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import {
  RegisterConfirmPassword,
  RegisterPassword,
} from "../../components/auth";
import { AuthLayout } from "../../layouts";
import {
  useCheckResetPasswordCodeMutation,
  useResetPasswordMutation,
} from "../../store/api";

export const ResetPasswordPage = () => {
  const [queryParameters] = useSearchParams();
  const [checkCode] = useCheckResetPasswordCodeMutation();
  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation();
  const [isValidCode, setIsValidCode] = useState(false);
  const [isActiveAlert, setIsActiveAlert] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = ({ password }) => {
    resetPassword({ resetPasswordCode: queryParameters.get("token"), password })
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      checkCode(queryParameters.get("token"))
        .unwrap()
        .then(() => setIsValidCode(true))
        .catch(() => setIsValidCode(false));
    }

    return () => {
      ignore = true;
    };
  }, []);

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

  if (resetStatus.isSuccess) {
    return (
      <AuthLayout title="Reset Password">
        <Grid container>
          <Grid item xs={12}>
            <Typography>
              Reset password succesfully!. Please go to login
            </Typography>
          </Grid>
          <Grid
            item
            display="flex"
            justifyContent="flex-end"
            xs={12}
            sx={{ mt: 2, mb: 1 }}
          >
            <Link
              component={RouterLink}
              color="secondary.main"
              to="/auth/login"
            >
              Go to Login
            </Link>
          </Grid>
        </Grid>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset Password">
      {!isValidCode ? (
        <Grid container direction="row">
          <Grid item xs={12}>
            <Typography>Error with request. Please, try again.</Typography>
          </Grid>
          <Grid
            item
            display="flex"
            justifyContent="space-between"
            xs={12}
            sx={{ mt: 2, mb: 1 }}
          >
            <Link
              component={RouterLink}
              color="secondary.main"
              to="/auth/login"
            >
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
      ) : (
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
            <RegisterConfirmPassword
              errors={errors}
              register={register}
              isActiveAlert={isActiveAlert}
              setIsActiveAlert={setIsActiveAlert}
              getValues={getValues}
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
          <Button disabled={isLoading} type="submit" variant="contained">
            Save
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
      )}
    </AuthLayout>
  );
};
