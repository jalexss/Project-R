import { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import { CommentActions, CommentEditable } from "./";

export const Comment = ({
  comment: { usuario, updatedAt, comment, _id },
  recetaId,
}) => {
  const [editable, setEditable] = useState(false);
  const updatedAtFromNow = moment(updatedAt).fromNow();
  const { avatar, username } = usuario;
  let avatarUrl = "";

  if (avatar) {
    avatarUrl = `${process.env.REACT_APP_API_URL}/storage/${avatar}`;
  }

  return (
    <Grid
      container
      sx={{
        mb: 2,
        p: 2,
        boxShadow: 1,
        backgroundColor: "primary.main",
        borderRadius: "1rem",
      }}
    >
      <Grid item xs={12} display="flex" justifyContent="space-between">
        <Stack spacing={2} direction="row" alignItems="center" sx={{ mb: 1 }}>
          <Avatar src={avatar ? avatarUrl : ""} alt={username} />
          <Typography variant="h6">{username}</Typography>
        </Stack>

        <CommentActions
          setEditable={setEditable}
          commentId={_id}
          commentUserId={usuario._id}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ mt: 1, mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        {editable ? (
          <CommentEditable
            comment={comment}
            commentId={_id}
            setEditable={setEditable}
          />
        ) : (
          <Grid container>
            <Grid item xs={12}>
              <Typography>{comment}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Typography variant="body2">{updatedAtFromNow}</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
