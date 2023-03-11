import { Grid, ImageList, ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";

export const PreviewImages = ({ images }) => {
  const [recetaImages, setRecetaImages] = useState(images);
  let urlStorage = `${process.env.REACT_APP_API_URL_STORAGE}`;

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
        Preview receta images
      </Grid>

      <Grid item xs={12}>
        {images && (
          <ImageList
            rowHeight={200}
            cols={3}
            gap={4}
            sx={{
              width: "auto",
              height: 280,
            }}
          >
            {recetaImages.map((img, index) => (
              <ImageListItem key={index}>
                <img src={img} alt={`recetaImg ${index}`} />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Grid>
    </Grid>
  );
};
