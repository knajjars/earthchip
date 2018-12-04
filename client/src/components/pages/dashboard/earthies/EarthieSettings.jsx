import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Upload, Button, Icon, Spin, Select } from "antd";
import api from "../../../../api/earthie";
import NotificationMessage from "../../../utils/NotificationMessage";
import DeleteButton from "../../../utils/DeleteButton";

const Option = Select.Option;
const antIcon = (
  <Icon type="loading" style={{ fontSize: 18, paddingLeft: "3px" }} spin />
);

export default class EarthieSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      macAddress: this.props.location.pathname
        .replace("/earthie/", "")
        .replace("/settings", ""),
      file: "",
      plantName: this.props.earthie ? this.props.earthie.plantName : null,
      wateringType: this.props.earthie ? this.props.earthie.wateringType : null
    };
  }

  componentDidMount() {
    if (!this.state.earthie) {
      api
        .getOneEarthie(this.state.macAddress)
        .then(res => {
          this.setState({
            earthie: res.data,
            file: "",
            plantName: res.data.plantName,
            wateringType: res.data.wateringType
          });
        })
        .catch(err => console.log(err));
    }
  }

  handleEdit = () => {
    const { file, macAddress, plantName, wateringType } = this.state;
    const formData = new FormData();
    formData.append("upload", file);
    formData.append("macAddress", macAddress);
    formData.append("plantName", plantName);
    formData.append("wateringType", wateringType);

    this.setState({
      uploading: true,
      deleteOpen: false
    });

    api
      .editEarthie(macAddress, formData)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            uploading: false
          });
          NotificationMessage({
            type: "success",
            message: `Device updated`,
            description: "The EarthChip has been updated successfully!"
          });
          this.props.history.push(`/earthie/${macAddress}`);
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
      wateringType: val
    });
  };

  handleOpenDelete = () => {
    this.setState({
      deleteOpen: !this.state.deleteOpen
    });
  };

  handleDelete = () => {
    api
      .deleteEarthie(this.state.macAddress)
      .then(res => {
        if (res.status === 200) {
          NotificationMessage({
            type: "success",
            message: `Don't leave us :(`,
            description: res.data.message
          });
          this.props.history.push("/");
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

  renderEdit = () => {
    let style = { color: "#32c3ff", fontSize: "26px" };
    const { uploading } = this.state;
    const { file } = this.state;
    const props = {
      onRemove: file => {
        this.setState({
          file: ""
        });
      },
      beforeUpload: file => {
        this.setState({
          file
        });
        return false;
      },
      file
    };
    if (!this.state.earthie) {
      return (
        <div className="offline-device-details">
          <h1>Device might be offline :(</h1>
          <p>Please check that the Earthie is connected to the Wifi.</p>
          <Spin size="large" />
        </div>
      );
    } else {
      return (
        <div className="edit-earthie">
          <div className="form-container">
            <div
              className="earthie-details-buttons"
              style={{
                alignSelf: "flex-start",
                padding: "10px"
              }}
            >
              <Link to={`/earthie/${this.state.macAddress}`}>
                <Icon
                  style={{ fontSize: "34px" }}
                  type="left-circle"
                  className="button-earthie-details"
                />
              </Link>
            </div>
            <h1 className="title">Edit your device.</h1>
            <div className="form-component">
              <div
                className="form-field"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <img
                  style={{
                    width: 200,
                    height: 300,
                    objectFit: "cover",
                    padding: 10
                  }}
                  src={this.state.earthie.imageURL}
                  alt={this.state.earthie.plantName}
                />
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> Upload Image
                  </Button>
                </Upload>
              </div>

              <div className="form-field">
                <div className="two-input-holder">
                  <div className="field-main">
                    <div className="form-field-col6">
                      <Icon type="code" style={style} />
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
                      <Icon type="calendar" style={style} />
                      <Select
                        placeholder="Select watering level."
                        onChange={this.handleSelect}
                        defaultValue={this.state.wateringType}
                      >
                        <Option value="low">Low</Option>
                        <Option value="medium">Medium</Option>
                        <Option value="high">High</Option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-field buttons-settings-chip">
                <button
                  style={{ margin: 5 }}
                  onClick={this.handleEdit}
                  className="button-form"
                >
                  {uploading ? (
                    <div>
                      <Spin indicator={antIcon} />
                      Updating
                    </div>
                  ) : (
                    "Update"
                  )}
                </button>
                <DeleteButton macAddress={this.state.macAddress} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderEdit()}</div>;
  }
}
