import { useEffect, useState } from "react";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Grid, Typography, Link } from "@mui/material";
import { AuthLayout } from "../../layouts";
import { useAuthStore } from "../../hooks";
import { useCheckConfirmationCodeMutation } from "../../store/api";

export const ConfirmedAccount = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [checkCode] = useCheckConfirmationCodeMutation();
  const [queryParameters] = useSearchParams();
  const [isValidCode, setIsValidCode] = useState(false);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (user?.status === "active") {
        return navigate("/", { replace: true });
      }
      checkCode(queryParameters.get("token"))
        .unwrap()
        .then(() => setIsValidCode(true))
        .catch(() => setIsValidCode(false));
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <AuthLayout title="Confirmed Account">
      <Grid container>
        {isValidCode ? (
          <Grid item xs={12} sx={{ my: 2 }}>
            <Typography>
              Your account has been activated successfully!
            </Typography>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ my: 2 }}>
            <Typography>Token has expired or is invalid. Try again!</Typography>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="flex-end"
          sx={{ mb: 1, mt: 2 }}
        >
          <Link component={RouterLink} color="secondary" to="/auth/login">
            Go to Log in!
          </Link>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
