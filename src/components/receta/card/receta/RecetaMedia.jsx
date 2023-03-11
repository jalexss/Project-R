import { CardMedia } from "@mui/material";

export const RecetaMedia = ({ images, user }) => {
  let urlStorage = `${process.env.REACT_APP_API_URL_STORAGE}/${images[0]}`;

  return (
    <>
      <CardMedia
        component="img"
        height="194"
        image={urlStorage}
        alt={user.username}
      />
    </>
  );
};
