import React, { Component } from "react";
import { Route } from "react-router-dom";

import Events from "./Containers/Events/Events";

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
