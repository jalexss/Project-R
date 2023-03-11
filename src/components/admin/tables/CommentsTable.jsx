import { useEffect, useState } from "react";
import { Avatar, Grid, Link, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
import { DeleteCommentButton } from "../button";

let avatarUrl = `${process.env.REACT_APP_API_URL}/storage`;

export const CommentsTable = ({ commentsStatus }) => {
  const { data, isLoading } = commentsStatus;
  const [comments, setComments] = useState([]);

  const columns = [
    { field: "id", headerName: "Id", width: 300 },
    {
      field: "delete",
      headerName: "Delete",
      width: 200,
      renderCell: ({ row }) => {
        return (
          <DeleteCommentButton
            commentId={row.id}
            comments={comments}
            setComments={setComments}
          />
        );
      },
    },
    {
      field: "receta",
      headerName: "Receta ID",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Link
            color="secondary"
            component={RouterLink}
            to={`/receta/${row.id}`}
          >
            {row.receta}
          </Link>
        );
      },
    },
    {
      field: "text",
      headerName: "text",
      width: 300,
      renderCell: ({ row }) => {
        return <Typography noWrap>{row.text}</Typography>;
      },
    },
    {
      field: "user",
      headerName: "Created By",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Link
            component={RouterLink}
            to={`/receta/${row.user.username}/profile`}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={row.user.avatar} />
              <Typography>{row.user.username}</Typography>
            </Stack>
          </Link>
        );
      },
    },
    { field: "createdAt", headerName: "Created At", width: 300 },
    { field: "updatedAt", headerName: "Updated At", width: 300 },
  ];

  const rows = comments.map((comment) => ({
    id: comment._id,
    receta: comment.receta,
    text: comment.comment,
    user: {
      ...comment.usuario,
      avatar: comment.usuario.avatar
        ? `${avatarUrl}/${comment.usuario.avatar}`
        : "",
    },
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  }));

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (data) {
        setComments(data.comments);
      }
    }

    return () => {
      ignore = true;
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <Grid container height="30rem">
        <Typography>Comments is Loading...</Typography>
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
