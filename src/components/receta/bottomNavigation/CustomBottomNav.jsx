import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";

export const CustomBottomNav = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{
        display: { md: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="New Receta" icon={<AddIcon />} />
        <BottomNavigationAction
          path="/myRecetas"
          label="My recetas"
          icon={<StarIcon />}
        />
        <BottomNavigationAction label="My favorites" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Paper>
  );
};
