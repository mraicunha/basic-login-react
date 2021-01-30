import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';

export function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute ({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => (localStorage.getItem('logged') ? (
        children
      )
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        ))}
    />
  );
}
