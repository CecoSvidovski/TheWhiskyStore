import { transitionBtn } from "../../layout/styles/muiStyles";

export const basketBtn = (darkMode: boolean) => ({
  margin: '0',
  borderRadius: '50%',
  overflow: 'visible',
  color: darkMode ? 'inherit' : 'rgba(0, 0, 0, 0.54)',
  minWidth: 'auto',
  backgroundColor: 'transparent',
  ...transitionBtn,
  '&:hover': {
    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
  },
});

export const smallBtn = {
  padding: '0px',
}

export const largeBtn = {
  padding: '8px',
}