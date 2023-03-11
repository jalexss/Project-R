import { Grid, Typography } from "@mui/material";

export const RecetaIngredients = ({ ingredients }) => {
  if (!ingredients) {
    return <Typography>Is loading...</Typography>;
  }

  return (
    <Grid
      container
      id="ingredientes"
      direction="column"
      sx={{
        width: { lg: "50%", sm: "100%" },
        px: 1,
        pb: 1,
        border: 1,
        borderRadius: "10px",
        borderColor: "secondary.main",
        backgroundColor: "primary.light",
        boxShadow: 2,
      }}
    >
      <Typography variant="ingredient">Ingredients:</Typography>
      {ingredients.map((ingredient, index) => {
        return (
          <Typography
            id={`ingrediente-${index}`}
            align="justify"
            variant="ingredient"
            key={index}
            sx={{
              pl: 1,
              my: 0.5,
              "&:hover": {
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "primary.dark",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            {` * ${ingredient}.`}
          </Typography>
        );
      })}
    </Grid>
  );
};
