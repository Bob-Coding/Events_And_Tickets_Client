import React from "react";
import classes from "./Event.module.css";
import { Link } from "react-router-dom";

const event = (props) => {
  return (
    <Link to={`/events/${props.id}`}>
      <div className={classes.Event}>
        <ul>Name: {props.name}</ul>
      </div>
    </Link>
  );
};

export default event;
