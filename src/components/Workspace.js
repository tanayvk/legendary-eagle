import Header from "./Header.js";
import React from "react";
import ReactDOM from "react-dom";

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.notes = [
      {
        name: "New Note",
        content: "",
      },
    ];
    this.state.activeNote = 0;
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.addContent = this.addContent.bind(this);
    this.createNewContent = this.createNewContent.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  createNewContent() {
    this.setState((state) => {
      let note = {
        name: "New note",
        content: "",
      };
      state.notes.push(note);
      state.activeNote = state.notes.length - 1;
      return {
        notes: state.notes,
        activeNote: state.activeNote,
      };
    });
  }
  deleteNote(index) {
    this.setState((state) => {
      state.notes.splice(index);
      if (state.notes.length == 0) {
        state.notes.push({
          name: "New Note",
          content: "",
        });
      }
      return {
        notes: state.notes,
        activeNote: index != state.activeNote ? state.activeNote : 0,
      };
    });
  }
  handleContentChange(e) {
    this.setState((state) => {
      state.notes[state.activeNote].content = e.target.value;
      return {
        notes: state.notes,
      };
    });
  }
  handleNameChange(e) {
    this.setState((state) => {
      state.notes[state.activeNote].name = e.target.value;
      return {
        notes: state.notes,
      };
    });
  }

  addContent() {
    this.setState((state) => {
      let note = {
        name: this.state.notes[this.state.activeNote].name,
        content: state.content,
      };
      state.notes.push(note);

      return {
        notes: state.notes,
      };
    });
  }
  handleDelete(e, i) {
    this.deleteNote(i);
  }
  renderNotes() {
    return this.state.notes.map((note, index) => (
      <tr>
        <th
          scope="col"
          class="px-6 py-3 text-left  flex font-medium  text-gray-500 uppercase tracking-wider min-h "
        >
          <span
            class=" text-left flex-grow text-xs"
            onClick={(e) => {
              this.setState({
                activeNote: index,
              });
            }}
          >
            {note.name}
          </span>
          <i
            class=" text-sm fa fa-trash fa-2x"
            onClick={(e) => {
              this.handleDelete(e, index);
            }}
          ></i>
        </th>
      </tr>
    ));
  }

  render() {
    return (
      <div class="h-screen overflow-hidden">
        <Header />
        <div class=" items-center justify-center ">
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
                                  class="px-6 py-3 grid grid-cols-6 text-xs flex item-strech font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  <span class="text-left text-lg">NOTES</span>
                                  <i
                                    class="fa fa-plus fa-2x col-span-5 text-right item-end"
                                    aria-hidden="true"
                                    onClick={this.createNewContent}
                                  ></i>
                                </th>
                              </tr>
                            </thead>
                            {this.renderNotes()}
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
                        <div class="mt-1 mb-3">
                          <textarea
                            id="about"
                            name="name"
                            rows="1"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Name"
                            value={this.state.notes[this.state.activeNote].name}
                            onChange={this.handleNameChange}
                          ></textarea>
                          <textarea
                            id="about"
                            name="about"
                            rows="20"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Content goes here."
                            value={
                              this.state.notes[this.state.activeNote].content
                            }
                            onChange={this.handleContentChange}
                          ></textarea>
                          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                              type="button"
                              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={this.addContent}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
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
