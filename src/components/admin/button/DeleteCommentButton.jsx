import { Button, Modal, Box, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDeleteCommentByIdMutation } from "../../../store/api";

export const DeleteCommentButton = ({ commentId, comments, setComments }) => {
  const [deleteComment] = useDeleteCommentByIdMutation();
  const [openModal, setOpenModal] = useState(false);

  const onDelete = () => {
    console.log("DELETE comment");
    deleteComment(commentId)
      .unwrap()
      .then(() => {
        console.log("delete successfully!");
        setComments(comments.filter((comment) => comment._id !== commentId));
        setOpenModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button
        color="error"
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={onOpenModal}
        fullWidth
        disableElevation
      >
        Delete
      </Button>
      <Modal open={openModal} onClose={onCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            bgcolor: "background.paper",
            transform: "translate(-50%, -50%)",
            borderRadius: "1rem",
            width: "60%",
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Are you sure?
          </Typography>
          <Typography>
            This option is irrevertible for delete a receta, Are you sure delete
            this receta?
          </Typography>
          <Typography sx={{ mb: 2 }}>ID: {commentId}</Typography>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <Button
              color="success"
              variant="contained"
              onClick={onDelete}
              fullWidth
            >
              Yes!
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={onCloseModal}
              fullWidth
            >
              No!
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
