import Header from "./Header.js";
import React from "react";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";
import Swal from "sweetalert2";

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
    this.state.contentEdit = true;
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
      state.notes.splice(index, 1);
      if (state.notes.length == 0) {
        state.notes.push({
          name: "New Note",
          content: "",
        });
      }
      console.log(
        state.activeNote,
        index,
        state.activeNote - (state.activeNote > index),
        index != state.activeNote
      );
      return {
        notes: state.notes,
        activeNote:
          index != state.activeNote
            ? state.activeNote - (state.activeNote > index)
            : 0,
      };
    });
    console.log(this.state.activeNote, this.state.notes.length);
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
    Swal.fire({
      title: "Do you want to delete this note?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Delete`,
    }).then((result) => {
      if (result.isDenied) {
        this.deleteNote(i);
      }
    });
  }

  renderNotes() {
    let noteClasses =
      "px-6 py-3 text-left flex font-medium hover:bg-gray-100 text-gray-500 uppercase tracking-wider min-h ";
    let selected = "bg-indigo-100 hover:bg-indigo-100";
    return this.state.notes.map((note, index) => (
      <tr>
        <th
          scope="col"
          class={
            index == this.state.activeNote
              ? noteClasses + selected
              : noteClasses
          }
          onClick={(e) => {
            this.setState({
              activeNote: index,
            });
          }}
        >
          <span class=" text-left flex-grow text-xs">{note.name}</span>
          <i
            class=" text-sm fa fa-trash fa-2x hover:text-indigo-500 cursor-pointer"
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
      <div class="h-screen ">
        <Header />
        <div class=" items-center justify-center ">
          <div>
            <div class="md:grid md:grid-cols-3 md:gap-6 m-4">
              <div class="md:col-span-1 overflow-y-auto overflow-x-hidden ">
                <div class="px-4 sm:px-0">
                  <div class="flex flex-col">
                    <div class="-my-2  sm:-mx-6  lg:-mx-8">
                      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-auto border-b border-gray-200 sm:rounded-lg">
                          <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-xs bg-indigo-200 flex item-strech font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  <span class="text-left flex-grow text-lg">
                                    NOTES
                                  </span>
                                  <span class="col-span-1 text-right item-end hover:text-indigo-500 ">
                                    <i
                                      class="fa fa-plus fa-2x cursor-pointer"
                                      aria-hidden="true"
                                      onClick={this.createNewContent}
                                    ></i>
                                  </span>
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
              <div class="mt-2 md:mt-0 md:col-span-2">
                <div class="  ">
                  <div class="px-4 py-3 border-2 mb-2 h-full border-purple-300 rounded-md ">
                    <div>
                      <div class="mt-1 mb-3 overflow-auto ">
                        <input
                          id="about"
                          name="name"
                          type="text"
                          class=" py-2 px-2 border-0 border-b-2 border-indigo-200 outline-none  text-xl  w-full transition-all "
                          placeholder="Name"
                          value={this.state.notes[this.state.activeNote].name}
                          onChange={this.handleNameChange}
                        ></input>
                        <div
                          class="flex flex-col text-lg block p-1  mt-1 mb-4 "
                          style={{ height: "67vh" }}
                          onClick={() => {
                            this.setState({ contentEdit: true });
                          }}
                        >
                          {this.state.contentEdit ? (
                            <textarea
                              autoFocus="true"
                              class="flex-grow w-full overflow-auto outline-none"
                              id="content"
                              style={{ resize: "none", maxHeight: "100%" }}
                              placeholder="Content "
                              value={
                                this.state.notes[this.state.activeNote].content
                              }
                              onChange={this.handleContentChange}
                              onBlur={() => {
                                this.setState({ contentEdit: false });
                              }}
                            ></textarea>
                          ) : (
                            <div class="markdown-content">
                              <ReactMarkdown>
                                {
                                  this.state.notes[this.state.activeNote]
                                    .content
                                }
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>
                        {/* <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                              type="button"
                              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={this.addContent}
                            >
                              Save
                            </button>
                          </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Workspace;
