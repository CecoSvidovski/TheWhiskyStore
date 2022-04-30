import { Container, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link as LinkComponent, Paper } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { btn, radiusShadow } from "../../layout/styles/muiStyles";
import { Link } from "react-router-dom";

const Login = () => {

  return (

    

    <Container component={Paper} maxWidth="sm" sx={radiusShadow}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 6,
            px: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate /*onSubmit={handleSubmit}*/ sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ...btn }}
            >
              Sign In
            </Button>
            <Grid container display='flex' justifyContent='center'>
              <Grid item>
                <LinkComponent component={Link} to='/register' variant="body2">
                  {"Don't have an account? Sign Up"}
                </LinkComponent>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default Login;