import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import apiAuth from "../../api/auth";

import { NavLink } from "react-router-dom";

const { Header } = Layout;

export default class NavBar extends Component {
  handleLogoutClick(e) {
    apiAuth.logout();
  }
  render() {
    return (
      <div>
        <div className="nav-bar-container">
          <div className="logo-el">
            <img src="/images/micro_temp.png" height="40px" />{" "}
            <span>EarthChip</span>
          </div>

          <div className="user-el">
            <a href="/signup">Sign Up</a>
            <a href="/login">Log In</a>
          </div>

          <Icon type="bars" className="menu-icon" />

          <div className="sidenav">
            <div className="user-el">
              <a href="/signup">Sign Up</a>
              <a href="/login">Log In</a>
            </div>
          </div>
        </div>
        {/* <Layout className="navbar-container">
          <Header style={{ zIndex: 1, width: "100%" }}>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{
                lineHeight: "64px"
              }}
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item key="1">
                <NavLink to="/">
                  <img src="/images/micro_temp_inverted.png" height="30px" />{" "}
                  EarthChip
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/signup">Sign Up</NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <NavLink to="/login">Log In</NavLink>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout> */}
      </div>
    );
  }
}
