import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { CommentContext } from "../../../context/CommentContext";
import { commentValidations } from "../../../helpers";
import { useUpdateCommentByIdMutation } from "../../../store/api";

export const CommentEditable = ({ comment, commentId, setEditable }) => {
  const { resetCommentList } = useContext(CommentContext);

  const [updateComment] = useUpdateCommentByIdMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: { comment } });

  const helperTextMain = "Comment must be greater than 1 and less than 522.";

  const onEdit = ({ comment }) => {
    updateComment({ comment, commentId })
      .unwrap()
      .then(() => {
        resetCommentList();
        setEditable(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid container component="form" onSubmit={handleSubmit(onEdit)}>
      <Grid item xs={12}>
        <TextField
          required
          color="secondary"
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
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button variant="contained" onClick={() => setEditable(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            update
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
