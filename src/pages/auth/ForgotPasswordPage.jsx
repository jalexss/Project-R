import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import { AuthLayout } from "../../layouts";
import { useConfirmResetPasswordMutation } from "../../store/api";
import { RegisterEmail } from "../../components/auth";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [confirmResetPassword, { isLoading, error, isError }] =
    useConfirmResetPasswordMutation();
  const [isActiveAlert, setIsActiveAlert] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = ({ email }) => {
    confirmResetPassword(email)
      .unwrap()
      .then(() => {
        navigate("/auth/confirmEmail");
      })
      .catch(() => {
        reset();
      });
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
    <AuthLayout title="Forgot Password">
      <Grid
        container
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography>Enter your email for check your account!</Typography>
        </Grid>

        {isActiveAlert && (
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Alert severity="error" sx={{ display: "flex" }}>
              {error?.data.msg}
            </Alert>
          </Grid>
        )}

        <Grid item xs={12} sx={{ mt: 1 }}>
          <RegisterEmail
            errors={errors}
            register={register}
            isActiveAlert={isActiveAlert}
            setIsActiveAlert={setIsActiveAlert}
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            fullWidth
          >
            Send
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
          <Link
            component={RouterLink}
            color="secondary.main"
            to="/auth/register"
          >
            Create a account
          </Link>
          <Link component={RouterLink} color="secondary.main" to="/auth/login">
            Go to login
          </Link>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
