import { TextField } from "@mui/material";
import { emailValidations } from "../../../../helpers";

const helperTextMain = "Email is required.";

export const RegisterEmail = ({
  errors,
  register,
  isActiveAlert,
  setIsActiveAlert,
}) => {
  return (
    <TextField
      label="Email"
      type="email"
      placeholder="Nami@example.com"
      fullWidth
      onFocus={() => setIsActiveAlert(false)}
      helperText={!!errors?.email ? errors.email.message : helperTextMain}
      error={!!errors?.email || isActiveAlert}
      {...register("email", emailValidations)}
    />
  );
};
