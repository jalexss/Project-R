import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  breakpoints: {
    keys: [
      "xs",
      "sm",
      //"cmd", //cmd -> custom medium
      "md",
      "lg",
      "xl",
      //"clg", // clg -> custo large
    ],
    values: {
      xs: 0,
      sm: 600,
      //cmd: 750,
      md: 900,
      lg: 1200,
      xl: 1536,
      //clg: 1050,
    },
  },
  palette: {
    mode: "light",
    background: {
      default: "#fff",
    },
    primary: {
      main: "#e8c39e",
    },
    secondary: {
      main: "#9c27b0",
    },
    error: {
      main: red.A400,
    },
    colorGrey: {
      main: "#e0e0e0",
    },
  },
  typography: {
    customCursive: {
      fontFamily: "Shadows Into Light",
    },
    titleReceta: {
      color: "#D426BD",
      fontFamily: "Shadows Into Light",
      fontSize: "3rem",
      lineHeight: 1.1,
    },
    titleRecetaCard: {
      fontSize: "1.25rem",
      lineHeight: 1.1,
    },
    ingredient: {
      //color: '#D64B36',
      fontFamily: "Dancing Script",
      fontSize: "1.75rem",
    },
  },
});
