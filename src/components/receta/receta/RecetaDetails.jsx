import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Stack,
  Avatar,
  Typography,
  Box,
  Link,
  Rating,
} from "@mui/material";
import { useEffect, useState } from "react";

export const RecetaDetails = ({
  usuario: user,
  average = 0,
  rating = 0,
  minutes = 1,
  createdAt,
  updatedAt,
}) => {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    let ignore = false;
    let userAvatar = "";
    let avatarUrl = "";

    if (!ignore) {
      if (user) {
        userAvatar = user.avatar;
        avatarUrl = userAvatar
          ? `${process.env.REACT_APP_API_URL_STORAGE}/${userAvatar}`
          : "";
        setAvatar(avatarUrl);
      }
    }
    return () => {
      ignore = true;
    };
  }, []);

  if (!user) {
    return <Typography>Is loading...</Typography>;
  }

  return (
    <Grid
      container
      id="tiempo-ultimaActualizacion-estrellas"
      direction={{ lg: "row", sm: "column", xs: "column" }}
      justifyContent={{ lg: "space-around", ms: "center", xs: "center" }}
      sx={{
        display: "flex",
        width: { sm: "100%", lg: "75%", xs: "100%" },
        backgroundColor: "primary.light",
        boxShadow: 2,
        border: 1,
        borderRadius: "10px",
        borderColor: "secondary.main",
        py: 2,
        px: 1,
        my: 3,
      }}
    >
      <Stack
        direction={{ lg: "row", sm: "column" }}
        alignItems="center"
        spacing={2}
      >
        <Avatar src={avatar} sx={{ width: 67, height: 67 }} />
        <Typography
          variant="customCursive"
          sx={{
            fontSize: "1.25em",
          }}
        >
          created by...
          <Link
            component={RouterLink}
            underline="hover"
            variant="subtitle1"
            color="secondary.dark"
            to={`/user/${user.username}/profile`}
            sx={{ ml: 1 }}
            state={user.username}
          >
            {user.username}
          </Link>
        </Typography>
      </Stack>

      <Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Typography>Rate:</Typography>
          <Rating name="read-only" precision={0.5} value={average} readOnly />
          <Typography>{rating} stars</Typography>
        </Stack>
        <Stack
          direction={{ xs: "column" }}
          justifyContent={{ xs: "center" }}
          alignItems={{ xs: "center" }}
        >
          <Typography>preparation time: {minutes} min.</Typography>
          <Typography>last updated {updatedAt}</Typography>
          <Typography>created at {createdAt}</Typography>
        </Stack>
      </Box>
    </Grid>
  );
};
