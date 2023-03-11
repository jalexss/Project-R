import { TextField } from "@mui/material";
import { usernameLoginValidations } from "../../../../helpers/AuthValidations";

export const LoginUsername = ({
  errors,
  register,
  isActiveAlert,
  setIsActiveAlert,
}) => {
  const helperTextMain = "Enter a username";

  return (
    <TextField
      required
      label="Username"
      type="text"
      placeholder="Enter your cool name!"
      fullWidth
      onFocus={() => setIsActiveAlert(false)}
      helperText={
        !!errors?.username ? errors.username.message : helperTextMain.username
      }
      error={!!errors?.username || isActiveAlert}
      {...register("username", usernameLoginValidations)}
    />
  );
};
