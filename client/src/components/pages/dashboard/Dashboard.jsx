import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon, Row, Col } from "antd";
import { Route, Link, NavLink, Switch } from "react-router-dom";
import apiAuth from "../../../api/auth";
import NavBarOptions from "../NavBarOptions";
import Chip from "./Chip";
import ChipDetail from "./ChipDetail";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
export default class Dashboard extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  handleLogoutClick(e) {
    apiAuth.logout();
  }

  render() {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            width={300}
            // style={{ position: "fixed" }}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <Icon type="appstore" />
                <span>Chips</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="notification" />
                <span>Alerts</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="setting" />
                <span>Settings</span>
              </Menu.Item>
              <Menu.Item key="5">
                <NavLink onClick={this.handleLogoutClick} to="/login">
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
                <Chip id="fish" secret="WOWEEE" />
                <Chip id={2} secret="WOWEEE" />
              </div>

              <div className="chip-detail">
                <Route path="/dashboard/:chipId" component={ChipDetail} />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
