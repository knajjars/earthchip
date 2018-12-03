import React, { Component } from "react";
import { Icon } from "antd";
import api from "../../../../api/auth";
import NotificationMessage from "../../../utils/NotificationMessage";
import { Link } from "react-router-dom";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
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
      .changePassword(this.state.oldPassword, this.state.newPassword)
      .then(res => {
        if (res.status === 200) {
          NotificationMessage({
            type: "success",
            message: "Your password was successfully changed",
            description: "Password changed."
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
        <form className="form-component" onSubmit={this.handleSubmit}>
          <div className="form-field">
            <Icon
              type="lock"
              theme={this.state.themes.password}
              style={style}
            />
            <input
              value={this.state.oldPassword}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              name="oldPassword"
              type="password"
              placeholder="Old Password"
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
              value={this.state.newPassword}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              name="newPassword"
              type="password"
              placeholder="New Password"
              required
            />
          </div>
          <div className="form-field">
            <button type="submit" className="button-form">
              Change password
            </button>
          </div>
          <Link to="/account">
            <Icon type="down-circle" style={{ fontSize: "30px" }} />
          </Link>
        </form>
      </div>
    );
  }
}
