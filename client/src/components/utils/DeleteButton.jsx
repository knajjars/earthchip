import React, { Component } from "react";
import api from "../../api/earthie";
import { Button } from "antd";
import NotificationMessage from "./NotificationMessage";
import { Redirect } from "react-router-dom";
export default class DeleteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteOpen: false,
      deleteInit: false
    };
  }

  handleOpenDelete = () => {
    this.setState({
      deleteOpen: !this.state.deleteOpen
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

  render() {
    return (
      <div>
        <p className="delete-btn" onClick={this.handleOpenDelete}>
          {" "}
          Delete
        </p>

        {this.state.deleteOpen && (
          <div className="buttons-delete-earthie-settings">
            <p>Are you sure you want to delete?</p>
            <Button className="btns" type="danger" onClick={this.handleDelete}>
              Yes, delete
            </Button>

            <Button className="btns" ghost onClick={this.handleOpenDelete}>
              No
            </Button>
          </div>
        )}
        {this.state.deleteInit && <Redirect to="/" />}
      </div>
    );
  }
}
