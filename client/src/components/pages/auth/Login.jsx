import React, { Component } from "react";
import { Icon } from "antd";
import api from "../../../api/auth";
import NotificationMessage from "../../utils/NotificationMessage";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      search: this.props.history.location,
      themes: {
        email: "outlined",
        password: "outlined"
      },
      macAddress: this.props.location.search.includes("macAddress")
        ? this.props.location.search.replace("?macAddress=", "")
        : null
    };
  }
  componentDidMount = () => {
    console.log(this.state.search);
    console.log(this.props);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    let { pathname, search } = this.props.history.location;
    console.log(pathname + search, this.props);

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
          this.state.macAddress
            ? this.props.history.push(
                `/api/register-chip?macAddress=${this.state.macAddress}`
              )
            : this.props.history.push("/"); // Redirect to the home page
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
          Welcome back to <span className="bold">Earth Chip</span>.
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
            <button type="submit" className="button-form">
              Log in
            </button>
          </div>
          <p style={{ color: "#a6c5b4", fontFamily: "MoonBold" }}>
            Don't have an account yet? Sign up{" "}
            <Link
              to="/signup"
              style={{ color: "#f0f2f5", fontFamily: "MoonBold" }}
            >
              here
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
