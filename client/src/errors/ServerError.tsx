import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { btn, radiusShadow } from "../layout/styles/muiStyles";
import { container } from "./muiStyles";

const ServerError = () => {
  const location = useLocation();

  const state = useMemo(() => {
    const state = location.state as { error: { status: string, detail: string, title: string } };
    if (state) return state;
    return null;
  }, [location]);

  return (
    <Container component={Paper} sx={{...container, ...radiusShadow}}>
      <Typography variant='h3' gutterBottom>
        {state?.error.status || '500'} Error
      </Typography>
      <Typography variant='h4' gutterBottom>
        Ooops... Something went wrong.
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Sorry for the inconvenience, we're working on it.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button component={Link} to={'/'} sx={{ ...btn, mr: 2 }} variant='contained'>
          Back to home
        </Button>
        <Button component={Link} to={'/catalog'} sx={btn} variant='contained'>
          Back to catalog
        </Button>
      </Box>
      {state?.error.detail
        ? (<>
          <Divider sx={{ my: 4 }} />
          <Typography gutterBottom sx={{ mx: 2, color: 'red' }}>{state.error.detail}</Typography>
        </>)
        : ''
      }
    </Container>
  )
};

export default ServerError;

