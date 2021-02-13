import React from "react";
import ReactDOM from "react-dom";

function Header(props) {
  return (
    <div class="p-0 bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600">
      <nav class="flex items-center justify-between flex-wrap bg-teal px-6 py-2">
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"></button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-lg font-mono lg:flex-grow">
            <span class="blocks inline">
              {localStorage.getItem("workspaceName")}
            </span>
          </div>
          <div class="">
            <a class="blocks " onClick={() => {}}>
              Change Password
            </a>
          </div>
          <div>
            <a href="#" class=" blocks">
              Exit Workspace
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
