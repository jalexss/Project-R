import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import {
  useSearchRecetaMutation,
  useSearchUserMutation,
} from "../../../store/api";
import { useState } from "react";

export const SearchInput = () => {
  const [searchUser] = useSearchUserMutation();
  const [searchReceta] = useSearchRecetaMutation();
  const [userFounded, setUserFounded] = useState(false);
  const [recetaFounded, setRecetaFounded] = useState(false);

  const searchInputChange = (event) => {
    const { value } = event.target;
    console.log("value antes de buscar", value);

    if (!value) return setUserFounded(false);

    searchUser(value)
      .unwrap()
      .then((fulfilled) => {
        setUserFounded(fulfilled);
      });
    searchReceta(value)
      .unwrap()
      .then((fulfilled) => {
        setRecetaFounded(fulfilled);
      });
  };

  return (
    <Grid container direction="column">
      <Grid
        item
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          // display: "flex",
          p: "2px 4px",
          width: "70%",
          minWidth: "275px",
          maxWidth: "327px",
          border: 1,
          borderRadius: "10px",
        }}
      >
        <InputBase
          color="inherit"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ "aria-label": "Search" }}
          onChange={searchInputChange}
        />
        <IconButton sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Grid>
      <Paper
        elevation={10}
        sx={{
          position: "absolute",
        }}
      >
        {userFounded &&
          userFounded.map((user) => (
            <List key={user.username}>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar src={user.username} />
                  </ListItemIcon>
                  <ListItemText
                    primary={user.username}
                    secondary={user.createdAt}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          ))}
        <Divider />
        {recetaFounded &&
          recetaFounded.map((receta) => (
            <List key={receta._id}>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar src={receta.title} />
                  </ListItemIcon>
                  <ListItemText
                    primary={receta.title}
                    secondary={receta.createdAt}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          ))}
      </Paper>
    </Grid>
  );
};
