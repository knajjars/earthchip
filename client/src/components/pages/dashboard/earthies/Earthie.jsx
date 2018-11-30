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

  render() {
    let pulseColor;
    if (this.props.earthie.plantHealth >= 80) {
      pulseColor = "#4d946e";
    } else if (this.props.earthie.plantHealth >= 60) {
      pulseColor = "#ffc300";
    } else {
      pulseColor = "#c70039";
    }
    const plantHealth = (
      <div className="plant-health-pulse">
        <span className="pulse" style={{ background: pulseColor }} />
        <div className="plant-health-info">
          Plant health
          <span className="bold">
            {" "}
            {Math.floor(this.props.earthie.plantHealth)}
          </span>
        </div>
      </div>
    );

    const roomEnvironment = (
      <div>
        <div className="room-environment">
          <Icon type="dashboard" />
          <div className="room-environment-metrics">
            <span>
              Room temperature:{" "}
              <span className="bold">
                {this.props.earthie.currentEnvironmentTemp}
              </span>
            </span>
            <span>
              Room humidity:{" "}
              <span className="bold">
                {this.props.earthie.currentEnvironmentHumidity}
              </span>
            </span>
          </div>
        </div>
      </div>
    );

    const renderCard = (
      <div className="earthie-card-content">
        {plantHealth}
        {roomEnvironment}
      </div>
    );

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
        <Meta title={this.props.earthie.plantName} description={renderCard} />
      </Card>
    );
  }
}
