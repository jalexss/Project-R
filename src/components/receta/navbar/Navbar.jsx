import { Link as RouterLink } from "react-router-dom";
import { AppBar, Link, Toolbar, Grid, Divider } from "@mui/material";

import { SearchInput } from "../";
import { MenuNavbar, NavGroupButton } from "./";

export const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent={{ xs: "space-between" }}
          spacing={0}
        >
          <Grid
            item
            xs={11}
            sm={9}
            cmd={7}
            md={6}
            lg={5}
            display="flex"
            sx={{
              direction: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Link
              variant="h6"
              component={RouterLink}
              to={"/"}
              color="inherit"
              underline="none"
              sx={{
                display: "block",
                mr: 1,
              }}
            >
              Project-R
            </Link>

            <SearchInput />
          </Grid>

          <NavGroupButton />

          <MenuNavbar />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
