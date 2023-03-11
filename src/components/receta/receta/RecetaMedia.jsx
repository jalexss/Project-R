import { Grid } from "@mui/material"
import { RecetaMediaImages } from "../imageList";

export const RecetaMedia = ({ images }) => {
  
  return (
    <Grid
      container
      width={{xs:'100%', lg: '70%'}}
      justifyContent="center"
      alignItems="center" 
      sx={{ 
        border: 1,
        borderRadius: '10px',
        borderColor: 'secondary.main',
        backgroundColor: 'primary.light',
        boxShadow: 2,
        px: 2,
        my: 2,
      }}
    >
      <RecetaMediaImages images={images} />
    </Grid>
  )
}

