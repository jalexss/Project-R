import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { RecetaLayout } from "../../layouts";
import { useMyFavoritesMutation } from "../../store/api";
import { RecetaCard } from "../../components";

export const MyFavoritesPage = () => {
  const [getFavorites, { isLoading, isError }] = useMyFavoritesMutation();
  const [recetaFav, setRecetaFav] = useState([]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getFavorites()
        .unwrap()
        .then(({ favorites }) => setRecetaFav(favorites));
    }
    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading || recetaFav < 1)
    return (
      <RecetaLayout>
        <Typography>Is loading...</Typography>
      </RecetaLayout>
    );

  if (isError)
    return (
      <RecetaLayout>
        <Typography>Is loading...</Typography>
      </RecetaLayout>
    );

  console.log(recetaFav);

  return (
    <RecetaLayout>
      <Grid container>
        <Grid item xs={12}>
          {recetaFav.map((receta) => (
            <RecetaCard receta={receta} key={receta._id} />
          ))}
        </Grid>
      </Grid>
    </RecetaLayout>
  );
};
