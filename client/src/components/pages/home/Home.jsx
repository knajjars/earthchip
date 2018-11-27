import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";

export default function Home() {
  return (
    <div className="home-page">
      <div className="box">
        <h3>
          <Icon
            type="appstore"
            theme="filled"
            style={{ color: "white", fontSize: "22px" }}
          />{" "}
          Earthies
        </h3>
        <h1>Cloud plant analytics</h1>
        <div className="description">
          <p>
            More than just keeping track of your plants, we offer a secure
            platform with features for systematic monitoring and real-time
            alerts on plant health. <br />
            <span className="bold">This is EarthChip.</span>
          </p>
        </div>
        <div className="actions">
          <NavLink to="/signup">
            <button className="button-form">Sign up</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
