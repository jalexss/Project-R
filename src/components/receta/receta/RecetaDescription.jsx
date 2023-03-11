import { Grid, Typography } from "@mui/material"

export const RecetaDescription = ({ description }) => {
  return (
    <Grid 
      item 
      id="descripcion"
      sx={{ flexGrow: '1'}}
    >
      <Typography variant="h6" color='secondary.main' >
        Description:
      </Typography>
      <Typography align="justify" >
        {description}
      </Typography>
    </Grid>
  )
}

