import { Grid } from "@mui/material";
import { RecetaLayout } from "../../layouts";

import {
  ChangeFirstName,
  ChangeLastName,
  ChangePassword,
  ChangeUsername,
  UploadAvatar,
} from "../../components/user";

export const SettingsPage = () => {
  return (
    <RecetaLayout>
      <Grid
        container
        justifyContent={{ xs: "center", md: "space-evenly" }}
        spacing={2}
      >
        <UploadAvatar />
        <ChangeUsername />
        <ChangeFirstName />
        <ChangeLastName />
        <ChangePassword />
      </Grid>
    </RecetaLayout>
  );
};
