import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Collapse,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { RecetaLayout } from "../../layouts";
import {
  DescriptionInput,
  IngredientInput,
  InstructionInput,
  TimeInput,
  TitleInput,
} from "../../components/receta/form";
import { BackToHomeButton } from "../../components";
import { useReceta } from "../../hooks";
import { useEffect } from "react";

export const RecetaFormPage = () => {
  const navigate = useNavigate();
  const { state: receta } = useLocation();
  const { startUpdateReceta, startCreateReceta, createStatus, updateStatus } =
    useReceta();

  const [backendError, setBackendError] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: receta ? receta.title : "",
      ingredients: receta ? receta.ingredients : "",
      minutes: receta ? receta.minutes : "",
      description: receta ? receta.description : "",
      instruction: receta ? receta.instruction : "",
    },
  });

  const onSubmit = (data) => {
    if (receta) {
      return startUpdateReceta({ recetaId: receta._id, data });
    }

    startCreateReceta(data);
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (updateStatus.status === "fulfilled") {
        return navigate("/receta/upload", {
          state: { receta: updateStatus.data.receta },
        });
      }

      if (updateStatus.status === "rejected") {
        return setBackendError(true);
      }
    }

    return () => {
      ignore = true;
    };
  }, [updateStatus.status]);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (createStatus.status === "fulfilled") {
        return navigate("/receta/upload", {
          state: { receta: createStatus.data.receta },
        });
      }

      if (createStatus.status === "rejected") {
        return setBackendError(true);
      }
    }

    return () => {
      ignore = true;
    };
  }, [createStatus.status]);

  return (
    <RecetaLayout>
      <Grid container flexDirection="column" spacing={1}>
        <Grid sx={{ pr: "16px", py: "10px" }}>
          <BackToHomeButton />

          <form onSubmit={handleSubmit(onSubmit)}>
            <TitleInput register={register} errors={errors} />

            <DescriptionInput register={register} errors={errors} />

            <IngredientInput
              control={control}
              register={register}
              errors={errors}
            />

            <InstructionInput register={register} errors={errors} />

            <TimeInput register={register} errors={errors} />

            {/* <Alert
              severity="error"
              onClose={}
              sx={{
                mt: 1,
                display:
                  createStatus.isError || updateStatus.isError
                    ? "flex"
                    : "none",
              }}
            >
              Something is wrong!. Please try again.
            </Alert> */}

            <Collapse in={backendError}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setBackendError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ my: 2 }}
              >
                Something is wrong!. Please try again.
              </Alert>
            </Collapse>

            <Grid item sx={{ mb: 2, mt: 1, position: "relative" }}>
              <Button
                type="submit"
                disabled={createStatus.isLoading || updateStatus.isLoading}
                variant="contained"
                fullWidth
              >
                Next
              </Button>
              {(createStatus.isLoading || updateStatus.isLoading) && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </RecetaLayout>
  );
};
