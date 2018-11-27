import React, { Component } from "react";
import "./style/chips.css";

export default class ChipDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log(this.props.secret);
    return (
      <div>
        <h1>GOODBYE</h1>
        <h1>{this.props.secret}</h1>
      </div>
    );
  }
}
