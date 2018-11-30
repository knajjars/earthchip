import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import apiAuth from "../api/auth";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RegisterDevice from "./pages/navbar/RegisterDevice";
import NavBar from "./pages/navbar/NavBar";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import EarthieDetail from "./pages/dashboard/earthies/EarthieDetail";
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
            {!apiAuth.isLoggedIn() && <Route path="/" exact component={Home} />}

            <Route path="/" exact component={Dashboard} />
            <Route path="/:id" component={EarthieDetail} />
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
