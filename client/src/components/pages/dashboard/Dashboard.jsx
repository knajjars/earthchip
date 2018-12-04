import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { NavLink, Route, Link } from "react-router-dom";
import apiAuth from "../../../api/auth";
import EarthieList from "./earthies/EarthieList";
import EarthieDetail from "./earthies/EarthieDetail";
import EarthieSettings from "./earthies/EarthieSettings";
import Clock from "./clock/Clock";

import AccountPage from "./account/AccountPage";

const { Content, Sider } = Layout;
export default class Dashboard extends Component {
  state = {
    active: this.props.match.path,
    selectedEarthie: null,
    salute: null
  };

  componentDidMount() {
    let now = new Date();
    let salute;
    if (now.getHours() > 18) {
      salute = "evening";
    } else if (now.getHours() > 12) {
      salute = "day";
    } else {
      salute = "morning";
    }
    this.setState({
      salute: salute
    });
  }

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
      <div className="dashboard-main chips-container">
        <div className="salute">
          <h2>
            Good {this.state.salute},{" "}
            <span className="capitalize">
              {JSON.parse(localStorage.user).name} it's
            </span>
          </h2>{" "}
          <Clock />
        </div>
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

              <Menu.Item key="/account">
                <Link to="/account">
                  <Icon type="setting" />
                  <span>Account</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="/logout">
                <NavLink onClick={this.handleLogoutClick} to="/">
                  <Icon type="logout" />
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
                path="/earthie/:macAddress"
                render={() => this.renderDetail()}
              />
              <Route
                path="/earthie/:macAddress/settings"
                component={EarthieSettings}
              />
              <div className="footer">
                <div className="perm-logo">
                  <p>Powered by EarthChip</p>
                  <img src="/images/micro_temp_inverted.png" alt="Logo" />
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
