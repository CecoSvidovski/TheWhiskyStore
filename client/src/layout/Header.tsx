import { AppBar, Badge, Container, FormControlLabel, IconButton, List, ListItem, Theme, Toolbar, Typography, Box } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeSwitch from "./DarkModeSwitch";
import NavLinkList from "./NavLinkList";
import { NavLink } from "react-router-dom";
import { appBar, link, shoppingCartBtn, typography } from "./muiStyles";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({ darkMode, handleThemeChange }: Props) => {

  const midLinks = [
    { title: 'Catalog', path: '/catalog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

  const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' },
  ];

  return (
    <AppBar
      position='sticky'
      sx={appBar(darkMode)}
    >
      <Toolbar>
        <Typography
          variant='h6'
          sx={{...typography, ...link}}
          component={NavLink}
          to='/'
          key={'home'}
        >
          THE WHISKY STORE
        </Typography>
        <FormControlLabel
          control={
            <DarkModeSwitch
              sx={{ m: 1 }}
              checked={darkMode}
              onChange={handleThemeChange}
            />
          }
          label={<DarkModeIcon sx={{ mt: '5px' }} />}
        />
        <NavLinkList links={midLinks} />
        <IconButton size='large' sx={shoppingCartBtn}>
          <Badge badgeContent={4} color='secondary'>
            <ShoppingCart />
          </Badge>
        </IconButton>
        <NavLinkList links={rightLinks} />
      </Toolbar>
    </AppBar>
  )
}

export default Header;