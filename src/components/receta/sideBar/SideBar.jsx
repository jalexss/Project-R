import { Box, Drawer, Toolbar } from "@mui/material";

import { SideBarListItem } from "./SideBarListItem";

export const SideBar = ({ openUi, setOpenUi, drawerWidth = 240 }) => {
  const { drawerOpen } = openUi;

  const handleDrawerToggle = () => {
    setOpenUi({ ...openUi, drawerOpen: !drawerOpen });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            boxShadow: 2,
            display: { xs: "block", lg: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar />
          <SideBarListItem />
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: { lg: "block", xs: "none", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <SideBarListItem />
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};
