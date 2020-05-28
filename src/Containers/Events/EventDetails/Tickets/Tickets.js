import React from "react";
import { connect } from "react-redux";
import Ticket from "../../../../Components/Ticket/Ticket";
import Spinner from "../../../../Components/UI/Spinner/Spinner";
import Button from "../../../../Components/UI/Button/Button";
import CreateTicketForm from "../../../../Components/Ticket/CreateTicketForm/CreateTicketForm";
import { checkValidity } from "../../../../Components/Validation/CheckValidity";
import * as actions from "../../../../store/actions/index";

class Tickets extends React.Component {
  state = {
    showTicketForm: false,
    ticketForm: {
      picture: {
        elementType: "input",
        elementConfig: {
          type: "url",
          placeholder: "Ticket Picture",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      price: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Ticket Price",
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
          placeholder: "Ticket Description",
        },
        value: "",
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
    },
  };

  componentDidMount() {
    this.props.onFetchTickets(this.props.event.id);
  }

  inputChangedHandler = (event, formElement) => {
    const updatedTicketForm = {
      ...this.state.ticketForm,
    };
    const updatedFormElement = {
      ...updatedTicketForm[formElement],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedTicketForm[formElement] = updatedFormElement;

    let formIsValid = true;
    for (let formElement in updatedTicketForm) {
      formIsValid = updatedTicketForm[formElement].valid && formIsValid;
    }
    this.setState({ ticketForm: updatedTicketForm, formIsValid: formIsValid });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElement in this.state.ticketForm) {
      formData[formElement] = this.state.ticketForm[formElement].value;
    }
    const formToSubmit = {
      eventId: this.props.event.id,
      userId: this.props.userId,
      ticketData: formData,
    };
    this.props.onCreateTicket(formToSubmit, this.props.token);
  };

  showTicketFormHandler = () => {
    this.setState({ showTicketForm: !this.state.showTicketForm });
  };

  render() {
    let tickets = <Spinner />;
    if (!this.props.loading && this.props.tickets) {
      tickets = this.props.tickets.map((ticket) => (
        <div key={ticket.id}>
          <Ticket
            key={ticket.id}
            id={ticket.id}
            picture={ticket.picture}
            price={ticket.price}
            description={ticket.description}
          />
        </div>
      ));
    }

    let ticketform = null;
    if (this.state.showTicketForm) {
      ticketform = (
        <CreateTicketForm
          onSubmitTicket={this.submitHandler}
          changed={this.inputChangedHandler}
          values={this.state}
        />
      );
    }

    return (
      <div>
        {tickets}
        <Button btnType="Success" clicked={this.showTicketFormHandler}>
          CREATE TICKET
        </Button>
        {ticketform}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTickets: (eventId) => dispatch(actions.fetchTickets(eventId)),
    onCreateTicket: (formData, token) =>
      dispatch(actions.createTicket(formData, token)),
  };
};

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets.tickets,
    event: state.event.event,
    loading: state.tickets.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
