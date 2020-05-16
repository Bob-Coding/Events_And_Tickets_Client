import React, { Component } from "react";
import { connect } from "react-redux";

class EventDetails extends Component {
  state = {};
  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(EventDetails);
