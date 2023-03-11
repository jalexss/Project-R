import { Link as RouterLink } from "react-router-dom"
import { Button, Grid } from "@mui/material"

export const BackToHomeButton = () => {
  return (
    <Grid item>
        <Button 
            variant="contained" 
            sx={{ mt: 4 }}
            component={ RouterLink } 
            to="/"
        >
            Back to home
        </Button>
    </Grid>
  )
}

