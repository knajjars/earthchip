// import React, { Component } from 'react';

// class Home extends Component {
//   // constructor(props) {
//   //   super(props)
//   //   this.state = {
//   //   }
//   // }
//   render() {
//     return (
//       <div className="Home">
//         <h2>Home</h2>
//         <p>This is a sample project with the MERN stack</p>
//       </div>
//     );
//   }
// }

// export default Home;

import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Route, Link, NavLink, Switch } from "react-router-dom";
import apiAuth from "../../api/auth";

const { Header, Content, Footer } = Layout;

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Header style={{ zIndex: 1, width: "100%" }}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
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
                <Menu.Item key="1">
                  <NavLink to="/">Log Out</NavLink>
                </Menu.Item>
              )}
            </Menu>
          </Header>
        </Layout>
      </div>
    );
  }
}
