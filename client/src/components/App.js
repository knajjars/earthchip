import React, { Component } from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import apiAuth from "../api/auth";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: []
    };
    // apiAuth.loadUser();
  }

  handleLogoutClick(e) {
    apiAuth.logout();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">MERN Boilerplate</h1>
          <NavLink to="/" exact>
            Home
          </NavLink>
          {!apiAuth.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!apiAuth.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {apiAuth.isLoggedIn() && (
            <Link to="/" onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )}
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
