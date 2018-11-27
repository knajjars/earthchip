import React from "react";
import { Card, Icon } from "antd";

const { Meta } = Card;

export default function Earthie(props) {
  return (
    <Card
      className="earthie-item"
      style={{ width: 300 }}
      cover={
        <img
          alt={props.earthie.plantName}
          src={props.earthie.imageURL}
          style={{ width: 300, height: 350, objectFit: "cover" }}
        />
      }
      actions={[
        <Icon type="setting" />,
        <Icon type="edit" />,
        <Icon type="ellipsis" />
      ]}
    >
      <Meta
        title={props.earthie.plantName}
        description="This is the description"
      />
    </Card>
  );
}
