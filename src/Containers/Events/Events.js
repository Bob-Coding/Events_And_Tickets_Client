import React, { Component } from "react";
import { connect } from "react-redux";
import { checkValidity } from "../../Components/Validation/CheckValidity";

import * as actions from "../../store/actions/index";
import Event from "../../Components/Event/Event";
import Spinner from "../../Components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./Events.module.css";
import CreateEventForm from "../../Components/Event/CreateEventForm/CreateEventForm";

class Events extends Component {
  state = {
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
    this.props.onFetchEvents();
  }

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
    this.props.onCreateEvent(formToSubmit, this.props.token);
  };

  render() {
    let events = <Spinner />;
    if (!this.props.loading) {
      events = this.props.events.map((event) => (
        <div key={event.id}>
          <Event
            key={event.id}
            id={event.id}
            name={event.name}
            description={event.description}
            picture={event.picture}
            startDate={event.startDate}
            endDate={event.endDate}
          />
        </div>
      ));
    }
    return (
      <div className={classes.Events}>
        <h1>Events</h1>
        {events}
        <CreateEventForm
          onSubmitEvent={this.submitHandler}
          changed={this.inputChangedHandler}
          values={this.state}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    loading: state.events.loading,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchEvents: () => dispatch(actions.fetchEvents()),
    onCreateEvent: (formData, token) =>
      dispatch(actions.createEvent(formData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Events, axios));
