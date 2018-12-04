import React, { Component } from "react";
import api from "../../../../api/earthie";
import { Divider, Icon, Table } from "antd";
const data = [
  {
    id: 1,
    col1: "abc",
    col2: "def",
    col3: "ghi"
  },
  {
    id: 2,
    col1: "abc",
    col2: "def",
    col3: "ghi"
  },
  {
    id: 3,
    col1: "abc",
    col2: "def",
    col3: "ghi"
  }
];

const columns = [
  {
    title: "col1",
    dataIndex: "col1",
    key: "col1",
    width: 100
  },
  {
    title: "col2",
    dataIndex: "col2",
    key: "col2",
    width: 100
  },
  {
    title: "col3",
    dataIndex: "col3",
    key: "col3",
    width: 100
  },
  {
    title: "action",
    key: "action",
    width: 100,
    fixed: "right",
    render: () => <a>click</a>,
    className: "action"
  }
];

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
        {/* <Table
          pagination={false}
          columns={columns}
          dataSource={this.state.historicData}
          style={{ width: 400 }}
          scroll={{ x: 400, y: true }}
        /> */}

        <div style={{ width: 320 }}>
          <Table
            rowKey={r => r.id}
            pagination={false}
            columns={columns}
            dataSource={this.state.historicData}
            scroll={{ x: "150%" }}
          />
        </div>
      </div>
    );
  }
}
