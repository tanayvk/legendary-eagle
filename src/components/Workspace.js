import Header from "./Header.js";
import React from "react";
import ReactDOM from "react-dom";

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.Notes = [];
    this.handleNotes = this.handleNotes.bind(this);
  }

  handleNotes() {
    const notes = [
      {
        name: "Aryan",
        content: "Such a noob",
      },
      {
        name: "Amrit",
        content: "Such a noob",
      },
    ];

    return notes.map((note) => (
      <tr>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {note.name}
        </th>
      </tr>
    ));
  }

  render() {
    return (
      <div class="">
        <Header />
        <div class="h-screen overflow-hidden items-center justify-center ">
          <div>
            <div class="md:grid md:grid-cols-3 md:gap-6 m-4">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <div class="flex flex-col">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  NOTES
                                </th>
                              </tr>
                            </thead>
                            {this.handleNotes()}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div class="shadow sm:rounded-md sm:overflow-hidden">
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div>
                        <label
                          for="about"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Content
                        </label>
                        <div class="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows="20"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="you@example.com"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Workspace;
