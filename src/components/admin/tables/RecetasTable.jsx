import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Avatar, Button, Grid, Link, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteRecetaButton } from "../button";

let avatarUrl = `${process.env.REACT_APP_API_URL}/storage`;

export const RecetasTable = ({ recetasStatus }) => {
  const { data, isLoading } = recetasStatus;
  const [recetas, setRecetas] = useState([]);

  const rows = recetas.map((receta) => ({
    id: receta._id,
    title: receta.title,
    images: receta.images.length,
    ingredients: receta.ingredients.length,
    user: {
      ...receta.usuario,
      avatar: receta.usuario.avatar
        ? `${avatarUrl}/${receta.usuario.avatar}`
        : "",
    },
    createdAt: receta.createdAt,
    updatedAt: receta.updatedAt,
  }));

  const columns = [
    { field: "id", headerName: "Id", width: 300 },
    {
      field: "user",
      headerName: "Created By",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Link
            component={RouterLink}
            to={`/user/${row.user.username}/profile`}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={row.user.avatar} />
              <Typography>{row.user.username}</Typography>
            </Stack>
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 200,
      renderCell: ({ row }) => {
        return (
          <DeleteRecetaButton
            recetaId={row.id}
            recetas={recetas}
            setRecetas={setRecetas}
          />
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Link
            noWrap
            color="secondary"
            component={RouterLink}
            to={`/receta/${row.id}`}
          >
            {row.title}
          </Link>
        );
      },
    },
    { field: "images", headerName: "Images Count", width: 300 },
    { field: "ingredients", headerName: "Ingredients Count", width: 300 },
    { field: "createdAt", headerName: "Created At", width: 300 },
    { field: "updatedAt", headerName: "Updated At", width: 300 },
  ];

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (data) {
        setRecetas(data.recetas);
      }
    }

    return () => {
      ignore = true;
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <Grid container height="30rem">
        <Typography>Receta is loading...</Typography>
      </Grid>
    );
  }

  return (
    <Grid container height="30rem">
      <DataGrid
        id="Recetas-table"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Grid>
  );
};
