import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { btn, radiusShadow } from "../layout/styles/muiStyles";
import { container } from "./muiStyles";

const NotFound = () => (
  <Container component={Paper} sx={{...container, ...radiusShadow}}>
    <Typography variant='h3' gutterBottom>
      404 Error
    </Typography>
    <Typography variant='h4' gutterBottom>
      The page you are looking for does not exist.
    </Typography>
    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
      How you got here is a mystery. But you can click the buttons below to go back to the homepage or catalog.
    </Typography>
    <Box sx={{ mt: 3 }}>
      <Button component={Link} to={'/'} sx={{ ...btn, mr: 2 }} variant='contained'>
        Back to home
      </Button>
      <Button component={Link} to={'/catalog'} sx={btn} variant='contained'>
        Back to catalog
      </Button>
    </Box>
  </Container>
)

export default NotFound;