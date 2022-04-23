export const appBar = (darkMode: boolean) => ({
  mb: 4,
  boxShadow: '0px 0px 15px 2px rgba(0, 0, 0, 0.01)',
  backgroundColor: (darkMode ? 'rgba(8, 8, 8, 0.8)' : 'rgba(0, 0, 0, 0.8)'),
  backdropFilter: 'saturate(180%) blur(20px)',
  color: '#d6d6d6',
});

export const toolbar = { 
  display: 'flex', 
  flexDirection: 'row', 
  justifyContent: 'space-around' 
};

export const typography = {
  alignSelf: 'center',
  mr: 2,
  color: 'inherit',
  textDecoration: 'none',
};

export const link = {
  typography: 'h6',
  transition: '0.4s',
  color: 'inherit',
  '&:hover': {
    color: '#ffffff',
  },
}

export const nav = {
  '&.active': {
    color: '#ffffff',
  },
};

export const shoppingCartBtn = {
  color: 'inherit',
  height: '42px',
  alignSelf: 'center',
  transition: '0.4s',
  '&:hover': {
    backgroundColor: 'rgba(169, 169, 169, 0.2)',
  },
}