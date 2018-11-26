import React, { Component } from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import apiAuth from "../api/auth";
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // apiAuth.loadUser();
  }

  handleLogoutClick(e) {
    apiAuth.logout();
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
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
