import React, { Component } from "react";
import api from "../../../../api/earthie";
import { Divider, Icon, Table } from "antd";

export default class EarthieHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      historicData: []
    };
  }
  componentDidMount() {
    api
      .getHistoricData(this.props.earthie.macAddress)
      .then(res => {
        let data = res.data.map((res, i) => {
          let date = new Date(res.created_at);
          return {
            key: i,
            date: date.toDateString(),
            moisture: Math.round(res.soilMoisture),
            humidity: Math.round(res.environmentHumidity),
            temperature: Math.round(res.environmentTemp)
          };
        });
        this.setState({ historicData: data, isLoading: false });
      })
      .catch(err => console.log(err));
  }
  render() {
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        sorter: (a, b) => new Date(a.date) - new Date(b.date)
      },
      {
        title: "Moisture",
        dataIndex: "moisture",
        sorter: (a, b) => a.moisture - b.moisture
      },
      {
        title: "Temperature",
        dataIndex: "temperature",
        sorter: (a, b) => a.temperature - b.temperature
      },
      {
        title: "Humidity",
        dataIndex: "humidity",
        sorter: (a, b) => a.humidity - b.humidity
      }
    ];
    return (
      <div>
        <h3 className="bold" style={{ textAlign: "center" }}>
          <Icon type="calendar" theme="filled" /> Recent History
        </h3>
        <Divider />
        <Table
          pagination={false}
          columns={columns}
          dataSource={this.state.historicData}
        />
      </div>
    );
  }
}
