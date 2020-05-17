import React from "react";
import classes from "./Event.module.css";
import { Link } from "react-router-dom";

const event = (props) => {
  return (
    <Link to={`/events/${props.id}`}>
      <div className={classes.Event}>
        <h1>{props.name}</h1>
      </div>
    </Link>
  );
};

export default event;
