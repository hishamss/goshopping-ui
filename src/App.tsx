import React, { useEffect } from 'react';
import './App.sass'; // need to change "app.sass" before push 
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from './store/actions';
import { Store, User } from './types';
import { SIGN_UP, LOG_IN, STORE, ORDERS, USERS } from './store/types';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Profile from './components/pages/Profile';
import Redirect from './components/pages/Redirect';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import ListDisplay from './components/pages/ListDisplay';
import Payment from "./components/pages/Payment";
import { routes } from './resources';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(({ user } : Store) => user);

  // Re-establish user/auth header on page refresh
  useEffect(() => {

    const userString = localStorage.getItem('user');
    const jwt = localStorage.getItem('jwt');
    if (userString) {
      const currentUser : User = JSON.parse(userString);
      dispatch( updateUser(currentUser) );
    }

    if (jwt) axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        {/* Perpetual routes */}
        <Route path={routes.HOME} exact component={Home} />
        <Route key={routes.STORE} path={routes.STORE} exact render={() => <ListDisplay type={STORE} />} />
        <Route key={routes.ABOUT} path={routes.ABOUT} exact component={About} />
        <Route key={routes.CONTACT} path={routes.CONTACT} exact component={Contact} />
        <Route key={routes.PAYMENT} path={routes.PAYMENT} exact component={Payment} />

        {user
          ? // If authenticated
            [
              <Route key={routes.ORDERS} path={routes.ORDERS} exact render={() => <ListDisplay type={ORDERS} />} />,
              <Route key={routes.PROFILE} path={routes.PROFILE} exact component={Profile} />
            ]
          : // Else
            [
              <Route key={routes.SIGN_UP} path={routes.SIGN_UP} exact render={() => <Login type={SIGN_UP} />} />,
              <Route key={routes.LOG_IN} path={routes.LOG_IN} exact render={() => <Login type={LOG_IN} />} />
            ]
        }

        {user?.admin && [
          <Route key={routes.USERS} path={routes.USERS} exact render={() => <ListDisplay type={USERS} />} />
        ]}

        {/* Redirect any valid route inputs to Home, invalid to 404 */}
        {Object.values(routes).map(route => <Route key={route} path={route} exact component={Redirect} />)}
        <Route path={routes.HOME} component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
