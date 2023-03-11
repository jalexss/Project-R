import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { usernameValidations } from "../../../helpers/AuthValidations";
import { useAuthStore } from "../../../hooks";
import { useUpdateUserMutation } from "../../../store/api";

export const ChangeUsername = () => {
  const { user, onLoadUser, userIsLoading } = useAuthStore();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [backendMessage, setBackendMessage] = useState({
    successfully: "",
    error: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const helperTextMain =
    "Username must be greater than 3. Must be less than 20.";

  const onSubmit = (data) => {
    updateUser({ userId: user.id, data: { username: data.username } })
      .unwrap()
      .then(({ msg }) => {
        onLoadUser();
        reset({ username: "", actuallyUsername: data.username });
        setBackendMessage({ successfully: msg, error: "" });
      })
      .catch(({ data }) => {
        setBackendMessage({ successfully: "", error: data.msg });
      });
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (user) {
        reset({ actuallyUsername: user.username });
      }
    }

    return () => {
      ignore = true;
    };
  }, [user]);

  return (
    <Grid item xs={11} lg={4} sx={{ boxShadow: 1, borderRadius: "1em" }}>
      {userIsLoading ? (
        <Typography>Is loading... username</Typography>
      ) : (
        <>
          <Grid
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            container
            // display="flex"
            direction="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12}>
              <Typography variant="h6">Change username</Typography>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <TextField
                    disabled
                    label="actually username"
                    {...register("actuallyUsername")}
                    helperText={
                      !!errors?.username
                        ? errors.username.message
                        : helperTextMain
                    }
                  />
                  <TextField
                    label="new Username"
                    type="text"
                    helperText={
                      !!errors?.username
                        ? errors.username.message
                        : helperTextMain
                    }
                    error={!!errors?.username}
                    {...register("username", usernameValidations)}
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
