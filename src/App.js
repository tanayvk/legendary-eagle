import React from "react";
import ReactDOM from "react-dom";

import Home from "./components/Home";
import Workspace from "./components/Workspace";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/workspace" component={Workspace} />
      </Switch>
    </Router>
  );
}

export default App;
