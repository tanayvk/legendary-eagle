import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useHistory } from "react-router";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.changingPassword = false;
    this.state.newPassword = "";
  }

  renderChangePassword() {
    return (
      <div class="origin-top-right md:absolute right-0 mt-2 md:p-3">
        <div class="blocks">
          <div>
            <p>New Password:</p>
            <input
              class="outline-none border border-black border-1"
              type="text"
              value={this.state.newPassword}
              onChange={(e) => {
                this.setState({ newPassword: e.target.value });
              }}
            />
          </div>
          <button
            class="blocks accent float-left"
            onClick={(e) => {
              this.setState({ changingPassword: false });
              this.props.onChangePassword(this.state.newPassword);
            }}
          >
            Confirm
          </button>
          <button
            class="blocks "
            onClick={(e) => {
              this.setState({ changingPassword: false });
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div class="p-0 bg-gradient-to-b from-indigo-600 to-indigo-500">
        <nav class="flex items-center justify-between flex-wrap bg-teal px-6 py-2">
          <div class="w-full block lg:flex lg:items-center lg:w-auto">
            <div class="lg:flex-grow">
              <div class=" ">
                <span class="text-lg font-mono blocks float-left px-3 ">
                  {localStorage.getItem("workspaceName")}
                </span>
                <div class="px-3 block align-middle float-left">
                  {this.props.loading ? (
                    <i class="fa fa-2x text-red-400 fa-refresh fa-spin"></i>
                  ) : (
                    <i class="fa fa-2x text-green-400 fa-check-circle-o"></i>
                  )}
                </div>
              </div>
            </div>
            <div class="md:hidden text-right float-right">
              <button
                class="blocks"
                onClick={(e) =>
                  this.setState((state) => {
                    return { menuActive: !state.menuActive };
                  })
                }
              >
                <i class="fa fa-2x fa-bars"></i>
              </button>
            </div>
          </div>
          <div
            class={
              (!this.state.menuActive ? "hidden" : "") +
              " w-full md:w-auto md:block md:flex md:flex-row"
            }
          >
            <div class="md:inline">
              <div class="block relative ">
                <a
                  class="blocks"
                  onClick={(e) => {
                    this.setState((state) => {
                      return { changingPassword: !state.changingPassword };
                    });
                  }}
                >
                  Change Password
                </a>
                {this.state.changingPassword && this.renderChangePassword()}
              </div>
            </div>
            <div class="md:inline">
              <a class=" blocks accent " onClick={this.props.onSave}>
                Save
              </a>
            </div>
            <div>
              <a
                class=" blocks"
                onClick={(e) => {
                  localStorage.removeItem("workspaceName");
                  localStorage.removeItem("passwordToken");
                  this.props.history.push("/");
                }}
              >
                Exit Workspace
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
