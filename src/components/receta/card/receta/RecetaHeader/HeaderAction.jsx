import { useState } from "react";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const HeaderAction = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton 
        aria-label="settings"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disabled onClick={handleClose}>Edit</MenuItem>
        <MenuItem disabled onClick={handleClose}>Delete</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Report</MenuItem>
      </Menu>
    </>
  )
}

