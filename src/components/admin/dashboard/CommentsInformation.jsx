import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, Stack, Link, Button } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

export const CommentsInformation = ({ comments }) => {
  const {
    commentsCount,
    commentsCreatedToday,
    latestCommentCreated,
    latestCommentUpdated,
  } = comments;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4">Comments</Typography>
      </Grid>
      <Grid item xs={6}>
        <Stack direction="row" spacing={2} sx={{ py: 1, px: 2 }}>
          <CommentIcon />
          <Typography>Count</Typography>
          <Typography>{commentsCount}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack direction="row" spacing={2} sx={{ py: 1, px: 2 }}>
          <CommentIcon />
          <Typography>Comments created today count</Typography>
          <Typography>{commentsCreatedToday}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2} sx={{ py: 1, px: 2 }}>
          <Stack direction="row" spacing={2}>
            <CommentIcon />
            <Typography>Latest comment created</Typography>
          </Stack>
          <Stack>
            <Typography>ID: {latestCommentCreated._id}</Typography>
            <Typography noWrap>Text: {latestCommentCreated.comment}</Typography>
            <Typography>
              Usuario: {latestCommentCreated.usuario.username}
            </Typography>
            <Typography>Receta: {latestCommentCreated.receta}</Typography>
            <Typography>
              Created At:{latestCommentCreated.createdAt} ago.
            </Typography>
            <Typography>
              Updated At:{latestCommentCreated.updatedAt} ago.
            </Typography>
            <Link
              component={RouterLink}
              color="secondary"
              to={`/receta/${latestCommentCreated._id}`}
            >
              See Receta...
            </Link>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2} sx={{ py: 1, px: 2 }}>
          <Stack direction="row" spacing={2}>
            <CommentIcon />
            <Typography>Latest comment updated:</Typography>
          </Stack>
          <Stack>
            <Typography>ID: {latestCommentUpdated._id}</Typography>
            <Typography noWrap>Text: {latestCommentUpdated.comment}</Typography>
            <Typography>
              Usuario: {latestCommentUpdated.usuario.username}
            </Typography>
            <Typography>Receta: {latestCommentUpdated.receta}</Typography>
            <Typography>
              Created At: {latestCommentUpdated.createdAt} ago.
            </Typography>
            <Typography>
              Updated At: {latestCommentUpdated.updatedAt} ago.
            </Typography>
            <Link
              component={RouterLink}
              color="secondary"
              to={`/receta/${latestCommentUpdated._id}`}
            >
              See Receta...
            </Link>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
