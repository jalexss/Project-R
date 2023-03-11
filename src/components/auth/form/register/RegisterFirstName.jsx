import { TextField } from "@mui/material";
import { firstNameValidations } from "../../../../helpers";

const helperTextMain =
  "First name must be greater than 3. Must be less than 20.";

export const RegisterFirstName = ({
  register,
  errors,
  isActiveAlert,
  setIsActiveAlert,
}) => {
  return (
    <TextField
      label="First name"
      type="text"
      placeholder="What's is your name?"
      fullWidth
      onFocus={() => setIsActiveAlert(false)}
      helperText={
        !!errors?.firstName ? errors.firstName.message : helperTextMain
      }
      error={!!errors?.firstName || isActiveAlert}
      {...register("firstName", firstNameValidations)}
    />
  );
};
