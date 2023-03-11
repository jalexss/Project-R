import { Link as RouterLink, useLocation } from "react-router-dom";
import { Button, Grid, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const AdminNavGroupButton = () => {
  const { pathname } = useLocation();

  return (
    <Grid
      item
      xs={0}
      md={4}
      lg={4}
      sx={{
        justifyContent: "center",
        alignItems: "stretch",
        display: { xs: "none", md: "flex" },
        width: "100%",
      }}
    >
      <Button
        component={RouterLink}
        to="/"
        color={pathname === "/" ? "secondary" : "inherit"}
        sx={{ alignItems: "center" }}
      >
        <Tooltip title="Home" arrow>
          <HomeIcon fontSize="large" />
        </Tooltip>
      </Button>
      <Button
        component={RouterLink}
        to="/receta/create"
        color={pathname === "/receta/create" ? "secondary" : "inherit"}
      >
        <Tooltip title="New receta" arrow>
          <AddIcon fontSize="large" />
        </Tooltip>
      </Button>
      <Button
        component={RouterLink}
        to="/myRecetas"
        color={pathname === "/myRecetas" ? "secondary" : "inherit"}
      >
        <Tooltip title="My Recetas" arrow>
          <StarIcon fontSize="large" />
        </Tooltip>
      </Button>
      <Button
        component={RouterLink}
        to="/myFavorites"
        color={pathname === "/myFavorites" ? "secondary" : "inherit"}
      >
        <Tooltip title="My Favorites" arrow>
          <FavoriteIcon fontSize="large" />
        </Tooltip>
      </Button>
    </Grid>
  );
};
