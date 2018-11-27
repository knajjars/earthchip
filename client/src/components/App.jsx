import React, { Component } from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import apiAuth from "../api/auth";
import NavBar from "./pages/NavBar";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // apiAuth.loadUser();
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
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
