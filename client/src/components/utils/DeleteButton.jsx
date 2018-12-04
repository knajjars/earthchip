import React, { Component } from "react";
import api from "../../api/earthie";
import { Button, Icon } from "antd";
import NotificationMessage from "./NotificationMessage";
import { Redirect } from "react-router-dom";
export default class DeleteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteOpen: false,
      deleteInit: false,
      themeTrashBin: "outlined"
    };
  }

  handleOpenDelete = () => {
    this.setState({
      deleteOpen: !this.state.deleteOpen,
      themeTrashBin: "outlined"
    });
  };

  handleDelete = () => {
    api
      .deleteEarthie(this.props.macAddress)
      .then(res => {
        if (res.status === 200) {
          NotificationMessage({
            type: "success",
            message: `Don't leave us :(`,
            description: res.data.message
          });
        }
        this.setState({
          deleteInit: !this.state.deleteInit
        });
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

  handleMouseEnter = e => {
    this.setState({
      themeTrashBin: "filled"
    });
  };

  handleMouseLeave = e => {
    this.setState({
      themeTrashBin: "outlined"
    });
  };

  render() {
    let style = this.props.isDark ? { color: "black" } : {};
    return (
      <div style={{ margin: "0 15px" }}>
        {!this.state.deleteOpen && (
          // <p className="delete-btn" onClick={this.handleOpenDelete}>
          //   Delete
          // </p>
          <div onClick={this.handleOpenDelete} style={{ cursor: "pointer" }}>
            <Icon
              type="delete"
              style={{ fontSize: "28px", color: "#a6c5b4" }}
              theme={this.state.themeTrashBin}
              onMouseEnter={() => this.handleMouseEnter()}
              onMouseLeave={() => this.handleMouseLeave()}
            />
          </div>
        )}

        {this.state.deleteOpen && (
          <div className="buttons-delete-earthie-settings">
            <p>Are you sure you want to delete?</p>
            <Button className="btns" type="danger" onClick={this.handleDelete}>
              Yes, delete
            </Button>

            <p
              className="btns no-btn"
              style={style}
              ghost
              onClick={this.handleOpenDelete}
            >
              No
            </p>
          </div>
        )}
        {this.state.deleteInit && <Redirect to="/" />}
      </div>
    );
  }
}
