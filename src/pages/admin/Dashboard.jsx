import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  CommentsInformation,
  RecetasInformation,
  UsersInformation,
} from "../../components/admin";
import { AdminLayout } from "../../layouts";
import { useGetDashboardQuery } from "../../store/api";

export const Dashboard = () => {
  const { data, isLoading } = useGetDashboardQuery();
  const navigate = useNavigate();

  console.log(data);

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Typography variant="h4">Loading...</Typography>
      </Grid>
    );
  }

  return (
    <AdminLayout>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" color="secondary">
            Dashboard
          </Typography>{" "}
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup color="secondary" variant="contained">
            <Button onClick={() => navigate("/admin/tables")}>
              All tables
            </Button>
            <Button onClick={() => navigate("/admin/user-data")}>
              Create a user
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: "1rem" }}>
          <UsersInformation users={data.users} />
        </Grid>
        <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: "1rem" }}>
          <RecetasInformation recetas={data.recetas} />
        </Grid>
        <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: "1rem" }}>
          <CommentsInformation comments={data.comments} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};
