import React from "react";
import { Card, Icon } from "antd";
import api from "../../../../api/data";
const { Meta } = Card;

export default class Earthie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      earthieProps: []
    };
  }

  render() {
    return (
      <Card
        className="earthie-item"
        style={{ width: 300 }}
        cover={
          <img
            alt={this.props.earthie.plantName}
            src={this.props.earthie.imageURL}
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
          title={this.props.earthie.plantName}
          description={this.props.earthie.currentEnvironmentTemp}
        />
      </Card>
    );
  }
}
