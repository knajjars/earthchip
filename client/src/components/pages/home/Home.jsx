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
        <h1>Cloud hosted plant analytics</h1>
        <div className="description">
          <p>
            Earthies generate real-time data on soil moisture as well as room
            temperature and humidity, so you can stay informed on the health of
            your plants <br />
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
