import React, { Component } from "react";
import TimeLine from "./EarthieTimeline";
import { Spin, Icon, Divider } from "antd";
import { Link } from "react-router-dom";
import EarthieHistory from "./EarthieHistory";
import DeleteButton from "../../../utils/DeleteButton";
import { connect } from "react-redux";
import { getOneEarthie } from "../../../../actions";
class EarthieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earthie: this.props.earthie,
      macAddress: this.props.macAddress.pathname.includes("/earthie/")
        ? this.props.macAddress.pathname.replace("/earthie/", "")
        : null,
      isMobile: false
    };
    this.intervalId = null;
  }

  updateDimensions() {
    if (window.innerWidth <= 730) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  }

  componentDidMount() {
    console.log(this.state.macAddress);
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.props
      .getOneEarthie(this.state.macAddress)
      .catch(err => console.log(err));

    this.intervalId = setInterval(() => {
      this.props.getOneEarthie(this.state.macAddress).catch(err => {
        console.log(err);
      });
    }, 10000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  renderEarthie() {
    if (!this.props.oneEarthie || !this.props.oneEarthie.plantHealth) {
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
          <DeleteButton isDark={true} macAddress={this.state.macAddress} />
        </div>
      );
    } else {
      let plantHealth = Math.round(this.props.oneEarthie.plantHealth);
      let currentMoisture = Math.round(this.props.oneEarthie.currentMoisture);
      let currentTemperature = Math.round(
        this.props.oneEarthie.currentEnvironmentTemp
      );
      let currentHumidity = Math.round(
        this.props.oneEarthie.currentEnvironmentHumidity
      );

      return (
        <div className="earthie-details">
          <div className="earthie-details-buttons">
            <Link to="/">
              <Icon type="left-circle" className="button-earthie-details" />
            </Link>
            <Link
              to={`/earthie/${this.props.oneEarthie.macAddress}/settings`}
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
                  src={this.props.oneEarthie.imageURL}
                  alt={this.props.oneEarthie.plantname}
                  style={{ width: 300, height: 400, objectFit: "cover" }}
                />
                <h1 className="moon-bold bold">
                  {this.props.oneEarthie.plantName}
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
                <TimeLine earthie={this.props.oneEarthie} />
              </div>
              {!this.state.isMobile && (
                <div>
                  <EarthieHistory earthie={this.props.oneEarthie} />
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

const mapStateToProps = state => {
  return { oneEarthie: state.getOneEarthie };
};

export default connect(
  mapStateToProps,
  { getOneEarthie }
)(EarthieDetail);
