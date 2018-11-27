import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import apiAuth from "../../api/auth";

const { Header, Content, Footer } = Layout;

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
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <NavLink to="/" exact>
                  Home
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
