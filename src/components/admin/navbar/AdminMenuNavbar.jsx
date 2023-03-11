import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Grid,
  Menu,
  MenuItem,
  IconButton,
  Stack,
  Typography,
  Avatar,
  Divider,
  Drawer,
  Box,
  MenuList,
  Link,
  Paper,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";

import { useAuthStore } from "../../../hooks/useAuthStore";

export const AdminMenuNavbar = () => {
  const { user, startLogout } = useAuthStore();
  const userAvatar = user?.avatar;
  let avatarUrl = `${process.env.REACT_APP_API_URL}/storage/${userAvatar}`;

  if (!userAvatar) {
    avatarUrl = "";
  }
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const open = Boolean(openMenu);

  const onOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const onClickUserMenu = (path) => {
    navigate(path);
    setOpenMenu(null);
  };

  return (
    <Grid item xs={1} lg={3}>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
      >
        {user && (
          <IconButton onClick={onOpenMenu}>
            <Avatar
              sx={{ width: 40, height: 40 }}
              alt={user.username}
              src={avatarUrl}
            />
          </IconButton>
        )}
      </Stack>
      <Menu
        anchorEl={openMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={onClickUserMenu}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "primary.main",
          },
        }}
      >
        <Box
          width="300px"
          sx={{
            my: 1,
            mx: 1,
          }}
        >
          <Paper
            width="100%"
            elevation={3}
            sx={{
              mx: 2,
              my: 2,
              px: 1,
              py: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt={user ? user?.username : ""}
              src={user ? avatarUrl : ""}
            />
            <Typography sx={{ mt: 1 }}>{user ? user.username : ""}</Typography>
            <Typography sx={{ mb: 1 }}>{user ? user.email : ""}</Typography>
            {user && (
              <Link
                variant="body"
                component={RouterLink}
                to={"/user/myProfile"}
                state={user.username}
                color="secondary"
                sx={{
                  display: "block",
                  mr: 1,
                }}
              >
                See my profile
              </Link>
            )}
          </Paper>
          <MenuItem onClick={() => onClickUserMenu("/user/settings")}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => onClickUserMenu("/support")}>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText>Support</ListItemText>
          </MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={startLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem>
        </Box>
      </Menu>
    </Grid>
  );
};
