import { Stack } from "@mui/material";
import { RecetaDescription } from "./RecetaDescription";
import { RecetaIngredients } from "./RecetaIngredients";
import { RecetaInstruction } from "./RecetaInstruction";

export const RecetaInformation = ({
  ingredients,
  description,
  instruction,
}) => {
  return (
    <Stack
      direction={{ lg: "row", sm: "column" }}
      justifyContent={{ lg: "space-between", sm: "center" }}
      sx={{ mb: 1 }}
    >
      <RecetaIngredients ingredients={ingredients} />

      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          width: { lg: "50%", sm: "100%" },
          py: 1,
          px: 1,
        }}
      >
        <RecetaDescription description={description} />

        <RecetaInstruction instruction={instruction} />
      </Stack>
    </Stack>
  );
};
