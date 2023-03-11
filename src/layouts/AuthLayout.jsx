import { Divider, Grid, Typography } from "@mui/material";

export const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      direction="column"
      sx={{ minHeight: "100vh", backgroundColor: "primary.dark", padding: 4 }}
    >
      <Grid
        item
        xs={3}
        sx={{
          width: { sm: 500 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>

        <Divider variant="fullWidth" />

        {children}
      </Grid>
    </Grid>
  );
};
