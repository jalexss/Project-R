import { TextField } from "@mui/material";

const helperTextMain = "Copy and paste you password!?.";

export const RegisterConfirmPassword = ({
  errors,
  register,
  getValues,
  isActiveAlert,
  setIsActiveAlert,
}) => {
  const confirmPasswordValidations = {
    required: "confirm your password",
    validate: (value) =>
      value === getValues("password") || "Passwords do not match!.",
  };

  return (
    <TextField
      label="Confirm Password"
      type="password"
      placeholder="Enter your password again!."
      fullWidth
      onFocus={() => setIsActiveAlert(false)}
      helperText={
        !!errors?.confirmPassword
          ? errors.confirmPassword.message
          : helperTextMain
      }
      error={!!errors?.confirmPassword || isActiveAlert}
      {...register("confirmPassword", confirmPasswordValidations)}
    />
  );
};
