import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Avatar,
  avatarGroupClasses,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  useRemoveAvatarMutation,
  useUploadAvatarMutation,
} from "../../../store/api";
import { useAuthStore } from "../../../hooks";

export const UploadAvatar = () => {
  const [avatar, setAvatar] = useState("");
  const [backendMessage, setBackendMessage] = useState({
    successfully: "",
    error: "",
  });
  const [uploadAvatar, uploadStatus] = useUploadAvatarMutation();
  const [removeAvatar, removeStatus] = useRemoveAvatarMutation();
  const { user, userIsLoading, onLoadUser } = useAuthStore();
  const avatarRef = useRef(null);

  const onAvatarChange = ({ target: { files } }) => {
    if (files.length === 0 || files.length > 1) return;

    const avatarData = new FormData();
    avatarData.append("avatar", files[0]);

    uploadAvatar({
      userId: user.id,
      avatar: avatarData,
    })
      .unwrap()
      .then(({ msg }) => {
        onLoadUser();
        setBackendMessage({
          successfully: msg,
          error: "",
        });
        setAvatar(URL.createObjectURL(files[0]));
      })
      .catch(({ data }) => {
        setBackendMessage({ successfully: "", error: data.msg });
      });
  };

  const onDeleteAvatar = () => {
    removeAvatar({ userId: user.id })
      .unwrap()
      .then(({ data }) => {
        onLoadUser();
        setBackendMessage({
          successfully: data.msg,
          error: "",
        });
        setAvatar("");
      })
      .catch(({ data }) => {
        setBackendMessage({ successfully: "", error: data.msg });
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
  }, [user]);

  return (
    <Grid
      item
      xs={12}
      sm={7}
      md={8}
      lg={5}
      width="100%"
      height="auto"
      sx={{ pb: 2, boxShadow: 1, borderRadius: "10px" }}
    >
      {userIsLoading ? (
        <Typography>Loading... avatar</Typography>
      ) : (
        <>
          <Box
            id="envoltorio"
            display="flex"
            flexDirection={{ xs: "column", lg: "row" }}
            justifyContent={{ xs: "center", lg: "initial" }}
          >
            <Avatar
              id="imagen"
              display={
                uploadStatus.isLoading || removeStatus.isLoading
                  ? "none"
                  : "flex"
              }
              sx={{
                mr: { lg: 3 },
                margin: { xs: "auto" },
                width: 200,
                height: 200,
                borderRadius: "10px",
              }}
              src={avatar}
            />
            <Box
              id="alerts-buttons"
              width="100%"
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              sx={{ mr: 2 }}
            >
              <Box id="alerts">
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
              </Box>
              <Stack
                spacing={2}
                justifyContent="center"
                width="100%"
                direction="row"
                alignItems="flex-end"
              >
                <Button
                  disabled={uploadStatus.isLoading || removeStatus.isLoading}
                  variant="contained"
                  endIcon={<PhotoCamera />}
                  onClick={() => avatarRef.current.click()}
                >
                  upload
                </Button>
                <Button
                  disabled={uploadStatus.isLoading || removeStatus.isLoading}
                  variant="contained"
                  color="error"
                  endIcon={<PhotoCamera />}
                  onClick={onDeleteAvatar}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          </Box>

          <input
            hidden
            type="file"
            accept="image/png, image/jpeg"
            name="avatar"
            onChange={(e) => onAvatarChange(e)}
            ref={avatarRef}
          />
        </>
      )}
    </Grid>
  );
};
