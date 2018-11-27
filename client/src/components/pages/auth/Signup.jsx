import React, { Component } from "react";
import { Icon } from "antd";
import api from "../../../api/auth";
import NotificationMessage from "../../utils/NotificationMessage";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      themes: {
        email: "outlined",
        password: "outlined",
        name: "outlined"
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
    let data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    };
    api
      .signup(data)
      .then(res => {
        if (res.status === 200) {
          NotificationMessage({
            type: "success",
            message: `Welcome, ${JSON.parse(localStorage.user).name}!`,
            description: "Account created succesfully."
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
          <h1 className="brand-title">EarthChip</h1>
        </div>
        <h2>
          Welcome to <span className="bold">Earth Chip</span>.
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
            <Icon type="smile" theme={this.state.themes.name} style={style} />
            <input
              value={this.state.name}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              name="name"
              type="text"
              placeholder="Name"
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
            <button type="submit" className="button-form">
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
