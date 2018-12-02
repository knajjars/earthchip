import React from "react";
import { Card } from "antd";
const { Meta } = Card;

export default class Earthie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      earthieProps: []
    };
  }

  plantHealth() {
    let pulseColor;
    if (this.props.earthie.plantHealth >= 80) {
      pulseColor = "#4d946e";
    } else if (this.props.earthie.plantHealth >= 60) {
      pulseColor = "#ffc300";
    } else {
      pulseColor = "#c70039";
    }

    if (!this.props.earthie.currentMoisture) {
      return (
        <div className="plant-health-pulse">
          <span className="pulse" style={{ background: "lightgrey" }} />
          <div className="plant-health-info">Offline</div>
        </div>
      );
    }
    return (
      <div className="plant-health-pulse">
        <span className="pulse" style={{ background: pulseColor }} />
        <div className="plant-health-info">
          Health{" "}
          <span
            className="bold"
            style={{ fontFamily: "MoonBold", fontSize: "1.2rem" }}
          >
            {Math.floor(this.props.earthie.plantHealth)} pts.
          </span>
        </div>
      </div>
    );
  }

  roomEnvironment() {
    return (
      <div>
        <div className="room-environment">
          <div className="room-environment-metrics">
            <span>
              Moisture:{" "}
              <span className="bold">
                {Math.round(this.props.earthie.currentMoisture)}%
              </span>
              <br />
              Temp:{" "}
              <span className="bold">
                {Math.round(this.props.earthie.currentEnvironmentTemp)}°C
              </span>
              {" | "}
              Humidity:{" "}
              <span className="bold">
                {Math.round(this.props.earthie.currentEnvironmentHumidity)}%
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  renderInfo() {
    return (
      <div className="earthie-card-content">
        {/* {this.plantHealth()} */}
        <span className="moon-bold bold">{this.props.earthie.plantName}</span>
        {this.roomEnvironment()}
      </div>
    );
  }

  renderCard() {
    if (!this.props.earthie.currentMoisture) {
      return (
        <div>
          No information reported. <br />
          <small>Device might be offline.</small>
        </div>
      );
    } else {
      return this.renderInfo();
    }
  }

  render() {
    return (
      <Card
        bordered
        loading={this.props.isLoading}
        onClick={e => this.props.onEarthieClick(e, this.props.earthie)}
        hoverable
        className="earthie-item"
        style={{ width: 300 }}
        cover={
          <img
            alt={this.props.earthie.plantName}
            src={this.props.earthie.imageURL}
            style={{ width: "100%", height: 350, objectFit: "cover" }}
          />
        }
      >
        <Meta
          style={{ height: "70px" }}
          title={this.plantHealth()}
          description={this.renderCard()}
        />
      </Card>
    );
  }
}
