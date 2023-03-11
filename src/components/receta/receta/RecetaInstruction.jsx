import { Grid, Typography } from "@mui/material"


export const RecetaInstruction = ({ instruction }) => {
  return (
    <Grid 
      id="instruccion"
      item 
      align="justify" 
      sx={{ flexGrow: 4 }} 
    >
      <Typography variant="h6" color='secondary.main' >
        Instruction:
      </Typography>
      <Typography>
        {instruction}
      </Typography>
    </Grid>
  )
}

