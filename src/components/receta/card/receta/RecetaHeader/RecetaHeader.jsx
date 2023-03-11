import { Link as RouterLink } from "react-router-dom";
import { CardHeader, Link, Typography } from "@mui/material";

import { HeaderAction } from "./HeaderAction";
import { HeaderAvatar } from "./HeaderAvatar";

export const RecetaHeader = ({ user, title }) => {
  return (
    <>
      <CardHeader
        avatar={<HeaderAvatar user={user} />}
        action={<HeaderAction />}
        title={
          <Typography variant="titleRecetaCard" align="justify">
            {title}
          </Typography>
        }
        subheader={
          <Link
            underline="hover"
            variant="subtitle1"
            color="secondary.dark"
            component={RouterLink}
            to={`/user/${user.username}/profile`}
            state={user.username}
          >
            Created by {user.username}.
          </Link>
        }
      />
    </>
  );
};
