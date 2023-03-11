import { Grid, TextField } from "@mui/material"

import { FormLayout } from "../../../layouts";
import { descriptionValidation } from "../../../helpers";

export const DescriptionInput = ({register, errors}) => {
  
  const helperTextMain = "Min 10 characters. Max 255 characters." 
  
  return (
    <FormLayout>
      <Grid item xs={ 12 } sx={{ mt: 2 }} >
        <TextField
            required 
            label="Description"
            rows={2}
            multiline
            type="text"
            placeholder='Why you do this receta?'
            helperText={!!errors?.description ? errors.description.message : helperTextMain}
            error={ !!errors?.description }
            fullWidth
            {...register("description", descriptionValidation)}
        />
      </Grid>
    </FormLayout>
  )
}
