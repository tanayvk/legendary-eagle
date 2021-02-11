import React from "react";
import ReactDOM from "react-dom";

import Home from "./components/Home";
import Workspace from "./components/Workspace";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/workspace">
          <Workspace />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
