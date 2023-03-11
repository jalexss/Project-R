import { TextField } from "@mui/material";
import { lastNameValidations } from "../../../../helpers";

const helperTextMain =
  "Last name must be greater than 3. Must be less than 20.";

export const RegisterlastName = ({
  register,
  errors,
  isActiveAlert,
  setIsActiveAlert,
}) => {
  return (
    <TextField
      label="Last name"
      type="text"
      placeholder="What's is your last name?"
      fullWidth
      onFocus={() => setIsActiveAlert(false)}
      helperText={!!errors?.lastName ? errors.lastName.message : helperTextMain}
      error={!!errors?.lastName || isActiveAlert}
      {...register("lastName", lastNameValidations)}
    />
  );
};
