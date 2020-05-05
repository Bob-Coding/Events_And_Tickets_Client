import React, { Component } from "react";
import store from "./store/store";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path="/" exact render={() => <h1>Home</h1>} />
        </div>
      </Provider>
    );
  }
}

export default App;
