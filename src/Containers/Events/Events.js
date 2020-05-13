import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import Event from "../../Components/Event/Event";
import Spinner from "../../Components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./Events.module.css";
import CreateEventForm from "../../Components/Event/CreateEventForm/CreateEventForm";

class Events extends Component {
  componentDidMount() {
    this.props.onFetchEvents();
  }

  render() {
    let events = <Spinner />;
    if (!this.props.loading) {
      events = this.props.events.map((event) => (
        <div>
          <Event
            key={event.id}
            id={event.id}
            name={event.name}
            description={event.description}
            picture={event.picture}
            startDate={event.startDate}
            endDate={event.endDate}
          />
          <CreateEventForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            values={this.state}
          />
        </div>
      ));
    }
    return (
      <div className={classes.Events}>
        <h2>Events:</h2>
        {events}
      </div>
    );
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
