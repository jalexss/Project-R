import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRemoveAvatarMutation } from "../../../../store/api";

export const UserAvatar = ({ user, setUser }) => {
  // const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [avatar, setAvatar] = useState("");
  const [removeAvatar, { isLoading }] = useRemoveAvatarMutation();

  const onDelete = () => {
    console.log("DELETE");
    removeAvatar({ userId: user._id })
      .unwrap()
      .then(() => {
        setUser({ ...user, avatar: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  return (
    <Grid container>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography component="h1" variant="h6">
            {" "}
            avatar
          </Typography>
          <Avatar
            src={user ? avatar : ""}
            sx={{
              width: "12rem",
              height: "12rem",
              borderRadius: "10px",
            }}
          />
          <Button
            disabled={user && avatar ? false : true}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            fullWidth
          >
            Delete
          </Button>
        </>
      )}
    </Grid>
  );
};
