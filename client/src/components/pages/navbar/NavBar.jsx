import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import apiAuth from "../../../api/auth";
import SideNav from "../register-device/SideNav";

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isMobile: false
    };
  }

  handleLogoutClick(e) {
    apiAuth.logout();
  }

  updateDimensions() {
    if (window.innerWidth <= 730) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    return (
      <div>
        <div className="nav-bar-container">
          <div className="logo-el">
            <NavLink to="/">
              <img
                alt="Logo"
                src="/images/micro_temp_inverted.png"
                height="40px"
              />{" "}
              <span>EarthChip</span>
            </NavLink>
          </div>

          <div className="user-el">
            <NavLink className="login" to="/login">
              Log In
            </NavLink>
            <NavLink className="signup" to="/signup">
              Sign Up
            </NavLink>
          </div>

          {this.state.isMobile && <SideNav />}
        </div>
      </div>
    );
  }
}
