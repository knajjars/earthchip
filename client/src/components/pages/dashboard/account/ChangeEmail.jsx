import React, { Component } from "react";
import { Icon } from "antd";
import api from "../../../../api/auth";
import NotificationMessage from "../../../utils/NotificationMessage";

export default class ChangeEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldEmail: "",
      newEmail: "",
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
      .changeEmail(this.state.oldEmail, this.state.newEmail)
      .then(res => {
        if (res.status === 200) {
          NotificationMessage({
            type: "success",
            message: "Your email was updated successfully",
            description: "Email changed."
          });
          this.props.history.push("/"); // Redirect to the home page
        }
      })
      .catch(err => {
        NotificationMessage({
          type: "error",
          message: err.message,
          description: "Something went wrong"
        });
      });
  };

  componentDidMount = () => {
    console.log(this.props);
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
              value={api.isLoggedIn.email}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              name="oldEmail"
              type="email"
              placeholder="Old Email"
              required
            />
          </div>
          <div className="form-field">
            <Icon type="lock" theme={this.state.themes.email} style={style} />
            <input
              value={this.state.newEmail}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              name="newEmail"
              type="email"
              placeholder="New Email"
              required
            />
          </div>
          <div className="form-field">
            <button type="submit" className="button-form">
              Change Email
            </button>
          </div>
        </form>
      </div>
    );
  }
}
