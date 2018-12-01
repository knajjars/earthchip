import React, { Component } from "react";
import TimeLine from "./EarthieTimeline";
import { Spin, Icon } from "antd";

export default class EarthieDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderEarthie() {
    if (!this.props.earthie) {
      return <Spin />;
    } else {
      return (
        <div className="earthie-details">
          <Icon
            onClick={this.props.onBackClick}
            type="arrow-left"
            className="back-button-earthie-details"
          />
          <TimeLine earthie={this.props.earthie} />
        </div>
      );
    }
  }
  render() {
    return this.renderEarthie();
  }
}
