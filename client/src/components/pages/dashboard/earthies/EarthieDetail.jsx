import React, { Component } from "react";
import TimeLine from "./EarthieTimeline";
import { Spin, Icon } from "antd";
import { Link } from "react-router-dom";
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
          <Link to="/">
            <Icon type="arrow-left" className="back-button-earthie-details" />
            <TimeLine earthie={this.props.earthie} />
          </Link>
        </div>
      );
    }
  }
  render() {
    return this.renderEarthie();
  }
}
