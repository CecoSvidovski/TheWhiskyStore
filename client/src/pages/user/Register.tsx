import { Container, Box, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Link as LinkComponent, Paper } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { btn, radiusShadow } from "../../layout/styles/muiStyles";
import { Link } from "react-router-dom";

const Register = () => {

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
            Sign up
          </Typography>
          <Box component="form" noValidate /*onSubmit={handleSubmit}*/ sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ...btn }}
            >
              Sign Up
            </Button>
            <Grid container display='flex' justifyContent='center'>
              <Grid item>
                <LinkComponent component={Link} to='/login' variant="body2">
                  Already have an account? Sign in
                </LinkComponent>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
  
  export default Register;