import React from "react";
import { connect } from "react-redux";
import EventDetails from "../../../Components/Event/EventDetails/EventDetails";
import * as actions from "../../../store/actions/index";
import { deleteEvent } from "../../../store/actions/events";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import classes from "./EventDetails.module.css";
import { checkValidity } from "../../../Components/Validation/CheckValidity";
import CreateEventForm from "../../../Components/Event/CreateEventForm/CreateEventForm";

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

  onEdit = (formElement) => {
    const updatedEventForm = {
      ...this.state.eventForm,
    };
    const updatedFormElement = {
      ...updatedEventForm[formElement],
    };

    updatedEventForm[formElement] = updatedFormElement;
    this.setState({
      editMode: true,
      eventForm: updatedEventForm,
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
    this.props.history.push("/");
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
          onEdit={(element) => this.onEdit()}
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

    return (
      <div className={classes.Event}>
        <h1>Event</h1>
        {event}
        {this.state.editMode ? (
          <CreateEventForm
            onSubmitEvent={this.submitHandler}
            changed={this.inputChangedHandler}
            values={this.state}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.event.event,
  loading: state.event.loading,
  userId: state.auth.userId,
  token: state.auth.token,
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
