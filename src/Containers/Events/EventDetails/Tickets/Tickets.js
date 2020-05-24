import React from "react";
import { connect } from "react-redux";
import Ticket from "../../../../Components/Ticket/Ticket";
import Spinner from "../../../../Components/UI/Spinner/Spinner";
import * as actions from "../../../../store/actions/index";

class Tickets extends React.Component {
  componentDidMount() {
    console.log("fetching", this.props);
    this.props.onFetchTickets(this.props.event.id);
  }

  render() {
    let tickets = <Spinner />;
    if (this.props.tickets) {
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
    return <div>{tickets}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTickets: (eventId) => dispatch(actions.fetchTickets(eventId)),
  };
};

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets.tickets,
    event: state.event.event,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
