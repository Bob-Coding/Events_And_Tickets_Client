import React from "react";

import Button from "../../UI/Button/Button";
import Aux from "../../../hoc/Aux/Aux";
import classes from "./TicketDetails.module.css";

const TicketDetails = (props) => {
  return (
    <Aux>
      {props.ticket && (
        <div className={classes.TicketDetails}>
          <p>
            <i>Price: €{props.ticket.price} - </i>
          </p>
          <p>
            <i>description: {props.ticket.description}</i>
          </p>
          <p className={classes.TicketPicture}>
            <img src={props.ticket.picture} alt="ticket" />
          </p>
        </div>
      )}
      {props.hasCreatedTicket(props.userId) && (
        <div>
          <Button btnType="Danger" clicked={props.onDelete}>
            DELETE TICKET
          </Button>
          <Button btnType="Success" clicked={props.onEdit}>
            EDIT TICKET
          </Button>
        </div>
      )}
    </Aux>
  );
};

export default TicketDetails;
