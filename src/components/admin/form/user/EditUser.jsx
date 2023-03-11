import { CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetUsersMutation } from "../../../../store/api";
import {
  UserAvatar,
  UserEmail,
  UserFirstName,
  UserLastName,
  UserResetPassword,
  UserUsername,
} from "./";

export const EditUser = () => {
  const location = useLocation();
  const [user, setUser] = useState(undefined);
  const [getUsers, { isLoading }] = useGetUsersMutation();

  console.log(user);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (location.state) {
        const { userUsername } = location.state;

        getUsers(userUsername)
          .unwrap()
          .then(({ usuarios: userDB }) => {
            setUser(userDB);
          })
          .catch(() => {
            setUser(undefined);
          });
      }
    }
    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading) {
    return (
      <Grid container spacing={2} sx={{ boxShadow: 1, borderRadius: "1rem" }}>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="secondary" />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} sx={{ boxShadow: 1, borderRadius: "1rem" }}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h4">
          Editing user - ID: {user ? user._id : ""}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <UserAvatar user={user} setUser={setUser} />
      </Grid>
      <Grid item xs={12}>
        <UserUsername user={user} setUser={setUser} />
      </Grid>
      <Grid item xs={12}>
        <UserFirstName user={user} setUser={setUser} />
      </Grid>
      <Grid item xs={12}>
        <UserLastName user={user} setUser={setUser} />
      </Grid>
      <Grid item xs={12}>
        <UserEmail user={user} setUser={setUser} />
      </Grid>
      <Grid item xs={12}>
        <UserResetPassword user={user} />
      </Grid>
    </Grid>
  );
};
