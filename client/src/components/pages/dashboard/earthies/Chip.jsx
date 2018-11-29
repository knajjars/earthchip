import React, { Component } from "react";
import "./style/chips.css";
import { Icon } from "antd";
import { Link } from "react-router-dom";
import api from "../../../../api/data";
export default class Chip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earthieData: []
    };
  }

  render() {
    return (
      <div className="main">
        <div className="tabs">
          <div className="tab1">
            <Icon type="border" />
          </div>
          <div className="tab2">
            <Icon type="pie-chart" />
          </div>
        </div>
        <div className="body">
          <div className="image">
            <Link to={"/dashboard/" + this.props.id} secret="HELLO">
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
