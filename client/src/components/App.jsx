import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import apiAuth from "../api/auth";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NavBar from "./pages/navbar/NavBar";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import RegisterDevice from "./pages/register-device/RegisterDevice";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderApp() {
    if (!apiAuth.isLoggedIn()) {
      return (
        <div>
          <div className="nav">
            <NavBar />
          </div>
          <div className="body">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route path="/api/register-chip" component={Login} />
              <Route render={() => <h2>404</h2>} />
            </Switch>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="body">
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/api/register-chip" component={RegisterDevice} />
              <Route render={() => <h2>404</h2>} />
            </Switch>
          </div>
        </div>
      );
    }
  }
  render() {
    return <div className="App">{this.renderApp()}</div>;
  }
}

export default App;
