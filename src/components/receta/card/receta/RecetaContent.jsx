import { Link as RouterLink } from "react-router-dom";
import { Link, CardContent, Typography } from "@mui/material";

export const RecetaContent = ({ description, _id }) => {
  return (
    <CardContent>
      <Typography
        sx={{ mb: 1 }}
        align="justify"
        variant="body2"
        color="text.secondary"
      >
        {description}
      </Typography>
      <Link
        component={RouterLink}
        to={`/receta/${_id}`}
        color="#37474f"
        underline="hover"
        sx={{ mt: 2 }}
      >
        See More...
      </Link>
    </CardContent>
  );
};
