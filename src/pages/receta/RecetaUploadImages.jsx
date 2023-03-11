import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Grid } from "@mui/material";
import { PreviewImages, UploadImage } from "../../components/receta/form";
import { RecetaLayout } from "../../layouts";
import { useReceta } from "../../hooks";

export const RecetaUploadImages = () => {
  const {
    state: { receta },
  } = useLocation();

  const navigate = useNavigate();
  // console.log(receta);

  const { startUploadImages, uploadImagesStatus } = useReceta();
  const { isLoading } = uploadImagesStatus;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const recetaId = receta._id;

    await startUploadImages(data, recetaId);
  };

  const onBackButton = () => {
    navigate("/receta/create", { state: receta });
  };

  const onSkipButton = () => {
    navigate("/myRecetas", { state: undefined, replace: true });
  };

  if (!receta) {
    return navigate("/receta/create", { state: undefined, replace: true });
  }

  return (
    <RecetaLayout>
      <Grid
        component="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        container
      >
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button fullWidth variant="contained" onClick={onSkipButton}>
            skip
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={onBackButton}>
            Back
          </Button>
        </Grid>

        <Grid item xs={12}>
          <PreviewImages images={receta.images} />
        </Grid>

        <Grid item xs={12}>
          <UploadImage
            setValue={setValue}
            register={register}
            errors={errors}
            // images={receta.images}
          />
        </Grid>

        <Grid item xs={12} sx={{ mb: 2, mt: 1, position: "relative" }}>
          <Button
            type="submit"
            disabled={isLoading}
            variant="contained"
            fullWidth
          >
            Save
          </Button>
          {isLoading && (
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
      </Grid>
    </RecetaLayout>
  );
};
