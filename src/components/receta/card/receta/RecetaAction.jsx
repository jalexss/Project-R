import { useEffect, useState } from "react";
import { Button, CardActions } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import { ShareItModal } from "../../modal";
import {
  useAddFavoriteMutation,
  useMyFavoritesMutation,
} from "../../../../store/api/userApi";
import { useAuthStore } from "../../../../hooks";

export const RecetaAction = ({ recetaId }) => {
  const [open, setOpen] = useState(false);
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const [myFavorites] = useMyFavoritesMutation();
  const { user } = useAuthStore();
  const [addFavorite] = useAddFavoriteMutation();

  const onAddFavorite = () => {
    addFavorite({
      userId: user.id,
      recetaId,
      addFavorite: toggleFavorite ? "no" : "yes",
    })
      .unwrap()
      .then((fulfilled) => {
        setToggleFavorite(!toggleFavorite);
      })
      .catch(() => {
        setToggleFavorite(toggleFavorite);
      });
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      myFavorites()
        .unwrap()
        .then(({ favorites = [] }) => {
          const favReceta = favorites.some(
            (favorite) => favorite._id === recetaId
          );
          setToggleFavorite(favReceta);
        })
        .catch((error) => console.log(error));
    }
    return () => {
      ignore = true;
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <CardActions spacing={0} sx={{ justifyContent: "space-between" }}>
      <Button
        disabled={false}
        startIcon={
          <FavoriteIcon sx={{ color: toggleFavorite ? "white" : red[400] }} />
        }
        color="error"
        aria-label="add to favorites"
        onClick={onAddFavorite}
        sx={{
          backgroundColor: toggleFavorite ? "error.light" : "",
          color: toggleFavorite ? "white" : "",
          "&:hover": {
            backgroundColor: "error.light",
            color: "white",
          },
        }}
      >
        Add to favorite
      </Button>

      <Button
        startIcon={<ShareIcon sx={{ color: blue[800] }} />}
        color="info"
        aria-label="share it"
        onClick={handleOpen}
      >
        Share it!
      </Button>
      <ShareItModal handleClose={handleClose} open={open} recetaId={recetaId} />
    </CardActions>
  );
};
