import React, { Component } from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RegisterDevice from "./pages/register-device/RegisterDevice";
import NavBar from "./pages/NavBar";
import Home from "./pages/home/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // apiAuth.loadUser();
  }

  render() {
    return (
      <div className="App">
        <div className="nav">
          <NavBar />
        </div>
        <div className="body">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/api/register-chip" component={RegisterDevice} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
