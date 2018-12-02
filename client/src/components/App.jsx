import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import apiAuth from "../api/auth";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NavBar from "./pages/navbar/NavBar";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import RegisterDevice from "./pages/navbar/RegisterDevice";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      apiAuth.isLoggedIn === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: props.path,
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  handleRecieve = search => {
    console.log("HELLO", search);
    this.setState({
      search
    });
  };
  // componentDidMount = search => {
  //   console.log(search);
  // };
  // console.log("STATE", this.state.search);

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
            {/* {!apiAuth.isLoggedIn() && (
              <Route
                path="/api/register-chip/"
                render={props => (
                  <Signup {...props} recieveSearch={this.handleRecieve} />
                )}
              />
            )} */}
            <PrivateRoute path={this.state.search} component={RegisterDevice} />

            <Route path="/" component={Dashboard} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
