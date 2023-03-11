import { useContext, useState } from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDeleteCommentByIdMutation } from "../../../store/api";
import { useAuthStore } from "../../../hooks";
import { CommentContext } from "../../../context/CommentContext";

export const CommentActions = ({ setEditable, commentId, commentUserId }) => {
  const { resetCommentList } = useContext(CommentContext);

  const [commentDelete, deleteResult] = useDeleteCommentByIdMutation();
  const { isLoading } = deleteResult;
  const { user } = useAuthStore();

  const actionPermission = user.id === commentUserId ? true : false;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = () => {
    commentDelete(commentId);
    resetCommentList();
    setAnchorEl(null);
  };

  return (
    <Stack display={actionPermission ? "flex" : "none"}>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disabled={isLoading} onClick={() => setEditable(true)}>
          <ListItemIcon>
            <ModeEditIcon />
          </ListItemIcon>
          <ListItemText>edit</ListItemText>
        </MenuItem>
        <MenuItem disabled={isLoading} onClick={onDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Stack>
  );
};
