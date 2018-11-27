import React from "react";
import { Button } from "antd";

export default function Home() {
  return (
    <div className="home-page">
      <div className="commands">
        <div className="title">
          <h1>EARTHCHI P</h1>
        </div>
        <div className="buttons">
          {/* <Button type="default" size="large" ghost>
            Sign Up
          </Button>
          <Button type="default" size="large" ghost>
            Log In
          </Button> */}
        </div>
      </div>

      <div className="logo">
        <div>
          <span class="pulse" />
        </div>
        <div>
          <img src="./images/micro_temp.png" alt="chip png" />
        </div>
      </div>
    </div>
  );
}
