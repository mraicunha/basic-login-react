import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Home } from './Home';
import { Login } from './Login';

export function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" component={Home} />
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (localStorage.getItem('logged') ? (
        <Component {...props} />
      )
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        ))}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  location: PropTypes.node.isRequired,
};
