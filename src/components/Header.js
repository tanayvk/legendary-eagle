import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useHistory } from "react-router";
import { computeHash } from "../utils/utils.js";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.changingPassword = false;
    this.state.newPassword = "";
    this.state.loading = false;
  }

  renderChangePassword() {
    return (
      <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-100 p-3 ring-1 ring-black ring-opacity-5">
        <p>New Password:</p>
        <input
          type="text"
          value={this.state.newPassword}
          onChange={(e) => {
            this.setState({ newPassword: e.target.value });
          }}
        />
        <button
          class="blocks accent float-left"
          onClick={(e) => {
            this.setState({ changingPassword: false, loading: true });
            const newPasswordHash = computeHash(this.state.newPassword);
            axios
              .post(API_URL + "save", {
                workspaceName: localStorage.getItem("workspaceName"),
                passwordHash: localStorage.getItem("passwordToken"),
                workspaceContent: "",
                newPasswordHash: newPasswordHash,
              })
              .then((response) => {
                localStorage.setItem("passwordToken", newPasswordHash);
              })
              .catch((err) => {
                console.log(err);
              })
              .then(() => {
                this.setState({ loading: false });
              });
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
    );
  }

  render() {
    return (
      <div class="p-0 bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600">
        <nav class="flex items-center justify-between flex-wrap bg-teal px-6 py-2">
          <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"></button>
          </div>
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="lg:flex-grow">
              <div class="blocks inline px-3">
                <span class="text-lg font-mono">
                  {localStorage.getItem("workspaceName")}
                </span>
              </div>
            </div>
            <div class="px-3">
              {this.state.loading ? (
                <i class="fa fa-2x text-red-400 fa-circle-o-notch fa-spin"></i>
              ) : (
                <i class="fa fa-2x text-green-400 fa-check-circle-o"></i>
              )}
            </div>
            <div class="">
              <div class="block relative">
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
