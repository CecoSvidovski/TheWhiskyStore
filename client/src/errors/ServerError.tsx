import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { productBtn } from "../pages/catalog/muiStyles";

const ServerError = () => {
  const location = useLocation();

  const state = useMemo(() => {
    const state = location.state as { error: {status: string, detail: string, title: string} };
    if (state) return state;
    return null;
  }, [location]);

  return (
    <Container component={Paper} sx={{ pt: 5, pb: 5, textAlign: 'center' }}>
      <Typography variant='h3' gutterBottom>
        {state?.error.status || '500'} Error
      </Typography>
      <Typography variant='h4' gutterBottom>
        Ooops... Something went wrong.
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Sorry for the inconvenience, we're working on it.
      </Typography>
      <Button component={Link} to={'/'} sx={{ ...productBtn, mr: 2, mt: 2 }} variant='contained'>
        Back to home
      </Button>
      <Button component={Link} to={'/catalog'} sx={{ ...productBtn, mt: 2 }} variant='contained'>
        Back to catalog
      </Button>
      {state?.error.detail
        ? (<>
            <Divider sx={{mt: 4, mb: 2}} />
            <Typography variant='h6' gutterBottom>{state.error.detail}</Typography>
          </>)
        : ''
      }
    </Container>
  )
};

export default ServerError;

