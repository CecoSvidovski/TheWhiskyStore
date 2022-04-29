import { BrowserHistory } from 'history';
import React, { ReactNode } from 'react';
import { Router } from 'react-router-dom';


interface Props {
  children: ReactNode | undefined;
  history: BrowserHistory
}

const CustomRouter = ({
  children,
  history
}: Props) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

export default CustomRouter;