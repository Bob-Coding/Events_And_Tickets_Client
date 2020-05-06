import React, { Component } from "react";
import { Route } from "react-router-dom";

import Events from "./Containers/Events/Events";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/events" component={Events} />
          <Route path="/" exact render={() => <h1>Home</h1>} />
        </Layout>
      </div>
    );
  }
}

export default App;
