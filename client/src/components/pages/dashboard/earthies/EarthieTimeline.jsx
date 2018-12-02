import React from "react";
import { Timeline, Icon } from "antd";

export default function TimeLine(props) {
  let lastWatered = new Date(props.earthie.lastWatered);
  let suggestedWateringDate = new Date(props.earthie.suggestedWateringDate);
  let criticalWateringDate = new Date(props.earthie.criticalWateringDate);
  let plantHealth = Math.round(props.earthie.plantHealth);

  return (
    <div>
      <Timeline mode="alternate" style={{ width: "300px" }}>
        <Timeline.Item>
          Last watered
          <span className="bold">
            <br />
            {lastWatered.toDateString()}
          </span>
        </Timeline.Item>
        <Timeline.Item
          style={{ backgroundColor: "transparent" }}
          dot={
            <Icon
              theme="filled"
              type="heart"
              style={{ fontSize: "14px", color: "red" }}
            />
          }
        >
          Plant health <span className="moon-bold bold">{plantHealth}</span>
        </Timeline.Item>
        <Timeline.Item color="green">
          Next watering date
          <span className="bold">
            <br />
            {suggestedWateringDate.toDateString()}
          </span>
        </Timeline.Item>
        <Timeline.Item color="red">
          Critical watering date
          <span className="bold">
            <br />
            {criticalWateringDate.toDateString()}
          </span>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
