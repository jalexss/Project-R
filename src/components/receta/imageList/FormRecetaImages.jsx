import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, ImageList, ImageListItem } from "@mui/material";

export const FormRecetaImages = ({ selectedFile }) => {
  const {
    state: {
      receta: { images },
    },
  } = useLocation();

  // console.log(images);

  let urlStorage = `${process.env.REACT_APP_API_URL_STORAGE}`;

  const [recetaImages, setRecetaImages] = useState(images);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      let urlImages = [];
      if (images) {
        urlImages = images.map((img) => {
          img = `${urlStorage}/${img}`;
          return img;
        });
        setRecetaImages(urlImages);
      }
    }

    return () => {
      ignore = true;
    };
  }, [images, urlStorage]);

  return (
    <Grid container>
      <Grid item xs={12}>
        {selectedFile && (
          <ImageList
            rowHeight={200}
            cols={3}
            gap={4}
            sx={{
              width: "auto",
              height: 280,
            }}
          >
            {selectedFile &&
              [...selectedFile].map((file) => (
                <ImageListItem key={file.name}>
                  <img src={URL.createObjectURL(file)} alt="Receta Images" />
                </ImageListItem>
              ))}
          </ImageList>
        )}
      </Grid>
    </Grid>
  );
};
