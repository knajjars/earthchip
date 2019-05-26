import React, { Component } from "react";
import Earthie from "./Earthie";
import { Icon } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEarthies } from "../../../../actions";

class EarthieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earthies: [],
      earthieData: []
    };
  }

  componentDidMount = () => {
    this.props.getEarthies().catch(err => console.log(err));
    this.intervalId = setInterval(() => {
      this.props.getEarthies().catch(err => console.log(err));
    }, 10000);
    console.log(this.props);
  };

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  renderEarthies() {
    if (this.props.earthieList.length > 0) {
      return (
        <div className="earthies-list">
          <div id="scroll-here" />
          {this.props.earthieList.map(earthie => (
            <Link key={earthie._id} to={"/earthie/" + earthie.macAddress}>
              <Earthie
                earthie={earthie}
                onEarthieClick={this.props.onEarthieClick}
                isLoading={this.state.isLoading}
              />
            </Link>
          ))}
        </div>
      );
    } else {
      return (
        <div className="no-device-message">
          <div id="scroll-here" />
          <h3>
            You dont have any Earthies registered to your account, start
            tracking your plants simply by scanning the QR code in the box.
          </h3>
          <Icon type="rocket" theme="twoTone" style={{ fontSize: 300 }} />
        </div>
      );
    }
  }
  render() {
    return this.renderEarthies();
  }
}

const mapStateToProps = state => {
  return { earthieList: state.earthieList };
};

export default connect(
  mapStateToProps,
  { getEarthies }
)(EarthieList);
