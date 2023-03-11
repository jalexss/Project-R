import {
  Box,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

export const ShareItModal = ({ recetaId, open, handleClose }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    navigator.clipboard.writeText(toClipBoard);
  };

  const handlePopoverClose = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 3000);
  };

  const openPopoper = Boolean(anchorEl);

  const urlHost = process.env.REACT_APP_HOST;
  const toClipBoard = `${urlHost}/receta/${recetaId}`;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 400, lg: 600 },
          bgcolor: "background.paper",
          borderRadius: "1rem",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          color="info.main"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Share it this receta with everyone!
        </Typography>
        <Stack spacing={2} direction="column">
          <OutlinedInput
            type="text"
            defaultValue={toClipBoard}
            disabled={true}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onMouseLeave={handlePopoverClose}
                  onClick={handlePopoverOpen}
                  edge="end"
                >
                  <ContentCopyIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Stack>
        <Popover
          sx={{
            pointerEvents: "none",
          }}
          open={openPopoper}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>Text Copied!</Typography>
        </Popover>
      </Box>
    </Modal>
  );
};
