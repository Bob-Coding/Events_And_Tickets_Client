import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import Event from "../../Components/Event/Event";
import Spinner from "../../Components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";

class Events extends Component {
  componentDidMount() {
    this.props.onFetchEvents();
  }

  render() {
    let events = <Spinner />;
    if (!this.props.loading) {
      events = this.props.events.map((event) => (
        <Event
          key={event.id}
          name={event.name}
          description={event.description}
          picture={event.picture}
          startDate={event.startDate}
          endDate={event.endDate}
        />
      ));
    }
    return <div>{events}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    loading: state.events.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchEvents: () => dispatch(actions.fetchEvents()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Events, axios));
