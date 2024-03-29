import { AppBar, Badge, FormControlLabel, IconButton, Toolbar, Typography, Box } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeSwitch from "./DarkModeSwitch";
import NavLinkList from "./NavLinkList";
import { Link, NavLink } from "react-router-dom";
import { appBar, link, shoppingCartBtn, toolbar, typography } from "./styles/muiStyles";
import { useAppSelector } from "../store/store";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({ darkMode, handleThemeChange }: Props) => {
  const {basket} = useAppSelector(state => state.basket);
  const basketItemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  const leftLinks = [
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
      <Toolbar sx={toolbar}>
        <Box sx={{ display: 'inherit' }}>
          <Typography
            variant='h6'
            sx={{ ...typography, ...link }}
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
            label={<DarkModeIcon sx={{ color: 'inherit', mt: '5px' }} />}
          />
          <NavLinkList links={leftLinks} />
        </Box>
        <Box sx={{ display: 'inherit' }}>
          <IconButton component={Link} to='/basket' size='large' sx={shoppingCartBtn}>
            <Badge badgeContent={basketItemCount} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>
          <NavLinkList links={rightLinks} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header;