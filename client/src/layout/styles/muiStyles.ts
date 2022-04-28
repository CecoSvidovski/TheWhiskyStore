export const btnTransitionFunction = 'cubic-bezier(.2, .1, .2, 1)';
export const transitionLink = 'color 500ms cubic-bezier(.2, .1, .2, 1) 0ms';

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
  transition: transitionLink,
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

export const radiusShadow = {
  borderRadius: '20px',
  boxShadow: '0px 0px 15px 2px rgba(0, 0, 0, 0.04)',
}

export const transitionBtn = {
  transitionProperty: 'background-color, box-shadow',
  transitionDuration: '400ms',
  transitionTimingFunction: btnTransitionFunction,
}

export const btn = {
  backgroundColor: '#0071e3',
  borderRadius: '100px',
  ...transitionBtn,
  boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 15%), 0px 2px 2px 0px rgb(0 0 0 / 10%), 0px 1px 5px 0px rgb(0 0 0 / 9%)',
  '&:hover': {
    backgroundColor: '#0080ff',
  },
}

export const shoppingCartBtn = {
  color: 'inherit',
  height: '32px',
  width: '32px',
  m: 1,
  alignSelf: 'center',
  ...transitionBtn,
  '&:hover': {
    backgroundColor: 'rgba(169, 169, 169, 0.15)',
  },
}
