export const appBar = (darkMode: boolean) => ({
  mb: 4,
  boxShadow: '0px 0px 15px 2px rgba(0, 0, 0, 0.01)',
  backgroundColor: (darkMode ? '#080808' : '#1d1d1f'),
});

export const typography = { 
  mr: 2, 
  color: 'inherit', 
  textDecoration: 'none', 
};

export const link = {
  typography: 'h6',
  transition: '0.5s',
  color: '#a9a9a9',
  '&:hover': {
    color: '#e0e0e0',
  },
}

export const nav = {
  typography: 'h6',
  '&.active': {
    color: '#ffffff',
  },
};

export const shoppingCartBtn = {
  color: '#a9a9a9',
  transition: '0.5s',
  '&:hover': {
    backgroundColor: 'rgba(169, 169, 169, 0.2)',
  },
}