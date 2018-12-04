import React, { Component } from "react";
import TimeLine from "./EarthieTimeline";
import { Spin, Icon, Divider } from "antd";
import { Link } from "react-router-dom";
import EarthieHistory from "./EarthieHistory";
import api from "../../../../api/earthie";
import DeleteButton from "../../../utils/DeleteButton";

export default class EarthieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earthie: this.props.earthie,
      macAddress: this.props.macAddress.pathname.includes("/earthie/")
        ? this.props.macAddress.pathname.replace("/earthie/", "")
        : null,
      isMobile: false
    };
  }

  updateDimensions() {
    if (window.innerWidth <= 730) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    if (!this.state.earthie) {
      api
        .getOneEarthie(this.state.macAddress)
        .then(res => {
          this.setState({
            earthie: res.data
          });
        })
        .catch(err => console.log(err));
    }
  }

  renderEarthie() {
    if (!this.state.earthie || !this.state.earthie.plantHealth) {
      return (
        <div className="offline-device-details">
          <h1>Device might be offline :(</h1>
          <p>Please check that the Earthie is connected to the Wifi.</p>
          <Spin size="large" />
          <Link to="/">
            <Icon
              type="left-circle"
              className="button-earthie-details"
              style={{ fontSize: "50px", margin: "20px 0 " }}
            />
          </Link>
          <DeleteButton macAddress={this.state.macAddress} />
        </div>
      );
    } else {
      let plantHealth = Math.round(this.state.earthie.plantHealth);
      let currentMoisture = Math.round(this.state.earthie.currentMoisture);
      let currentTemperature = Math.round(
        this.state.earthie.currentEnvironmentTemp
      );
      let currentHumidity = Math.round(
        this.state.earthie.currentEnvironmentHumidity
      );

      return (
        <div className="earthie-details">
          <div className="earthie-details-buttons">
            <Link to="/">
              <Icon type="left-circle" className="button-earthie-details" />
            </Link>
            <Link
              to={`/earthie/${this.state.earthie.macAddress}/settings`}
              className="settings-button"
            >
              Settings
              <Icon
                theme="filled"
                type="setting"
                className="button-earthie-details"
              />
            </Link>
          </div>
          <div className="earthie-details-data">
            <div className="earthie-details-photo-timeline">
              <div className="earthie-details-flex-column">
                <img
                  src={this.state.earthie.imageURL}
                  alt={this.state.earthie.plantname}
                  style={{ width: 300, height: 400, objectFit: "cover" }}
                />
                <h1 className="moon-bold bold">
                  {this.state.earthie.plantName}
                </h1>
              </div>
              <div className="earthie-details-metrics">
                <div>
                  <h3
                    className="bold"
                    style={{ fontSize: "1.1rem", textAlign: "center" }}
                  >
                    <Icon theme="filled" type="dashboard" /> Metrics
                  </h3>
                </div>
                <Divider />
                <div>
                  <Icon type="heart" theme="filled" /> Plant current health:{" "}
                  <span className="moon-bold bold">{plantHealth}pts.</span>
                </div>
                <div>
                  <Icon type="filter" theme="filled" /> Current moisture:{" "}
                  <span className="moon-bold bold">{currentMoisture}%</span>
                </div>
                <div>
                  <Icon type="cloud" theme="filled" /> Room humidity:{" "}
                  <span className="moon-bold bold">{currentHumidity}%</span>
                </div>
                <div>
                  <div>
                    <Icon type="bulb" theme="filled" /> Room temperature:{" "}
                    <span className="moon-bold bold">
                      {currentTemperature}°C
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="earthie-details-metrics-history">
              <div className="earthie-details-flex-column">
                <h3 className="bold">
                  <Icon type="calendar" theme="filled" /> Timeline projection
                </h3>
                <Divider />
                <TimeLine earthie={this.state.earthie} />
              </div>
              {!this.state.isMobile && (
                <div>
                  <EarthieHistory earthie={this.state.earthie} />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return this.renderEarthie();
  }
}
