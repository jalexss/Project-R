import { TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { minutesValidation } from "../../../helpers";

import { FormLayout } from "../../../layouts";

const helperTextMain = "Expressed in minutes... max 24 hours.";

export const TimeInput = ({ register, errors }) => {
  return (
    <FormLayout>
      <Typography variant="subtitle1" color={grey[700]} sx={{ mb: 1 }}>
        How much time to prepare this receta?
      </Typography>

      <TextField
        required
        label="Minutes"
        type="number"
        placeholder="how long do you prepare it?"
        helperText={!!errors?.minutes ? errors.minutes.message : helperTextMain}
        error={!!errors?.minutes}
        fullWidth
        {...register("minutes", minutesValidation)}
      />
    </FormLayout>
  );
};
