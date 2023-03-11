import { useContext } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreateCommentMutation } from "../../../store/api";
import { CommentContext } from "../../../context/CommentContext";
import { commentValidations } from "../../../helpers";

export const CreateComment = ({ recetaId }) => {
  const { resetCommentList } = useContext(CommentContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [createComment, { isLoading }] = useCreateCommentMutation();

  const helperTextMain = "Comment must be greater than 1 and less than 522.";

  const onSubmit = ({ comment }) => {
    const newComment = { recetaId, comment };

    createComment(newComment);
    reset();
    resetCommentList();
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mb: 2 }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" color="secondary">
          Let a comment!
        </Typography>
      </Grid>
      {isLoading ? (
        <Grid
          item
          xs={12}
          display="flex"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid item xs={12} display="flex">
            <TextField
              required
              label="Your comment"
              fullWidth
              helperText={
                !!errors?.comment ? errors.comment.message : helperTextMain
              }
              error={!!errors?.comment}
              {...register("comment", commentValidations)}
              multiline
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};
