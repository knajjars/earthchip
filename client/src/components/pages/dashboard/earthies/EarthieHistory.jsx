import React, { Component } from "react";
import api from "../../../../api/earthie";
import { Divider, Icon, Table } from "antd";

export default class EarthieHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      historicData: [],
      isMobile: false
    };
  }

  componentDidMount() {
    console.log(window.innerWidth);
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

  updateDimensions() {
    console.log("object");
    if (window.innerWidth <= 730) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  }
  render() {
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        width: "auto",
        fixed: "left",
        sorter: (a, b) => new Date(a.date) - new Date(b.date)
      },
      {
        title: "Moisture (%)",
        dataIndex: "moisture",
        width: 150,
        sorter: (a, b) => a.moisture - b.moisture
      },
      {
        title: "Temperature (°C)",
        dataIndex: "temperature",
        width: 150,
        sorter: (a, b) => a.temperature - b.temperature
      },
      {
        title: "Humidity (%)",
        dataIndex: "humidity",
        width: 150,
        sorter: (a, b) => a.humidity - b.humidity
      }
    ];
    return (
      <div>
        <h3 className="bold" style={{ textAlign: "center" }}>
          <Icon type="calendar" theme="filled" /> Recent History
        </h3>
        <Divider />

        <div className="earthie-history-table">
          <Table
            rowKey={this.state.historicData.id}
            pagination={false}
            columns={columns}
            dataSource={this.state.historicData}
            scroll={this.state.isMobile ? { x: "150%" } : { x: false }}
          />
        </div>
      </div>
    );
  }
}
