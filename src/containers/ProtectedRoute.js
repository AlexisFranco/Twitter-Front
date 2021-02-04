import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as Auth from '../utils/auth';

export default function ProtectedRoute({ path, component: Component }) {
  return (
    <Route
      path={path}
      render={(routeProps) => {
        if (Auth.isAuthenticaded()) {
          return <Component {...routeProps} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}
