import React from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link, useHistory } from "react-router-dom";
import { computeHash } from "../utils/utils.js";

class CreateWorkspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.pressedCount = 0;
    this.state.formLoading = false;
    this.state.workspaceName = "";
    this.state.workspacePassword = "";
    this.state.offset = "";
    this.state.errorMessage = "";

    this.handleCreate = this.handleCreate.bind(this);
    this.handleAccess = this.handleAccess.bind(this);
  }

  renderCreateForm() {
    let classes =
      "py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500 w-full transition-all ";
    if (this.state.offset == "left") {
      classes += "transform -translate-x-4 ";
    }
    if (this.state.offset == "right") {
      classes += "transform translate-x-4 ";
    }

    return (
      <div className="mb-4 mt-4 ">
        <form className="space-y-2 font-mono text-2xl ">
          {this.state.errorMessage != "" ? (
            <div class="items-center text-center mb-2">
              <p class="bg-red-400 text-sm px-4 py-2 rounded-full inline">
                {this.state.errorMessage}
              </p>
            </div>
          ) : (
            ""
          )}
          <input
            type="text"
            placeholder="Workspace Handle"
            className={classes}
            value={this.state.workspaceName}
            onChange={(e) => this.setState({ workspaceName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Shh.. Top secret!"
            className={classes}
            value={this.state.workspacePassword}
            onChange={(e) =>
              this.setState({ workspacePassword: e.target.value })
            }
          />
        </form>
      </div>
    );
  }

  handleCreate() {
    this.setState({
      formLoading: true,
      pressedCount: this.state.pressedCount + 1,
    });
    axios
      .get(API_URL + "create")
      .then((response) => {
        this.setState({
          workspaceName: response.data.name,
          workspacePassword: response.data.password,
          formLoading: false,
        });
        this.shake();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleAccess() {
    console.log(
      "access",
      this.state.workspaceName,
      computeHash(this.state.workspacePassword),
      computeHash(computeHash(this.state.workspacePassword))
    );

    axios
      .post(
        API_URL + "get",
        {
          workspaceName: this.state.workspaceName,
          passwordHash: computeHash(this.state.workspacePassword),
        },
        { headers: { "Content-Type": "text/plain" } }
      )
      .then((response) => {
        console.log("here");
        this.props.history.push("/workspace");
        console.log(response);
      })
      .catch((error) => {
        if (error.response.status == 401)
          this.setState({
            errorMessage: "Wrong pass phrase!",
          });
        else
          this.setState({
            errorMessage: "Workspace does not exist!",
          });
      });
  }

  shake() {
    this.setState({ offset: "left" });

    setTimeout(() => {
      this.setState({ offset: "right" });
    }, 150);
    setTimeout(() => {
      this.setState({ offset: "" });
    }, 300);
  }
  renderWorkspaceButton() {
    return (
      <button
        className={
          "w-full text-white p-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-semibold text-lg focus:border focus:border-2 "
        }
        onClick={this.handleCreate}
      >
        {this.state.pressedCount > 0
          ? "Boring! Generate again."
          : "Create new Workspace"}
      </button>
    );
  }
  renderCreateLoading() {
    return (
      <div class="relative flex justify-center items-center ">
        <div class="inline-block animate-spin ease duration-50 w-5 h-5  bg-gradient-to-r from-pink-500 to-yellow-500 mx-2"></div>
        <div class="inline-block animate-spin ease duration-50 w-5 h-5  bg-gradient-to-r from-pink-500 to-yellow-500 mx-2"></div>
        <div class="inline-block animate-spin ease duration-50 w-5 h-5 bg-gradient-to-r from-pink-500 to-yellow-500 mx-2"></div>
        <div class="inline-block animate-spin ease duration-50 w-5 h-5 bg-gradient-to-r from-pink-500 to-yellow-500 mx-2"></div>
      </div>
    );
  }
  renderCreateButton() {
    return (
      <div>
        {this.state.formLoading
          ? this.renderCreateLoading()
          : this.renderWorkspaceButton()}
      </div>
    );
  }

  renderAccessButton() {
    return (
      <button
        className={
          "w-full text-white text-center p-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-semibold text-lg focus:border focus:border-2 "
        }
        onClick={this.handleAccess}
      >
        Access Workspace
      </button>
    );
  }

  render() {
    return (
      <div>
        {this.renderCreateButton()}
        <div class=" border-t-2 m-4"></div>
        {this.renderCreateForm()}
        {this.renderAccessButton()}
      </div>
    );
  }
}

export default CreateWorkspace;
