// import React from "react";
// import { connect } from "react-redux";

// import TicketDetails from "../../../../../Components/Ticket/TicketDetails/TicketDetails";
// import * as actions from "../../../../../store/actions/index";
// import Spinner from "../../../../../Components/UI/Spinner/Spinner";
// import { checkValidity } from "../../../../../Components/Validation/CheckValidity";
// import CreateEventForm from "../../../../../Components/Event/CreateEventForm/CreateEventForm";

// class EventDetailsContainer extends React.Component {
//   state = {
//     editMode: false,
//     ticketForm: {
//       picture: {
//         elementType: "input",
//         elementConfig: {
//           type: "url",
//           placeholder: "URL Picture",
//         },
//         value: "",
//         validation: {
//           required: false,
//         },
//         valid: false,
//         touched: false,
//       },
//       description: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Ticket Description",
//         },
//         value: "",
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false,
//       },
//       Price: {
//         elementType: "input",
//         elementConfig: {
//           type: "number",
//           placeholder: "Price",
//         },
//         value: "",
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false,
//       },
//     },
//   };

//   componentDidMount() {
//     this.props.onFetchTicket(Number(this.props.ticket.id));
//   }

//   onEdit = () => {
//     this.setState({
//       editMode: !this.state.editMode,
//     });
//   };

//   inputChangedHandler = (event, formElement) => {
//     const updatedTicketForm = {
//       ...this.state.ticketForm,
//     };
//     const updatedFormElement = {
//       ...updatedTicketForm[formElement],
//     };
//     updatedFormElement.value = event.target.value;
//     updatedFormElement.valid = checkValidity(
//       updatedFormElement.value,
//       updatedFormElement.validation
//     );
//     updatedFormElement.touched = true;
//     updatedTicketForm[formElement] = updatedFormElement;

//     let formIsValid = true;
//     for (let formElement in updatedTicketForm) {
//       formIsValid = updatedTicketForm[formElement].valid && formIsValid;
//     }
//     this.setState({ ticketForm: updatedTicketForm, formIsValid: formIsValid });
//   };

//   submitHandler = (event) => {
//     event.preventDefault();
//     const formData = {};
//     for (let formElement in this.state.ticketForm) {
//       formData[formElement] = this.state.ticketForm[formElement].value;
//     }
//     const formToSubmit = {
//       userId: this.props.userId,
//       ticketData: formData,
//     };
//     this.setState({ editmode: false });
//     // this.props.onUpdateEvent(this.props.event.id, formToSubmit.eventData);
//   };

//   deleteEventHandler = () => {
//     // this.props.onDeleteEvent(this.props.event.id, this.props.token);
//     this.props.history.push("/");
//   };

//   hasCreated = (id) => {
//     if (this.props.ticket && this.props.ticket.userId && id) {
//       return this.props.ticket.userId === id;
//     }
//   };

//   render() {
//     let ticket = <Spinner />;
//     if (!this.props.loading && this.props.ticket) {
//       ticket = (
//         <TicketDetails
//           onEdit={this.onEdit}
//           changed={this.inputChangedHandler}
//           onSubmitEvent={this.submitHandler}
//           values={this.state}
//           editMode={this.state.editMode}
//           onDelete={this.deleteEventHandler}
//           event={this.props.event}
//           hasCreatedEvent={this.hasCreated}
//           userId={this.props.userId}
//         />
//       );
//     }

//     let ticketForm = null;
//     if (this.state.editMode) {
//       ticketForm = (
//         <CreateEventForm
//           onSubmitEvent={this.submitHandler}
//           changed={this.inputChangedHandler}
//           values={this.state}
//         />
//       );
//     }

//     return (
//       <div>
//         <h1>Ticket</h1>
//         {ticket}
//         {ticketForm}
//         {console.log(this.props.ticket)}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   event: state.event.event,
//   loading: state.event.loading,
//   userId: state.auth.userId,
//   token: state.auth.token,
//   ticket: state.ticket.ticket,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onFetchTicket: (id) => dispatch(actions.fetchTicket(id)),
//     //     onDeleteEvent: (id, token) => dispatch(deleteEvent(id, token)),
//     //     onUpdateEvent: (id, data) => dispatch(actions.updateEvent(id, data)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(EventDetailsContainer);
