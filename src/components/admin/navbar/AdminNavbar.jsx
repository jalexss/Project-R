import { AppBar, Grid, Link, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AdminMenuNavbar, AdminNavGroupButton } from "./";

export const AdminNavbar = () => {
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
          </Grid>

          <AdminNavGroupButton />

          <AdminMenuNavbar />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
