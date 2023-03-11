import { Grid, Typography } from "@mui/material";

export const NoComments = () => {
  return (
    <Grid container>
      <Grid item display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h4">0 Comments...</Typography>
        <Typography variant="h4">Why don't you create one?</Typography>
      </Grid>
    </Grid>
  );
};
