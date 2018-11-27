import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";
import apiAuth from "../../../api/auth";
import EarthieList from "./earthies/EarthieList";

const { Content, Sider } = Layout;
export default class Dashboard extends Component {
  state = {
    collapsed: false,
    active: this.props.match.path
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  handleLogoutClick(e) {
    apiAuth.logout();
  }

  handleChange = e => {
    this.setState({
      active: this.props.match.path
    });
  };

  render() {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            width={300}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[this.state.active]}
              onClick={this.handleChange}
            >
              <Menu.Item key="/dashboard">
                <Icon type="appstore" />
                <span>Dashboard</span>
              </Menu.Item>
              <Menu.Item key="/notification">
                <Icon type="notification" />
                <span>Alerts</span>
              </Menu.Item>
              <Menu.Item key="/settings">
                <Icon type="setting" />
                <span>Settings</span>
              </Menu.Item>
              <Menu.Item key="/logout">
                <NavLink onClick={this.handleLogoutClick} to="/">
                  <Icon type="file" />
                  <span>Log Out</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content
              style={{ margin: "0 16px" }}
              className="dash-detail-container"
            >
              <div className="chips-container">
                <EarthieList />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
