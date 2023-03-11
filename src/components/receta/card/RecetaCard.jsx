import { Card, Divider, Grid } from "@mui/material";

import {
  RecetaHeader,
  RecetaMedia,
  RecetaContent,
  RecetaAction,
} from "./receta";

export const RecetaCard = ({ receta }) => {
  const { _id, description, images, title, usuario } = receta;

  const recetaWithImage = Boolean(images[0]);

  return (
    <Grid item sx={{ mb: 2 }}>
      <Card sx={{ width: "425px" }}>
        <RecetaHeader user={usuario} title={title} />
        <Divider variant="middle" />
        {recetaWithImage && <RecetaMedia images={images} user={usuario} />}

        <RecetaContent description={description} _id={_id} />

        <Divider variant="middle" />

        <RecetaAction recetaId={_id} />
      </Card>
    </Grid>
  );
};
