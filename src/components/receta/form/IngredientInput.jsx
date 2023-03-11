import { useFieldArray } from "react-hook-form";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import { FormLayout } from "../../../layouts";
import { ingredientValidation } from "../../../helpers";

export const IngredientInput = ({ control, register, errors }) => {
  const helperTextMain = "Max 50 characters. Min a one ingredient!";

  const { fields, remove, append } = useFieldArray({
    control,
    name: "ingredients",
  });

  const addIngredientInput = () => {
    if (fields.length >= 10) return;

    append([""]);
  };

  return (
    <FormLayout>
      <Grid item xs={11} sx={{ mt: 1 }} flexDirection="wrap">
        <Typography variant="subtitle2" color={grey[600]} sx={{ mb: 1 }}>
          You can write a maximun 10 ingredients!.
        </Typography>
        <Grid item flexGrow={1}>
          {fields.map((field, index) => {
            return (
              <Grid item key={field.id} sx={{ mb: 1 }}>
                <TextField
                  required
                  label="Ingredient"
                  type="text"
                  helperText={
                    !!errors?.ingredients
                      ? errors.ingredients.message
                      : helperTextMain
                  }
                  error={!!errors?.ingredients}
                  {...register(`ingredients.${index}`, ingredientValidation)}
                />

                {index > 0 && (
                  <Button
                    onClick={() => remove(index)}
                    variant="contained"
                    color="error"
                    sx={{ ml: 2, mt: 1 }}
                  >
                    Delete ingredient -
                  </Button>
                )}
              </Grid>
            );
          })}
        </Grid>

        <Button
          disabled={fields.length >= 10}
          onClick={addIngredientInput}
          variant="contained"
          sx={{ ml: 2, mt: 1 }}
        >
          Add ingredient +
        </Button>
      </Grid>
    </FormLayout>
  );
};
