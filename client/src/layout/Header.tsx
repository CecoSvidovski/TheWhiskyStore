import { AppBar, FormControlLabel, Theme, Toolbar, Typography } from "@mui/material";
import DarkModeSwitch from "./DarkModeSwitch";
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
  theme: Theme;
}

const Header = ({ darkMode, handleThemeChange, theme }: Props) => {

  return (
    <AppBar
      position='static'
      sx={{
        mb: 4,
        boxShadow: '0px 0px 15px 2px rgba(0, 0, 0, 0.01)',
      }}
    >
      <Toolbar>
        <Typography 
          variant='h6'
          sx={{mr: 2}}
        >
          The Whisky Store
        </Typography>
        <FormControlLabel
          control={<DarkModeSwitch sx={{ m: 1 }} defaultChecked />}
          label={<DarkModeIcon sx={{ mt: '5px'}}/>}
          checked={darkMode}
          onChange={handleThemeChange}
        />
      </Toolbar>
    </AppBar>
  )
}

export default Header;