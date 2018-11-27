import React, { Component } from "react";
import "./style/chips.css";
import { Button, Icon } from "antd";
import { Link } from "react-router-dom";
import ChipDetail from "./ChipDetail";

export default class Chip extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="main">
        <div class="tabs">
          <div class="tab1">
            <Icon type="border" />
          </div>
          <div class="tab2">
            <Icon type="pie-chart" />
          </div>
        </div>

        <div class="body">
          <div class="image">
            <Link
              to={"/dashboard/" + this.props.id}
              secret="HELLO"
              component={ChipDetail}
            >
              <img
                src="https://images.unsplash.com/photo-1532636881604-d9d1a983fc73?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3488f2032537813b91e3d9db1b157907&auto=format&fit=crop&w=2248&q=80"
                alt=""
              />
            </Link>
          </div>

          <div>
            <h2>HELLO</h2>
            <h4>{this.props.secret}</h4>
          </div>
        </div>
      </div>
    );
  }
}
