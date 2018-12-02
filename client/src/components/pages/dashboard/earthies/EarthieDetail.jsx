import React, { Component } from "react";
import TimeLine from "./EarthieTimeline";
import { Spin, Icon, Divider } from "antd";
import { Link } from "react-router-dom";
import EarthieHistory from "./EarthieHistory";
export default class EarthieDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderEarthie() {
    if (!this.props.earthie) {
      return <Spin />;
    } else {
      let plantHealth = Math.round(this.props.earthie.plantHealth);
      let currentMoisture = Math.round(this.props.earthie.currentMoisture);
      let currentTemperature = Math.round(
        this.props.earthie.currentEnvironmentTemp
      );
      let currentHumidity = Math.round(
        this.props.earthie.currentEnvironmentHumidity
      );

      return (
        <div className="earthie-details">
          <div className="earthie-details-buttons">
            <Link to="/">
              <Icon type="arrow-left" className="button-earthie-details" />
            </Link>
            <Link
              to={`/earthie/${this.props.earthie.macAddress}/settings`}
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
          <div className="earthie-details-photo-timeline">
            <div className="earthie-details-flex-column">
              <img
                src={this.props.earthie.imageURL}
                alt={this.props.earthie.plantname}
                style={{ width: 300, height: 400, objectFit: "cover" }}
              />
              <h1 className="moon-bold bold">{this.props.earthie.plantName}</h1>
            </div>
            <div className="earthie-details-flex-column">
              <h3 className="bold">
                <Icon type="calendar" theme="filled" /> Timeline projection
              </h3>
              <Divider />
              <TimeLine earthie={this.props.earthie} />
            </div>
          </div>
          <div className="earthie-details-metrics-history">
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
                  <span className="moon-bold bold">{currentTemperature}°C</span>
                </div>
              </div>
            </div>
            <div>
              <EarthieHistory earthie={this.props.earthie} />
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
