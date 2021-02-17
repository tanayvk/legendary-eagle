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
    this.state.accessLoading = false;
    this.state.workspaceName = "";
    this.state.workspacePassword = "";
    this.state.offset = "";
    this.state.errorMessage = "";

    this.handleCreate = this.handleCreate.bind(this);
    this.handleAccess = this.handleAccess.bind(this);
  }

  renderCreateForm() {
    let classes = "blocks transition-all ";
    if (this.state.offset == "left") {
      classes += "transform -translate-x-4 ";
    }
    if (this.state.offset == "right") {
      classes += "transform translate-x-4 ";
    }

    return (
      <div className=" sm:mb-2 sm:mb-2  lg:mb-4 lg:mt-4 ">
        <form className="lg:space-y-2 font-mono sm-text-sm lg:text-2xl ">
          {this.state.errorMessage != "" ? (
            <div class="items-center text-center lg:mb-2">
              <p class="bg-red-400 lg:text-sm lg:px-4 lg:py-2 lg:rounded-full inline">
                {this.state.errorMessage}
              </p>
            </div>
          ) : (
            ""
          )}
          <div class={classes}>
            <input
              type="text"
              placeholder="Workspace Handle"
              className="lg:py-3 px-2 py-1 lg:px-4 outline-none lg:w-full"
              value={this.state.workspaceName}
              onChange={(e) => this.setState({ workspaceName: e.target.value })}
            />
          </div>
          <div class={classes}>
            <input
              type="text"
              placeholder="Shh.. Top secret!"
              className="lg:py-3 lg:px-4 outline-none lg:w-full"
              value={this.state.workspacePassword}
              onChange={(e) =>
                this.setState({ workspacePassword: e.target.value })
              }
            />
          </div>
        </form>
      </div>
    );
  }

  handleCreate() {
    this.setState({
      errorMessage: "",
      formLoading: true,
      pressedCount: this.state.pressedCount + 1,
    });
    axios
      .get(API_URL + "create")
      .then((response) => {
        this.setState({
          workspaceName: response.data.name,
          workspacePassword: response.data.password,
        });
        this.shake();
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(() => {
        this.setState({
          formLoading: false,
        });
      });
  }

  handleAccess() {
    this.setState({
      accessLoading: true,
    });
    const passwordHash = computeHash(this.state.workspacePassword);
    axios
      .post(
        API_URL + "get",
        {
          workspaceName: this.state.workspaceName,
          passwordHash: passwordHash,
        },
        { headers: { "Content-Type": "text/plain" } }
      )
      .then((response) => {
        localStorage.setItem("workspaceName", this.state.workspaceName);
        localStorage.setItem("passwordToken", passwordHash);
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
      })
      .then(() => {
        this.setState({
          accessLoading: false,
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
        className={"w-full blocks accent text-2xl"}
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
    return this.state.accessLoading ? (
      this.renderCreateLoading()
    ) : (
      <div class="flex flex-row-reverse">
        <button
          className={"accent blocks sm:text- lg:text-lg"}
          onClick={this.handleAccess}
          style={{ "--block-accent-color": "#4f46e5" }}
        >
          Access
        </button>
      </div>
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
