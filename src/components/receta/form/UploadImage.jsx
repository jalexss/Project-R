import { Grid, Typography, Button } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { grey } from "@mui/material/colors";
import { useRef, useState } from "react";

import { FormLayout } from "../../../layouts";
import { FormRecetaImages } from "../imageList";

export const UploadImage = ({ register, setValue }) => {
  const [selectedFile, setSelectedFile] = useState([]);

  const { ref, onChange, name, ...rest } = register("images");
  const imagesRef = useRef(null);

  const onFileChange = (e) => {
    if (e.target.files.length === 0) return;

    if (e.target.files.length > 6) return setSelectedFile(undefined);

    setValue("images", e.target.files); // React Hook Form
    setSelectedFile(e.target.files); // Preview image data
  };
  return (
    <FormLayout>
      <Grid container sx={{ mt: 2, overflow: "auto" }}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color={grey[600]} sx={{ mb: 1 }}>
            {`Choose a maximum 6 image from your receta. (Optional)`}
          </Typography>

          <Button
            variant="contained"
            endIcon={<PhotoCamera />}
            onClick={() => imagesRef.current.click()}
          >
            upload
          </Button>

          <input
            hidden
            type="file"
            multiple
            name="images"
            onChange={(e) => {
              onFileChange(e);
            }}
            ref={imagesRef}
            {...rest}
          />

          <FormRecetaImages selectedFile={selectedFile} />
        </Grid>
      </Grid>
    </FormLayout>
  );
};
