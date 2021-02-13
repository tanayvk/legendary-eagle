import React from "react";
import ReactDOM from "react-dom";

function Header(props) {
  return (
    <div class="bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600">
      <nav class="flex items-center justify-between flex-wrap bg-teal px-6 py-2">
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"></button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-lg font-mono lg:flex-grow">
            {localStorage.getItem("workspaceName")}
          </div>
          <div class="space-x-2">
            <a
              class="inline-block text-sm px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0"
              onClick={() => {}}
            >
              Change password
            </a>
            <a
              href="#"
              class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0"
            >
              Exit Workspace
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
