import React, { Component } from "react";
import apiAuth from "../api/data";

var CanvasJSReact = require("./canvasjs.react");
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class TomsTestPage extends Component {
  componentDidMount() {
    apiAuth.getSoilMoisture().then(res => {
      console.log(res);
    });
  }
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Number of New Customers"
      },
      axisY: {
        title: "Number of Customers",
        includeZero: false
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "spline",
          name: "2016",
          showInLegend: true,
          dataPoints: [
            { y: 155, label: "Jan" },
            { y: 150, label: "Feb" },
            { y: 152, label: "Mar" },
            { y: 148, label: "Apr" },
            { y: 142, label: "May" },
            { y: 150, label: "Jun" },
            { y: 146, label: "Jul" },
            { y: 149, label: "Aug" },
            { y: 153, label: "Sept" },
            { y: 158, label: "Oct" },
            { y: 154, label: "Nov" },
            { y: 150, label: "Dec" }
          ]
        },
        {
          type: "spline",
          name: "2017",
          showInLegend: true,
          dataPoints: [
            { y: 172, label: "Jan" },
            { y: 173, label: "Feb" },
            { y: 175, label: "Mar" },
            { y: 172, label: "Apr" },
            { y: 162, label: "May" },
            { y: 165, label: "Jun" },
            { y: 172, label: "Jul" },
            { y: 168, label: "Aug" },
            { y: 175, label: "Sept" },
            { y: 170, label: "Oct" },
            { y: 165, label: "Nov" },
            { y: 169, label: "Dec" }
          ]
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />

        <button />
      </div>
    );
  }
}
