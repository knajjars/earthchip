import React, { Component } from "react";
import moment from "moment";

export default class Clock extends Component {
  constructor() {
    super();
    this.state = {
      time: moment().format("LTS"),
      one: true,
      two: false,
      three: false,
      four: false,
      class: ""
    };
    this.clicked = this.clicked.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.one === true) {
        this.setState({
          time: moment().format("LTS")
        });
      } else if (this.state.four === true) {
        this.setState({
          time: moment().format("LT")
        });
      }
    }, 1000);
  }
  clicked() {
    if (this.state.one === true) {
      this.setState({ class: "faded" });
      setTimeout(() => {
        this.setState({
          time: moment().format("l"),
          one: false,
          two: true,
          class: ""
        });
      }, 200);
    } else if (this.state.two === true) {
      this.setState({ class: "faded" });
      setTimeout(() => {
        this.setState({
          time: moment().format("MMMM Do YY"),
          two: false,
          three: true,
          class: ""
        });
      }, 200);
    } else if (this.state.three === true) {
      this.setState({ class: "faded" });
      setTimeout(() => {
        this.setState({
          time: moment().format("LT"),
          three: false,
          four: true,
          class: ""
        });
      }, 200);
    } else if (this.state.four === true) {
      this.setState({ class: "faded" });
      setTimeout(() => {
        this.setState({
          time: moment().format("LTS"),
          four: false,
          one: true,
          class: ""
        });
      }, 200);
    }
  }
  render() {
    return (
      <div id="clock" onClick={this.clicked}>
        <h1 className={this.state.class}>{this.state.time}</h1>
      </div>
    );
  }
}
