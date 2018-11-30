import React, { Component } from "react";
import apiAuth from "../../api/auth";
import { NavLink } from "react-router-dom";
import SideNav from "./SideNav";

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  handleLogoutClick(e) {
    apiAuth.logout();
  }

  render() {
    return (
      <div>
        <div className="nav-bar-container">
          <div className="logo-el">
            <NavLink to="/">
              <img
                src="/images/micro_temp_inverted.png"
                height="40px"
                alt="Logo"
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

          <SideNav />
        </div>
      </div>
    );
  }
}
