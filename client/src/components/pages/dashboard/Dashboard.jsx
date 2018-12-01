import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { NavLink, Route, Switch } from "react-router-dom";
import apiAuth from "../../../api/auth";
import EarthieList from "./earthies/EarthieList";
import EarthieDetail from "./earthies/EarthieDetail";

const { Content, Sider } = Layout;
export default class Dashboard extends Component {
  state = {
    collapsed: true,
    active: this.props.match.path,
    selectedEarthie: null
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

  handleEarthieClick = (e, earthie) => {
    this.setState({
      selectedEarthie: earthie
    });
  };

  handleBackClick = () => {
    this.setState({
      selectedEarthie: null
    });
  };

  renderContent() {
    if (!this.state.selectedEarthie) {
      return (
        <div className="chips-container">
          <EarthieList onEarthieClick={this.handleEarthieClick} />
        </div>
      );
    } else {
      return (
        <div className="chips-container">
          <EarthieDetail
            onBackClick={this.handleBackClick}
            earthie={this.state.selectedEarthie}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
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
              {this.renderContent()}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
