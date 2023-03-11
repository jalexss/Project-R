import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Grid, Typography, Stack, Link, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export const UsersInformation = ({ users }) => {
  const {
    usersCount,
    latestUserCreated,
    latestUserUpdated,
    usersBannedCount,
    usersCreatedToday,
  } = users;

  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4">Users</Typography>
      </Grid>
      <Grid item xs={4}>
        <Stack direction="row" spacing={4} sx={{ py: 1, px: 2 }}>
          <PersonIcon />
          <Typography>Count</Typography>
          <Typography>{usersCount}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Stack direction="row" spacing={4} sx={{ py: 1, px: 2 }}>
          <PersonIcon />
          <Typography>Banned count</Typography>
          <Typography>{usersBannedCount}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Stack direction="row" spacing={4} sx={{ py: 1, px: 2 }}>
          <PersonIcon />
          <Typography>Users created today count</Typography>
          <Typography>{usersCreatedToday}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={4} sx={{ py: 1, px: 2 }}>
          <Stack direction="row" spacing={2}>
            <PersonIcon />
            <Typography>Latest user created</Typography>
          </Stack>
          <Stack>
            <Typography>ID: {latestUserCreated._id}</Typography>
            <Typography>Username:{latestUserCreated.username}</Typography>
            <Typography>Role: {latestUserCreated.role}</Typography>
            <Typography>Status: {latestUserCreated.status}</Typography>
            <Typography>
              Created At:{latestUserCreated.createdAt} ago.
            </Typography>
            <Typography>
              Updated At:{latestUserCreated.updatedAt} ago.
            </Typography>
            <Link
              component={RouterLink}
              color="secondary"
              to={`/user/${latestUserCreated.username}/profile`}
            >
              See Profile...
            </Link>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={4} sx={{ py: 1, px: 2 }}>
          <Stack direction="row" spacing={2}>
            <PersonIcon />
            <Typography>Latest user updated:</Typography>
          </Stack>
          <Stack>
            <Typography>ID: {latestUserUpdated._id}</Typography>
            <Typography>Username:{latestUserUpdated.username}</Typography>
            <Typography>Role: {latestUserUpdated.role}</Typography>
            <Typography>Status: {latestUserUpdated.status}</Typography>
            <Typography>
              Created At:{latestUserUpdated.createdAt} ago.
            </Typography>
            <Typography>
              Updated At:{latestUserUpdated.updatedAt} ago.
            </Typography>
            <Link
              component={RouterLink}
              color="secondary"
              to={`/user/${latestUserUpdated.username}/profile`}
            >
              See Profile...
            </Link>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
