import { useState } from "react";
import { Box, Grid, Rating, Typography, Stack } from "@mui/material";
import { useAddRatingToRecetaMutation } from "../../../store/api";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export const RecetaQualification = ({ recetaId, ratingUser = 0 }) => {
  const [addRating, addStatus] = useAddRatingToRecetaMutation();
  const [value, setValue] = useState(ratingUser);
  const [hover, setHover] = useState(1);

  const onChangeRating = (event, newValue) => {
    const rating = newValue === null ? 0 : newValue;
    addRating({ recetaId, value: rating })
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
        setValue(rating);
      })
      .catch((error) => {
        console.log("soy error ->", error);
        setValue(value);
      });
  };

  return (
    <Grid
      id="calificacion"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 1 }}
    >
      {/* TODO : hacer que funcione */}
      <Typography variant="h4" color="secondary.main">
        let your qualification!
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        lg={10}
        xs={2}
        sx={{
          backgroundColor: "primary.light",
          boxShadow: 2,
          border: 1,
          borderRadius: "10px",
          borderColor: "secondary.main",
          mt: 1,
          py: 1,
          px: 4,
        }}
      >
        <Rating
          name="rating"
          value={value}
          size="large"
          getLabelText={getLabelText}
          onChange={onChangeRating}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Stack>
    </Grid>
  );
};
