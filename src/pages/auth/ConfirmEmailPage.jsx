import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Grid, Typography, Link } from "@mui/material";

import { AuthLayout } from "../../layouts";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useEffect } from "react";

export const ConfirmEmailPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (user?.status === "active") {
        return navigate("/", { replace: true });
      }
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <AuthLayout title="Confirm Email">
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="text">
            Please Go to check your email for the activation of your account!.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          sx={{ mt: 2, mb: 1 }}
        >
          <Link component={RouterLink} color="secondary.main" to="/auth/login">
            Go to Log in!
          </Link>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
