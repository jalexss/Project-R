import { TextField } from "@mui/material";
import { usernameValidations } from "../../../../helpers";

const helperTextMain = "Username must be greater than 3. Must be less than 20.";

export const RegisterUsername = ({
  register,
  errors,
  isActiveAlert,
  setIsActiveAlert,
}) => {
  return (
    <TextField
      label="Username"
      type="text"
      placeholder="Enter your cool username!."
      fullWidth
      onFocus={() => setIsActiveAlert(false)}
      helperText={!!errors?.username ? errors.username.message : helperTextMain}
      error={!!errors?.username || isActiveAlert}
      {...register("username", usernameValidations)}
    />
  );
};
