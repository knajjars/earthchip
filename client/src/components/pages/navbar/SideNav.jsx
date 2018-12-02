import React from "react";
import { NavLink } from "react-router-dom";
import { Drawer, Icon } from "antd";

export default class SideNav extends React.Component {
  state = { visible: false, placement: "right" };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Icon type="bars" className="menu-icon" onClick={this.showDrawer} />
        <Drawer
          title="EarthChip"
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <NavLink className="login" to="/login" onClick={this.onClose}>
            <h2>Log In</h2>
          </NavLink>
          <NavLink className="signup" to="/signup" onClick={this.onClose}>
            <h2>Sign Up</h2>
          </NavLink>
        </Drawer>
      </div>
    );
  }
}
