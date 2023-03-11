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
import { lastNameValidations } from "../../../helpers/AuthValidations";
import { useAuthStore } from "../../../hooks";
import { useUpdateUserMutation } from "../../../store/api";

export const ChangeLastName = () => {
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
    "Last Name must be greater than 3. Must be less than 20.";

  const onSubmit = (data) => {
    updateUser({ userId: user.id, data: { lastName: data.lastName } })
      .unwrap()
      .then(({ msg }) => {
        onLoadUser();
        reset({ lastName: "" });
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
        reset({ actuallyLastName: user.lastName });
      }
    }

    return () => {
      ignore = true;
    };
  }, [user]);

  return (
    <Grid item xs={11} lg={4} sx={{ boxShadow: 1, borderRadius: "1em" }}>
      {userIsLoading ? (
        <Typography>Is loading... last name</Typography>
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
              <Typography variant="h6">Change Last name</Typography>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <TextField
                    disabled
                    label="actually Last name"
                    {...register("actuallyLastName")}
                    helperText={helperTextMain}
                  />
                  <TextField
                    label="new Last name"
                    type="text"
                    helperText={
                      !!errors?.lastName
                        ? errors.lastName.message
                        : helperTextMain
                    }
                    error={!!errors?.lastName}
                    {...register("lastName", lastNameValidations)}
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
