import React from "react";
import { Card, Icon } from "antd";
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
    return (
      <div className="plant-health-pulse">
        <span className="pulse" style={{ background: pulseColor }} />
        <div className="plant-health-info">
          Plant health{" "}
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
          <Icon type="dashboard" />
          <div className="room-environment-metrics">
            <span>
              Room temperature:{" "}
              <span className="bold">
                {Math.round(this.props.earthie.currentEnvironmentTemp)}°C
              </span>
            </span>
            <span>
              Room humidity:{" "}
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
        {this.plantHealth()}
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
          title={this.props.earthie.plantName}
          description={this.renderCard()}
        />
      </Card>
    );
  }
}
