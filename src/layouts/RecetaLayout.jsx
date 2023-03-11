import { useState } from "react";

import {
  Container,
  Toolbar,
  Grid,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

// import FavoriteIcon from "@mui/icons-material/Favorite";
// import StarIcon from "@mui/icons-material/Star";
// import AddIcon from "@mui/icons-material/Add";

import { CustomBottomNav, Navbar } from "../components";

export const RecetaLayout = ({ children }) => {
  // return (
  //   <Grid sx={{ display: 'flex' }} >

  //     <Navbar
  //       openUi={ openUi }
  //       setOpenUi={ setOpenUi }
  //     />

  //     <SideBar
  //       openUi={ openUi }
  //       setOpenUi={ setOpenUi }
  //       drawerWidth = { 240 }

  //     />

  //     <Container
  //       component="main"
  //       sx={{
  //         flexGrow: 12,
  //         height: '100vh',
  //         overflow: 'auto',
  //       }}
  //     >
  //       <Toolbar sx={{ mt: 1 }} />
  //       { children }
  //     </Container>

  //   </Grid>
  // )
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      {/* <Grid
        container
        justifyContent="space-between"
        direction="row"
        spacing={1}
      > */}
      {/* <SideBar openUi={openUi} setOpenUi={setOpenUi} drawerWidth={240} /> */}
      <main
        style={{
          margin: "88px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        {children}
      </main>

      <CustomBottomNav />
      {/* </Grid> */}
    </>
  );
};
