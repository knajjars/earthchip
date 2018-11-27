import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import apiAuth from "../../api/auth";
import { Route, Link, NavLink, Switch } from "react-router-dom";

export default function NavBarOptions() {
  return (
    <div>
      <Menu>
        {!apiAuth.isLoggedIn() && (
          <Menu.Item key="1">
            <NavLink to="/" exact>
              Home
            </NavLink>
          </Menu.Item>
        )}

        {!apiAuth.isLoggedIn() && (
          <Menu.Item key="3">
            <NavLink to="/signup">Sign Up</NavLink>
          </Menu.Item>
        )}
        {!apiAuth.isLoggedIn() && (
          <Menu.Item key="2">
            <NavLink to="/login">Log In</NavLink>
          </Menu.Item>
        )}
        {apiAuth.isLoggedIn() && (
          <Menu.Item key="4">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Menu.Item>
        )}
        {apiAuth.isLoggedIn() && (
          <Menu.Item key="5">
            <NavLink onClick={this.handleLogoutClick} to="/">
              Log Out
            </NavLink>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
}
