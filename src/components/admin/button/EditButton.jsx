import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const EditButton = ({ userUsername }) => {
  const navigate = useNavigate();

  const onNavigate = () => {
    return navigate("/admin/user-data", { state: { userUsername } });
  };

  return (
    <Button
      color="secondary"
      fullWidth
      variant="contained"
      startIcon={<EditIcon />}
      onClick={onNavigate}
      disabledElevation
    >
      Edit
    </Button>
  );
};
