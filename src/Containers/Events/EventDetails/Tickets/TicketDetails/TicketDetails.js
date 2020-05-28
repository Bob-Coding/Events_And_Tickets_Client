import React, { Component } from "react";
import { connect } from "react-redux";
import { checkValidity } from "../../../../../Components/Validation/CheckValidity";
import CreateTicketForm from "../../../../../Components/Ticket/CreateTicketForm/CreateTicketForm";
import TicketDetails from "../../../../../Components/Ticket/TicketDetails/TicketDetails";
import Spinner from "../../../../../Components/UI/Spinner/Spinner";
import * as actions from "../../../../../store/actions/index";

class TicketDetailsContainer extends Component {
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
    this.props.onFetchTicket(Number(this.props.match.params.id));
  }

  onEdit = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };

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
      userId: this.props.userId,
      ticketData: formData,
    };
    this.setState({ editmode: false });
    this.props.onUpdateTicket(this.props.ticket.id, formToSubmit.ticketData);
  };

  deleteTicketHandler = () => {
    this.props.onDeleteTicket(this.props.ticket.id, this.props.token);
    this.props.history.push("/");
  };

  hasCreated = (id) => {
    if (this.props.ticket && this.props.ticket.userId && id) {
      return this.props.ticket.userId === id;
    }
  };

  render() {
    let ticket = <Spinner />;
    if (!this.props.loading) {
      ticket = (
        <TicketDetails
          onEdit={this.onEdit}
          changed={this.inputChangedHandler}
          onSubmitTicket={this.submitHandler}
          values={this.state}
          editMode={this.state.editMode}
          onDelete={this.deleteTicketHandler}
          ticket={this.props.ticket}
          hasCreatedTicket={this.hasCreated}
          userId={this.props.userId}
        />
      );
    }

    let ticketform = null;
    if (this.state.editMode) {
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
        <h1>Ticket</h1>
        {ticket}
        {ticketform}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ticket: state.ticket.ticket,
  loading: state.ticket.loading,
  userId: state.auth.userId,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTicket: (id) => dispatch(actions.fetchTicket(id)),
    onDeleteTicket: (id, token) => dispatch(actions.deleteTicket(id, token)),
    onUpdateTicket: (id, data) => dispatch(actions.updateTicket(id, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketDetailsContainer);
