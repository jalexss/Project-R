import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";

import { RecetaCard } from "../../components";
import { RecetaLayout } from "../../layouts";
import { useReceta } from "../../hooks";

export const RecetaListPage = () => {
  const { getRecetasStatus, startGetRecetas } = useReceta();
  const { isLoading, isError } = getRecetasStatus;
  const [previewRecetas, setPreviewRecetas] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [maxPagination, setMaxPagination] = useState(1);

  const onNextRecetas = async () => {
    const { maxPagination = 1, recetas = [] } = await startGetRecetas(
      pagination + 1
    );

    setPreviewRecetas([...previewRecetas, ...recetas]);
    setPagination(pagination + 1);
    setMaxPagination(maxPagination);
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      startGetRecetas(pagination).then(
        ({ maxPagination = 1, recetas = [] }) => {
          setPreviewRecetas([...recetas]);
          setMaxPagination(maxPagination);
        }
      );
    }

    return () => {
      ignore = true;
    };
  }, []);

  if (isError) {
    return (
      <RecetaLayout>
        <h3>Recetas load failed!</h3>
      </RecetaLayout>
    );
  }

  if (isLoading) {
    return (
      <RecetaLayout>
        <h3>loading... recetas</h3>
      </RecetaLayout>
    );
  }

  return (
    <RecetaLayout>
      <Grid
        container
        columns={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          my: 4,
        }}
      >
        {
          //Grid items -> Cards
          // recetas &&
          previewRecetas.map((receta) => (
            <RecetaCard key={receta._id} receta={receta} />
          ))
        }
        {pagination < maxPagination ? (
          <Grid item xs={12}>
            <Button
              variant="contained"
              disabled={pagination >= maxPagination ? true : false}
              fullWidth
              sx={{
                height: "6rem",
              }}
              onClick={onNextRecetas}
            >
              Load more recetas
            </Button>
          </Grid>
        ) : (
          <Grid
            item
            display="flex"
            xs={12}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h3">There's not more recetas...</Typography>
          </Grid>
        )}
      </Grid>
    </RecetaLayout>
  );
};
