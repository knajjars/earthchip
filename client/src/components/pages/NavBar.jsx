import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import apiAuth from "../../api/auth";

import { Route, Link, NavLink, Switch } from "react-router-dom";

const { Header } = Layout;

export default class NavBar extends Component {
  handleLogoutClick(e) {
    apiAuth.logout();
  }
  render() {
    return (
      <div>
        <Layout>
          <Header style={{ zIndex: 1, width: "100%" }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
              <Menu.Item key="1">
                <NavLink to="/" exact>
                  Home
                </NavLink>
              </Menu.Item>
              <Menu.Item key="5">
                <NavLink
                  to="/api/register-chip?macAddress=06-00-00-00-00-01"
                  exact
                >
                  Register Device
                </NavLink>
              </Menu.Item>
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
          </Header>
        </Layout>
      </div>
    );
  }
}