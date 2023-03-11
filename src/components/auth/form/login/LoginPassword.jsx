import { TextField } from "@mui/material";
import { passwordLoginValidations } from "../../../../helpers";

export const LoginPassword = ({
  register,
  errors,
  isActiveAlert,
  setIsActiveAlert,
}) => {
  const helperTextMain = "Enter a password";

  return (
    <TextField
      required
      label="Password"
      type="password"
      placeholder="password"
      fullWidth
      onFocus={() => setIsActiveAlert(false)}
      helperText={
        !!errors?.password ? errors.password.message : helperTextMain.password
      }
      error={!!errors?.password || isActiveAlert}
      {...register("password", passwordLoginValidations)}
    />
  );
};
