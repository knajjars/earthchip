import React, { Component } from "react";
import Earthie from "./Earthie";
import { Icon } from "antd";
import api from "../../../../api/earthie";

export default class EarthieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earthies: []
    };
  }
  componentDidMount() {
    api.getEarthies().then(res => {
      this.setState({
        earthies: res.data
      });
    });
  }

  renderEarthies() {
    if (this.state.earthies.length > 0) {
      return (
        <div className="earthies-list">
          {this.state.earthies.map(earthie => (
            <Earthie key={earthie._id} earthie={earthie} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="no-device-message">
          <h3>
            You dont have any Earthies registered to your account, start
            tracking your plants simply by scanning the QR code in the box.
          </h3>
          <Icon type="rocket" theme="twoTone" style={{ fontSize: 300 }} />,
        </div>
      );
    }
  }
  render() {
    return this.renderEarthies();
  }
}
