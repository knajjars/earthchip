import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import apiAuth from "../api/auth";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NavBar from "./pages/navbar/NavBar";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import RegisterDevice from "./pages/register-device/RegisterDevice";
import PrivateRoute from "./utils/ProtectedRoute";
import LoggedRoute from "./utils/LoggedRoute";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        {!apiAuth.isLoggedIn() && (
          <div className="nav">
            <NavBar />
          </div>
        )}

        <div className="body">
          <Switch>
            <LoggedRoute exact path="/login" component={Login} />
            <LoggedRoute exact path="/signup" component={Signup} />
            {!apiAuth.isLoggedIn() && <Route path="/" exact component={Home} />}
            {!apiAuth.isLoggedIn() && (
              <Route
                path="/register-chip/"
                render={props => <Login {...props} />}
              />
            )}
            <Route path="/register-chip/" component={RegisterDevice} />
            <PrivateRoute path="/" component={Dashboard} />
            <PrivateRoute path="/account" component={Dashboard} />
            {/* <Route path="/" component={Dashboard} /> */}
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
