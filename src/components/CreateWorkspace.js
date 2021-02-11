import React from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";

function CreateForm(props) {
  // console.log(props.visibility);
  let classes =
    "py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500 w-full transition-all ";
  if (props.offset == "left") {
    classes += "transform -translate-x-4 ";
  }
  if (props.offset == "right") {
    classes += "transform translate-x-4 ";
  }

  return (
    <div class="mb-4 mt-4 ">
      <form class="space-y-2 ">
        <input
          type="text"
          placeholder="Workspace Handle"
          className={classes}
          value={props.workspaceName}
        />
        <input
          type="text"
          placeholder="Shh.. Top secret!"
          className={classes}
          value={props.workspacePassword}
        />
      </form>
    </div>
  );
}

class CreateWorkspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.pressedCount = 0;
    this.state.formLoading = false;
    this.state.workspaceName = "";
    this.state.workspacePassword = "";
    this.state.offset = "";
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate() {
    this.setState({
      formLoading: true,
      pressedCount: this.state.pressedCount + 1,
    });
    axios
      .get(API_URL + "create")
      .then((response) => {
        console.log(response.data.name);
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

  renderCreateForm() {
    return (
      <CreateForm
        visibility={this.state.formVisible}
        workspaceName={this.state.workspaceName}
        workspacePassword={this.state.workspacePassword}
        offset={this.state.offset}
      />
    );
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
      <Link to="/workspace">
        <p
          className={
            "w-full text-white text-center p-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-semibold text-lg focus:border focus:border-2 "
          }
        >
          Access Workspace
        </p>
      </Link>
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
