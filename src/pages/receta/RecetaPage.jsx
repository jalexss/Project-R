import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid } from "@mui/material";

import { RecetaLayout } from "../../layouts";
import {
  BackToHomeButton,
  RecetaDetails,
  RecetaInformation,
  RecetaMedia,
  RecetaQualification,
  RecetaTitle,
} from "../../components";
import { useAuthStore, useReceta } from "../../hooks";
import { ListComments } from "../../components/comment";

export const RecetaPage = () => {
  const { recetaId } = useParams();
  const { user, userIsLoading } = useAuthStore();
  const navigate = useNavigate();

  const { startGetRecetaById, recetaByIdStatus, startDeleteRecetaById } =
    useReceta();
  const { isLoading, isError } = recetaByIdStatus;
  const [receta, setReceta] = useState(false);
  const [isOwnerUser, setIsOwnerUser] = useState(false);

  const onRecetaEdit = () => {
    navigate("/receta/edit", { state: receta });
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      startGetRecetaById(recetaId).then((recetaData) => {
        setReceta(recetaData);
        if (recetaData.usuario._id === user?.id) {
          setIsOwnerUser(true);
        }
      });
    }

    return () => {
      ignore = true;
    };
  }, [recetaId]);

  if (isError) {
    return (
      <RecetaLayout>
        <h3>Error: receta load failed!</h3>
      </RecetaLayout>
    );
  }

  if (!receta || isLoading || userIsLoading) {
    return (
      <RecetaLayout>
        <h3>loading... receta</h3>
      </RecetaLayout>
    );
  }

  console.log(receta);

  return (
    <RecetaLayout>
      <Grid
        container
        alignItems="center"
        flexDirection="column"
        sx={{
          display: "flex",
          my: 1,
          py: 1,
          px: 2,
          borderRadius: "5px",
          boxShadow: 1,
        }}
      >
        <BackToHomeButton />
        {isOwnerUser && (
          <Grid item>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 4 }}
              onClick={onRecetaEdit}
            >
              Edit
            </Button>
          </Grid>
        )}
        {isOwnerUser && (
          <Grid item>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 4 }}
              onClick={() => {
                startDeleteRecetaById(recetaId);
              }}
            >
              Delete
            </Button>
          </Grid>
        )}
        <RecetaTitle title={receta.title} />

        <RecetaDetails
          usuario={receta.usuario}
          minutes={receta.minutes}
          updatedAt={receta.updatedAt}
          createdAt={receta.createdAt}
          average={receta.average}
          rating={receta.rating}
        />

        <RecetaInformation
          description={receta.description}
          instruction={receta.instruction}
          ingredients={receta.ingredients}
        />

        {receta.images?.length > 0 && <RecetaMedia images={receta.images} />}

        <RecetaQualification
          recetaId={recetaId}
          ratingUser={receta.ratingUser}
        />

        <ListComments />
      </Grid>
    </RecetaLayout>
  );
};
