import React, { Component } from "react";
import { Upload, Button, Icon, Spin } from "antd";
import { Select } from "antd";
import NotificationMessage from "../../utils/NotificationMessage";
import api from "../../../api/registerDevice";
import NavBar from "./NavBar";

const Option = Select.Option;

export default class RegisterDevice extends Component {
  state = {
    file: "",
    plantName: "",
    macAddress: this.props.location.search.replace("?macAddress=", ""),
    watering: "",
    themes: {
      plantName: "outlined",
      calendar: "filled",
      macAddress: "filled"
    },
    uploading: false
  };

  handleFocus = e => {
    this.setState({
      themes: {
        plantName: "outlined",
        calendar: "filled",
        [e.target.name]: "filled",
        macAddress: "filled"
      }
    });
  };

  handleRegister = () => {
    const { file, macAddress, plantName, watering } = this.state;
    const formData = new FormData();
    formData.append("upload", file);
    formData.append("macAddress", macAddress);
    formData.append("plantName", plantName);
    formData.append("watering", watering);
    this.setState({
      uploading: true
    });

    api
      .register(formData)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            uploading: false
          });
          NotificationMessage({
            type: "success",
            message: `Device registered`,
            description:
              "The new EarthChip device has been added to your dashboard!"
          });
          this.props.history.push("/"); // Redirect to the home page
        }
      })
      .catch(err => {
        this.setState({
          uploading: false
        });
        NotificationMessage({
          type: "error",
          message: "Something went wrong.",
          description: err
        });
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelect = val => {
    this.setState({
      watering: val
    });
  };

  render() {
    const { uploading, file } = this.state;
    const props = {
      onRemove: file => {
        this.setState({
          file: ""
        });
      },
      beforeUpload: file => {
        this.setState({
          file: file
        });
        return false;
      },
      file
    };

    let style = { color: "#32c3ff", fontSize: "26px" };
    return (
      <div>
        <NavBar />
        <div className="form-container">
          <h1 className="title">Register your device.</h1>
          <h3>
            Please tell us more about your new{" "}
            <span className="bold">EarthChip</span> device.
          </h3>
          <div className="form-component">
            <div className="form-field">
              <Icon
                type="safety-certificate"
                theme={this.state.themes.macAddress}
                style={style}
              />
              <input
                defaultValue={this.state.macAddress}
                name="macAddress"
                type="text"
                disabled
                required
              />
            </div>
            <div className="form-field">
              <div className="two-input-holder">
                <div className="field-main">
                  <div className="form-field-col6">
                    <Icon
                      type="code"
                      theme={this.state.themes.plantName}
                      style={style}
                    />
                    <input
                      value={this.state.plantName}
                      onChange={this.handleChange}
                      onFocus={this.handleFocus}
                      name="plantName"
                      type="text"
                      placeholder="Plant name"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="form-field-col6">
                    <Icon
                      type="calendar"
                      theme={this.state.themes.calendar}
                      style={style}
                    />
                    <Select
                      placeholder="Select watering level."
                      onChange={this.handleSelect}
                    >
                      <Option value="low">Low</Option>
                      <Option value="medium">Medium</Option>
                      <Option value="high">High</Option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Upload Image
              </Button>
            </Upload>

            <div className="form-field">
              <button onClick={this.handleRegister} className="button-form">
                {uploading ? (
                  <div>
                    <Spin />
                    Register
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
