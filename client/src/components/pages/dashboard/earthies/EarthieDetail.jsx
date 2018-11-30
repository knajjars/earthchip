import React, { Component } from "react";
import api from "../../../../api/earthie";
import TimeLine from "./EarthieTimeline";
import { Spin, Icon } from "antd";

export default class EarthieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earthie: null
    };
  }

  componentDidMount() {
    const macAddress = this.props.match.params.macAddress;
    api
      .getOneEarthie(macAddress)
      .then(res => {
        this.setState({
          earthie: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderEarthie() {
    if (!this.state.earthie) {
      return <Spin />;
    } else {
      return (
        <div>
          <Icon type="arrow-left" />
          <TimeLine earthie={this.state.earthie} />
        </div>
      );
    }
  }
  render() {
    return this.renderEarthie();
  }
}
