import { Button, Modal, Box, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDeleteUserMutation } from "../../../store/api";

export const DeleteUserButton = ({ userId, users, setUsers }) => {
  const [deleteUser] = useDeleteUserMutation();
  const [openModal, setOpenModal] = useState(false);

  const onDelete = () => {
    console.log("DELETE");
    deleteUser(userId)
      .unwrap()
      .then(() => {
        console.log("delete successfully!");
        setUsers(users.filter((user) => user._id !== userId));
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
            This option is irrevertible for delete a user, Are you sure delete
            this user?
          </Typography>
          <Typography sx={{ mb: 2 }}>ID: {userId}</Typography>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <Button
              color="success"
              variant="contained"
              // startIcon={<DeleteIcon />}
              onClick={onDelete}
              fullWidth
            >
              Yes!
            </Button>
            <Button
              color="error"
              variant="contained"
              // startIcon={<DeleteIcon />}
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
