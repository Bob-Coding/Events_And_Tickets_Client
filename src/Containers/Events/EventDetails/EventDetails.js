import React from "react";
import { connect } from "react-redux";
import EventDetails from "../../../Components/Event/EventDetails/EventDetails";
import * as actions from "../../../store/actions/index";
import { deleteEvent } from "../../../store/actions/events";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import classes from "./EventDetails.module.css";

class EventDetailsContainer extends React.Component {
  state = { editMode: false };

  componentDidMount() {
    this.props.onFetchEvent(Number(this.props.match.params.id));
  }

  onEdit = () => {
    this.setState({
      editMode: true,
      formValues: {
        name: this.props.event.name,
        description: this.props.event.description,
        picture: this.props.event.picture,
        startDate: this.props.event.startDate,
        endDate: this.props.event.endDate,
      },
    });
  };

  inputChangedHandler = (event) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [event.target.name]: event.target.value,
      },
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({
      editMode: false,
    });
    this.props.onUpdateEvent(this.props.event.id, this.state.formValues);
  };

  deleteEventHandler = () => {
    this.props.onDeleteEvent(this.props.event.id);
    this.props.history.push("/");
  };

  hasCreated = () => {
    if (this.props.event && this.props.event.userId && this.props.userId) {
      return this.props.event.userId === this.props.userId;
    }
  };

  render() {
    let event = <Spinner />;
    if (!this.props.loading) {
      event = (
        <EventDetails
          onEdit={this.onEdit}
          changed={this.inputChangedHandler}
          onSubmitEvent={this.submitHandler}
          formValues={this.state.formValues}
          editMode={this.state.editMode}
          onDelete={this.deleteEventHandler}
          event={this.props.event}
          hasCreatedEvent={this.hasCreated}
          userId={this.props.userId}
        />
      );
    }
    return (
      <div className={classes.Event}>
        <h1>Event</h1>
        {event}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.event.event,
  loading: state.event.loading,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchEvent: (id) => dispatch(actions.fetchEvent(id)),
    onDeleteEvent: (id) => dispatch(deleteEvent(id)),
    onUpdateEvent: (id, data) => dispatch(actions.updateEvent(id, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailsContainer);
