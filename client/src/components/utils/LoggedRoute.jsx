import React from "react";
import { Route, Redirect } from "react-router-dom";
import api from "../../api/auth";

export default function LoggedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !api.isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
