import { Grid, TextField } from "@mui/material"

import { FormLayout } from "../../../layouts";
import { instructionValidation } from "../../../helpers";

export const InstructionInput = ({ register, errors }) => {

  const helperTextMain = "Min 10 characters" 

  return (
    <FormLayout>
      <Grid item xs={ 12 } sx={{ mt: 2 }} >
        <TextField 
          label="Instruction"
          type="text"
          multiline
          rows={4}
          placeholder='Write the step by step of you receta!'
          helperText={!!errors?.instruction ? errors.instruction.message : helperTextMain}
          error={ !!errors?.instruction }
          fullWidth
          {...register("instruction", instructionValidation)}
        />
      </Grid>
    </FormLayout>
  )
}

