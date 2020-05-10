import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Events from "./Containers/Events/Events";
import Layout from "./hoc/Layout/Layout";
import Login from "./Containers/Authentification/Auth";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/events" component={Events} />
          <Route path="/authentification" component={Login} />
          <Route path="/" exact render={() => <h2>Home</h2>} />
        </Layout>
      </div>
    );
  }
}

export default App;
