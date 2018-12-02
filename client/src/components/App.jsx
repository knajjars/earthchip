import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import apiAuth from "../api/auth";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NavBar from "./pages/navbar/NavBar";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import RegisterDevice from "./pages/navbar/RegisterDevice";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = apiAuth.isLoggedIn();

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("appprops", this.props);
    return (
      <div className="App">
        {!apiAuth.isLoggedIn() && (
          <div className="nav">
            <NavBar />
          </div>
        )}

        <div className="body">
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            {!apiAuth.isLoggedIn() && <Route path="/" exact component={Home} />}
            {!apiAuth.isLoggedIn() && (
              <Route path="/api/register-chip/" component={Signup} />
            )}

            <Route path="/" component={Dashboard} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
