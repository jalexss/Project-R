import { Link as RouterLink } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const SideBarListItem = () => {
  //TODO: const SbListItem = ['My recetas', 'My favorites', 'More soon!']

  return (
    <div>
      <Divider />
      <List>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/receta/create">
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Create Receta!" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/myRecetas">
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="My recetas" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="My favorites" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CircleIcon />
            </ListItemIcon>
            <ListItemText primary="More soon!" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};
