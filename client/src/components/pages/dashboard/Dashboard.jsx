import React, { Component } from "react";
import { Layout, Menu, Icon, Switch } from "antd";
import { NavLink, Route, Link } from "react-router-dom";
import apiAuth from "../../../api/auth";
import EarthieList from "./earthies/EarthieList";
import EarthieDetail from "./earthies/EarthieDetail";
import EarthieSettings from "./earthies/EarthieSettings";
import RegisterDevice from "../register-device/RegisterDevice";
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
        <EarthieDetail
          earthie={this.state.selectedEarthie}
          macAddress={this.props.location}
        />
      </div>
    );
  }

  renderEarthieSettings() {
    return (
      <div className="chips-container">
        <EarthieSettings
          earthie={this.state.selectedEarthie}
          macAddress={this.props.location}
        />
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
    let { pathname } = this.props.location;
    console.log();
    let removeSider =
      pathname.includes("earthie") && window.innerWidth < 400 ? "hidden" : "";
    let removeSiderMargin =
      pathname.includes("earthie") && window.innerWidth < 400
        ? "margin-zero"
        : "";
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            className={removeSider}
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

              <Menu.Item key="/logout">
                <NavLink onClick={this.handleLogoutClick} to="/">
                  <Icon type="file" />
                  <span>Log Out</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content className={"sider-margin-correction " + removeSiderMargin}>
              <Route exact path="/" render={() => this.renderContent()} />

              <Route path="/account" component={AccountPage} />

              <Route
                exact
                path="/notification"
                render={() => this.renderAlerts()}
              />
              <Route
                exact
                path="/earthie/:macAddress"
                render={() => this.renderDetail()}
              />
              <Route
                path="/earthie/:macAddress/settings"
                component={EarthieSettings}
              />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
