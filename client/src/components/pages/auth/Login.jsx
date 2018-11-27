import React, { Component } from "react";
import { Button, Icon } from "antd";
import api from "../../../api/auth";
import NotificationMessage from "../../utils/NotificationMessage";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      themes: {
        email: "outlined",
        password: "outlined"
      }
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    api
      .login(this.state.email, this.state.password)
      .then(res => {
        if (res.status === 200) {
          NotificationMessage({
            type: "success",
            message: `Welcome Back, ${JSON.parse(localStorage.user).name}`,
            description: "Logged succesfully."
          });
          this.props.history.push("/"); // Redirect to the home page
        }
      })
      .catch(err => {
        NotificationMessage({
          type: "error",
          message: "Something went wrong.",
          description: err
        });
      });
  };

  handleFocus = e => {
    this.setState({
      themes: {
        name: "outlined",
        email: "outlined",
        password: "outlined",
        [e.target.name]: "filled"
      }
    });
  };

  render() {
    let style = { fontSize: "22px" };
    return (
      <div className="form-container">
        <div>
          <h1 className="brand-title">EARTHCHIP</h1>
        </div>
        <h2>
          Welcome back to <span className="bold">Earth Chip</span>, please enter
          credentials.
        </h2>
        <form className="form-component" onSubmit={this.handleSubmit}>
          <div className="form-field">
            <Icon type="mail" theme={this.state.themes.email} style={style} />
            <input
              value={this.state.email}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-field">
            <Icon
              type="lock"
              theme={this.state.themes.password}
              style={style}
            />
            <input
              value={this.state.password}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-field">
            <Button htmlType="submit" type="primary">
              Log in
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
