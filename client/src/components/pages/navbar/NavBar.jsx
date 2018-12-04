import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import apiAuth from "../../../api/auth";
import SideNav from "./SideNav";

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isMobile: false,
      isHover: false
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

  handleMouseEnter = () => {
    this.setState({
      isHover: !this.state.isHover
    });
  };

  handleMouseLeave = () => {
    console.log("left");
    this.setState({
      isHover: false
    });
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    // let { pathname, search } = this.props.history.location;
    // const registerRoute = pathname !== "/login" ? pathname + search : "/login";
    return (
      <div>
        <div className="nav-bar-container">
          <div className="logo-el">
            <NavLink
              to="/"
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <img
                alt="Logo"
                src={
                  this.state.isHover
                    ? "/images/micro_temp_hover.png"
                    : "/images/micro_temp_inverted.png"
                }
                height="55px"
              />
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
