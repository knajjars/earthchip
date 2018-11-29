import React, { Component } from "react";
import { Upload, Button, Icon } from "antd";
import NotificationMessage from "../../utils/NotificationMessage";
import api from "../../../api/registerDevice";
import NavBar from "./NavBar";

export default class RegisterDevice extends Component {
  state = {
    file: "",
    plantName: "",
    macAddress: this.props.location.search.replace("?macAddress=", ""),
    themes: {
      plantName: "outlined",
      macAddress: "filled"
    },
    uploading: false
  };

  handleFocus = e => {
    this.setState({
      themes: {
        [e.target.name]: "filled",
        macAddress: "filled"
      }
    });
  };

  handleRegister = () => {
    const { file, macAddress, plantName } = this.state;
    const formData = new FormData();
    formData.append("upload", file);
    formData.append("macAddress", macAddress);
    formData.append("plantName", plantName);
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
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Upload Image
              </Button>
            </Upload>
            <Button
              type="primary"
              onClick={this.handleRegister}
              loading={uploading}
              style={{ marginTop: 20 }}
            >
              {uploading ? "Registering" : "Register"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
