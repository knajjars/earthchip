import React, { Component } from "react";
import { Link } from "react-router-dom";
import Earthie from "./Earthie";
import { Icon } from "antd";
import api from "../../../../api/earthie";
export default class EarthieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earthies: [],
      earthieData: []
    };
  }

  componentDidMount() {
    api
      .getEarthies()
      .then(res => {
        this.setState({
          earthieData: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderEarthies() {
    if (this.state.earthieData.length > 0) {
      return (
        <div className="earthies-list">
          {this.state.earthieData.map(earthie => (
            <Link key={earthie._id} to={`/earthie/${earthie.macAddress}`}>
              <Earthie earthie={earthie} />
            </Link>
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
