import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { NavLink, Route, Switch, Link } from "react-router-dom";
import apiAuth from "../../../api/auth";
import EarthieList from "./earthies/EarthieList";
import EarthieDetail from "./earthies/EarthieDetail";
import RegisterDevice from "../navbar/RegisterDevice";
import AccountPage from "./account/AccountPage";

const { Content, Sider } = Layout;
export default class Dashboard extends Component {
  state = {
    active: this.props.match.path,
    selectedEarthie: null
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

  renderContent() {
    return (
      <div className="chips-container">
        <EarthieList onEarthieClick={this.handleEarthieClick} />
      </div>
    );
  }
  renderDetail() {
    return (
      <div className="chips-container">
        <EarthieDetail earthie={this.state.selectedEarthie} />
      </div>
    );
  }

  renderAlerts() {
    return (
      <div>
        <h1>gasfjsfhslkfnsukfjsfnksjfb</h1>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsed
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
                <Link to="/">
                  <Icon type="appstore" />
                  <span>Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/notification">
                <Link to="/notification">
                  <Icon type="notification" />
                  <span>Notification</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/account">
                <Link to="/account">
                  <Icon type="setting" />
                  <span>Account</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/api/register-chip">
                <Link to="/api/register-chip">
                  <Icon type="register" />
                  <span>Register</span>
                </Link>
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
              style={{ margin: "0 0 0 80px" }}
              className="dash-detail-container"
            >
              <Route exact path="/" render={() => this.renderContent()} />
              <Route exact path="/account" component={AccountPage} />
              <Route
                exact
                path="/notification"
                render={() => this.renderAlerts()}
              />
              <Route
                exact
                path="/api/register-chip"
                component={RegisterDevice}
              />
              <Route
                path="/earthie/:macAddress"
                render={() => this.renderDetail()}
              />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
