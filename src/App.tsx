import React from 'react';
import './App.sass';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Store } from './types';
import { SIGN_UP, LOG_IN, PAGE_ONE, PAGE_TWO, AUTHENTICATED } from './store/types';

import Home from './components/pages/Home';
import Redirect from './components/pages/Redirect';
import NotFound from './components/pages/NotFound';
import Admin from './components/pages/Admin';
import Login from './components/pages/Login';
import Page from './components/pages/Page';
import { routes } from './resources';

function App() {
  const user = useSelector(({ user } : Store) => user);

  return (
    <BrowserRouter>
      <Switch>
        {/* Perpetual routes */}
        <Route path={routes.HOME} exact component={Home} />
        <Route key={routes.PAGE_ONE} path={routes.PAGE_ONE} exact render={() => <Page type={PAGE_ONE} />} />
        <Route key={routes.PAGE_TWO} path={routes.PAGE_TWO} exact render={() => <Page type={PAGE_TWO} />} />

        {user
          ? // If authenticated
            [
              <Route key={routes.AUTHENTICATED} path={routes.AUTHENTICATED} exact render={() => <Page type={AUTHENTICATED} />} />
            ]
          : // Else
            [
              <Route key={routes.SIGN_UP} path={routes.SIGN_UP} exact render={() => <Login type={SIGN_UP} />} />,
              <Route key={routes.LOG_IN} path={routes.LOG_IN} exact render={() => <Login type={LOG_IN} />} />
            ]
        }

        {user?.isAdmin && <Route path={routes.ADMIN} exact component={Admin} />}

        {/* Redirect any valid route inputs to Home, invalid to 404 */}
        {Object.values(routes).map(route => <Route key={route} path={route} exact component={Redirect} />)}
        <Route path='/' component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
