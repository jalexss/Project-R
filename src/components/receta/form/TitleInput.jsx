import { TextField } from "@mui/material"

import { FormLayout } from "../../../layouts";
import { titleValidation } from "../../../helpers";


export const TitleInput = ({ register, errors }) => {

  const helperTextMain = "Min 10 characters. Max 70 characters."

  return (
    <FormLayout>
      <TextField
        required 
        label="Title"
        type="text"
        placeholder='Write a nice title for you receta!'
        helperText={!!errors?.title ? errors.title.message : helperTextMain} 
        error={ !!errors?.title }
        fullWidth
        {...register('title', titleValidation)}
      />
    </FormLayout>
  )
}

