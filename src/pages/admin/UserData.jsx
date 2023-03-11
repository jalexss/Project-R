import { Button, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { CreateUser, EditUser } from "../../components/admin";
import { AdminLayout } from "../../layouts";

export const UserData = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => navigate(-1, { state: { userUsername: undefined } })}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <EditUser />
        </Grid>
        <Grid item xs={6}>
          <CreateUser />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};
