import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";

export const HeaderAvatar = ({ user }) => {
  const usernameFirtsChar = user.username.charAt(0);
  const userAvatar = user.avatar;
  let avatarUrl = `${process.env.REACT_APP_API_URL_STORAGE}/${userAvatar}`;

  if (!userAvatar) {
    avatarUrl = "";
  }

  return (
    <Avatar
      // sx={{ bgcolor: red[500] }}
      aria-label="recipe"
      alt={user.username}
      src={avatarUrl}
    >
      {usernameFirtsChar}
    </Avatar>
  );
};
