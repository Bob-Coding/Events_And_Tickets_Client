import React from "react";
import { connect } from "react-redux";

import EventDetails from "../../../Components/Event/EventDetails/EventDetails";
import * as actions from "../../../store/actions/index";
import { deleteEvent } from "../../../store/actions/events";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import classes from "./EventDetails.module.css";
import { checkValidity } from "../../../Components/Validation/CheckValidity";
import CreateEventForm from "../../../Components/Event/CreateEventForm/CreateEventForm";
import Tickets from "./Tickets/Tickets";

class EventDetailsContainer extends React.Component {
  state = {
    editMode: false,
    eventForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Event Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      description: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Event Description",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      picture: {
        elementType: "input",
        elementConfig: {
          type: "url",
          placeholder: "URL Picture",
        },
        value: "",
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
      startDate: {
        elementType: "input",
        elementConfig: {
          type: "date",
          placeholder: "Start Date",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      endDate: {
        elementType: "input",
        elementConfig: {
          type: "date",
          placeholder: "End Date",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
  };

  componentDidMount() {
    this.props.onFetchEvent(Number(this.props.match.params.id));
  }

  onEdit = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };

  inputChangedHandler = (event, formElement) => {
    const updatedEventForm = {
      ...this.state.eventForm,
    };
    const updatedFormElement = {
      ...updatedEventForm[formElement],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedEventForm[formElement] = updatedFormElement;

    let formIsValid = true;
    for (let formElement in updatedEventForm) {
      formIsValid = updatedEventForm[formElement].valid && formIsValid;
    }
    this.setState({ eventForm: updatedEventForm, formIsValid: formIsValid });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElement in this.state.eventForm) {
      formData[formElement] = this.state.eventForm[formElement].value;
    }
    const formToSubmit = {
      userId: this.props.userId,
      eventData: formData,
    };
    this.setState({ editmode: false });
    this.props.onUpdateEvent(this.props.event.id, formToSubmit.eventData);
  };

  deleteEventHandler = () => {
    this.props.onDeleteEvent(this.props.event.id, this.props.token);
    this.props.history.push("/events");
  };

  hasCreated = (id) => {
    if (this.props.event && this.props.event.userId && id) {
      return this.props.event.userId === id;
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
          values={this.state}
          editMode={this.state.editMode}
          onDelete={this.deleteEventHandler}
          event={this.props.event}
          hasCreatedEvent={this.hasCreated}
          userId={this.props.userId}
        />
      );
    }

    let eventform = null;
    if (this.state.editMode) {
      eventform = (
        <CreateEventForm
          onSubmitEvent={this.submitHandler}
          changed={this.inputChangedHandler}
          values={this.state}
        />
      );
    }

    let tickets = null;
    if (this.props.event && this.props.tickets) {
      tickets = <Tickets event={this.props.event} />;
    }

    return (
      <div className={classes.Event}>
        <h1>Event</h1>
        {event}
        {eventform}
        <h2>Tickets:</h2>
        {tickets}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.event.event,
  loading: state.event.loading,
  userId: state.auth.userId,
  token: state.auth.token,
  tickets: state.tickets.tickets,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchEvent: (id) => dispatch(actions.fetchEvent(id)),
    onDeleteEvent: (id, token) => dispatch(deleteEvent(id, token)),
    onUpdateEvent: (id, data) => dispatch(actions.updateEvent(id, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailsContainer);
