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
    this.state = {
      search: ""
    };
  }

  handleRecieve = search => {
    this.setState({
      search
    });
  };

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
            <Route
              path="/signup"
              render={props => (
                <Signup {...props} recieveSearch={this.handleRecieve} />
              )}
            />
            <Route path="/login" component={Login} />
            {!apiAuth.isLoggedIn() && <Route path="/" exact component={Home} />}
            {!apiAuth.isLoggedIn() && (
              <Route
                path="/api/register-chip/"
                render={props => (
                  <Login {...props} recieveSearch={this.handleRecieve} />
                )}
              />
            )}
            <Route path="/api/register-chip" component={RegisterDevice} />
            <Route path="/" component={Dashboard} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
