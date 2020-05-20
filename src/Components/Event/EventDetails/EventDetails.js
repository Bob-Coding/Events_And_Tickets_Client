import React from "react";

import Button from "../../UI/Button/Button";
import CreateEventForm from "../CreateEventForm/CreateEventForm";
import Aux from "../../../hoc/Aux/Aux";
import classes from "./EventDetails.module.css";

const EventDetails = (props) => {
  return (
    <Aux>
      {props.event && !props.editMode && (
        <div>
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
              <img src={props.event.picture} width="200px" alt="event" />
            </p>
          </div>
          <div>
            {props.hasCreatedEvent(props.userId) && (
              <Button btnType="Danger" clicked={props.onDelete}>
                DELETE EVENT
              </Button>
            )}
            {props.hasCreatedEvent(props.userId) && (
              <Button btnType="Success" clicked={props.onEdit}>
                EDIT EVENT
              </Button>
            )}
          </div>
          {props.editMode ? (
            <CreateEventForm
              onSubmitEvent={this.submitHandler}
              changed={this.inputChangedHandler}
              values={this.props}
            />
          ) : null}
        </div>
      )}
    </Aux>
  );
};

export default EventDetails;
