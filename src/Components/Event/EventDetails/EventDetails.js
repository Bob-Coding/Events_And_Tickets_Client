import React from "react";

import Button from "../../UI/Button/Button";
import Aux from "../../../hoc/Aux/Aux";
import classes from "./EventDetails.module.css";

const EventDetails = (props) => {
  return (
    <Aux>
      {props.event && (
        <div className={classes.EventDetails}>
          <h1>{props.event.name}</h1>
          <p>
            <i>Date: {props.event.startDate} - </i>
            <i>{props.event.endDate}</i>
          </p>
          <p>
            <i>description: {props.event.description}</i>
          </p>
          <p className={classes.Picture}>
            <img src={props.event.picture} alt="event" />
          </p>
        </div>
      )}
      {props.hasCreatedEvent(props.userId) && (
        <div>
          <Button btnType="Danger" clicked={props.onDelete}>
            DELETE EVENT
          </Button>
          <Button btnType="Success" clicked={props.onEdit}>
            EDIT EVENT
          </Button>
        </div>
      )}
    </Aux>
  );
};

export default EventDetails;
