import { Grid } from "@mui/material"
import { grey } from "@mui/material/colors"


export const FormLayout = ({children}) => {
  return (
    <Grid
      sx={{ 
        mt: 3, 
        backgroundColor: grey[50],
        borderRadius: 1,
        padding: '16px',
        boxShadow: 3, 
      }} 
    >
        {children}
    </Grid>
  )
}

