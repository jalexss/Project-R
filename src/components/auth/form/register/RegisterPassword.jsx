import { TextField } from "@mui/material";
import { passwordValidations } from "../../../../helpers";

const helperTextMain = "Password Should be an Uppercase letter and a number";

export const RegisterPassword = ({
  errors,
  register,
  isActiveAlert,
  setIsActiveAlert,
}) => {
  return (
    <TextField
      label="Password"
      type="password"
      placeholder="You should use a good password!."
      fullWidth
      onFocus={() => setIsActiveAlert(false)}
      helperText={!!errors?.password ? errors.password.message : helperTextMain}
      error={!!errors?.password || isActiveAlert}
      {...register("password", passwordValidations)}
    />
  );
};
