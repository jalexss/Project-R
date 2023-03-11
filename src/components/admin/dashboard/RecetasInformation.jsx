import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, Stack, Link, Button } from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";

export const RecetasInformation = ({ recetas }) => {
  const {
    latestRecetaCreated,
    latestRecetaUpdated,
    recetasCount,
    recetasCreatedToday,
  } = recetas;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4">Recetas</Typography>
      </Grid>
      <Grid item xs={6}>
        <Stack direction="row" spacing={2} sx={{ py: 1, px: 2 }}>
          <NoteIcon />
          <Typography>Count</Typography>
          <Typography>{recetasCount}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack direction="row" spacing={2} sx={{ py: 1, px: 2 }}>
          <NoteIcon />
          <Typography>Recetas created today count</Typography>
          <Typography>{recetasCreatedToday}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2} sx={{ py: 1, px: 2 }}>
          <Stack direction="row" spacing={2}>
            <NoteIcon />
            <Typography>Latest receta created</Typography>
          </Stack>
          <Stack>
            <Typography>ID: {latestRecetaCreated._id}</Typography>
            <Typography>
              Usuario: {latestRecetaCreated.usuario.username}
            </Typography>
            <Typography noWrap>Title: {latestRecetaCreated.title}</Typography>
            <Typography>
              Created At:{latestRecetaCreated.createdAt} ago.
            </Typography>
            <Typography>
              Updated At:{latestRecetaCreated.updatedAt} ago.
            </Typography>
            <Link
              component={RouterLink}
              color="secondary"
              to={`/receta/${latestRecetaCreated._id}`}
            >
              See Receta...
            </Link>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2} sx={{ py: 1, px: 2 }}>
          <Stack direction="row" spacing={2}>
            <NoteIcon />
            <Typography>Latest receta updated:</Typography>
          </Stack>
          <Stack>
            <Typography>ID: {latestRecetaUpdated._id}</Typography>
            <Typography>
              Usuario: {latestRecetaUpdated.usuario.username}
            </Typography>
            <Typography noWrap>Title: {latestRecetaUpdated.title}</Typography>
            <Typography>
              Created At:{latestRecetaUpdated.createdAt} ago.
            </Typography>
            <Typography>
              Updated At:{latestRecetaUpdated.updatedAt} ago.
            </Typography>
            <Link
              component={RouterLink}
              color="secondary"
              to={`/receta/${latestRecetaUpdated._id}`}
            >
              See Receta...
            </Link>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
