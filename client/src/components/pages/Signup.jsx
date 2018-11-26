import React, { Component } from "react";
import { Button, Icon } from "antd";
import api from "../../api/auth";
import NotificationMessage from "../utils/NotificationMessage";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: ""
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

  render() {
    return (
      <form className="form-container" onSubmit={this.handleSubmit}>
        <div className="form-field">
          <Icon type="mail" />
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-field">
          <Icon type="user" />
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-field">
          <Icon type="lock" />
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-field">
          <input type="submit" value="Signup!" />
        </div>
      </form>
    );
  }
}
