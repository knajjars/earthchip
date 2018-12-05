import React, { Component } from "react";
import { Upload, Button, Icon, Spin, Select, DatePicker } from "antd";
import NotificationMessage from "../../utils/NotificationMessage";
import api from "../../../api/registerDevice";
import { Link } from "react-router-dom";
const Option = Select.Option;
const antIcon = (
  <Icon type="loading" style={{ fontSize: 18, paddingLeft: "3px" }} spin />
);

export default class RegisterDevice extends Component {
  state = {
    file: "",
    plantName: "",
    macAddress: this.props.location.search.replace("?macAddress=", ""),
    wateringType: "",
    lastWatered: "",
    calendarTheme: "outlined",
    experimentTheme: "outlined",
    plantNameTheme: "outlined",
    macAddressTheme: "outlined",
    uploading: false
  };

  handleRegister = () => {
    const {
      file,
      macAddress,
      plantName,
      wateringType,
      lastWatered
    } = this.state;

    const formData = new FormData();
    formData.append("upload", file);
    formData.append("macAddress", macAddress);
    formData.append("plantName", plantName);
    formData.append("wateringType", wateringType);
    formData.append("lastWatered", lastWatered);
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
    if (e.target.value) {
      this.setState({
        [e.target.name]: e.target.value,
        [`${e.target.name}Theme`]: "filled"
      });
    } else {
      this.setState({
        [e.target.name]: "",
        [`${e.target.name}Theme`]: "outlined"
      });
    }
  };

  handleSelect = val => {
    if (val) {
      this.setState({
        wateringType: val,
        experimentTheme: "filled"
      });
    }
  };

  handleDatePick = (date, dateString) => {
    if (date) {
      this.setState({
        lastWatered: date._d,
        calendarTheme: "filled"
      });
    } else {
      this.setState({
        lastWatered: "",
        calendarTheme: "outlined"
      });
    }
  };

  componentDidMount() {
    if (this.state.macAddress) {
      this.setState({
        macAddressTheme: "filled"
      });
    }
  }

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

    let style = { color: "#32c3ff", fontSize: "26px", margin: 5 };
    return (
      <div>
        <div className="form-container" style={{ minHeight: "100vh" }}>
          <Link to="/">
            <Icon
              type="home"
              theme="filled"
              style={{
                fontSize: "30px",
                top: "10px",
                left: "10px",
                position: "absolute"
              }}
            />
          </Link>
          <h1 className="title">Register your device.</h1>
          <h3 className="subtitle">
            Please tell us more about your new{" "}
            <span className="bold">Earthie.</span>
          </h3>
          <div className="form-component">
            <div className="form-field">
              <Icon
                type="safety-certificate"
                theme={this.state.macAddressTheme}
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
                      theme={this.state.plantNameTheme}
                      style={style}
                    />
                    <input
                      value={this.state.plantName}
                      onChange={this.handleChange}
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
                      type="experiment"
                      theme={this.state.experimentTheme}
                      style={style}
                    />
                    <Select
                      placeholder="Dependency of water."
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                maxWidth: "95vw"
              }}
            >
              <Icon
                type="calendar"
                theme={this.state.calendarTheme}
                style={style}
              />
              <DatePicker
                placeholder="Last watered"
                onChange={this.handleDatePick}
              />
              <Upload {...props} style={{ marginLeft: 10 }}>
                <Button>
                  <Icon type="upload" /> Upload Image
                </Button>
              </Upload>
            </div>

            <div className="form-field">
              <button onClick={this.handleRegister} className="button-form">
                {uploading ? (
                  <div>
                    <Spin indicator={antIcon} />
                    Registering
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
