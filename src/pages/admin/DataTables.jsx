import { Button, ButtonGroup, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommentsTable,
  RecetasTable,
  UsersTable,
} from "../../components/admin";
import { AdminLayout } from "../../layouts";
import {
  useGetCommentsMutation,
  useGetRecetasMutation,
  useGetUsersMutation,
} from "../../store/api";

export const DataTables = () => {
  const navigate = useNavigate();
  const [getComments, commentsStatus] = useGetCommentsMutation();
  const [getRecetas, recetasStatus] = useGetRecetasMutation();
  const [getUsers, usersStatus] = useGetUsersMutation();
  const [table, setTable] = useState({
    users: true,
    recetas: false,
    comments: false,
  });
  // console.log(commentsStatus);
  // console.log(table);

  const onLoadTable = (loadTable = "all") => {
    if (loadTable === "all") {
      return setTable({ users: true, recetas: true, comments: true });
    }
    if (loadTable === "recetas") {
      return setTable({ users: false, recetas: true, comments: false });
    }
    if (loadTable === "users") {
      return setTable({ users: true, recetas: false, comments: false });
    }
    if (loadTable === "comments") {
      return setTable({ users: false, recetas: false, comments: true });
    }
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (table.users) {
        getUsers();
      }
      if (table.recetas) {
        getRecetas(0);
      }
      if (table.comments) {
        getComments();
      }
    }
    return () => {
      ignore = true;
    };
  }, [table]);

  return (
    <AdminLayout>
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Grid>
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="center"
          xs={8}
        >
          <ButtonGroup
            variant="outlined"
            color="secondary"
            aria-label="outlined button group"
          >
            <Button onClick={() => onLoadTable("users")}>Users</Button>
            <Button onClick={() => onLoadTable("recetas")}>Recetas</Button>
            <Button onClick={() => onLoadTable("comments")}>Comments</Button>
            <Button onClick={() => onLoadTable("all")}>All</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          {table.users && (
            <UsersTable getUsers={getUsers} usersStatus={usersStatus} />
          )}
        </Grid>
        <Grid item xs={12}>
          {table.recetas && (
            <RecetasTable
              getRecetas={getRecetas}
              recetasStatus={recetasStatus}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {table.comments && (
            <CommentsTable
              getComments={getComments}
              commentsStatus={commentsStatus}
            />
          )}
        </Grid>
      </Grid>
    </AdminLayout>
  );
};
