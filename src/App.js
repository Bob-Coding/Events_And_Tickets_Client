import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import Home from "./Containers/Home/Home";
import Events from "./Containers/Events/Events";
import Auth from "./Containers/Authentification/Auth";
import Logout from "./Containers/Authentification/Logout/Logout";
import EventDetails from "./Containers/Events/EventDetails/EventDetails";
import * as actions from "./store/actions/index";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/events/:id" component={EventDetails} />
          <Route path="/events" component={Events} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />

          <Route path="/" exact component={Home} />

          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
