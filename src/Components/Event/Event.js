import React from "react";
import classes from "./Event.module.css";
import { Link } from "react-router-dom";

const event = (props) => {
  return (
    <div className={classes.Event}>
      <ul>
        <li key={event.name}>
          <Link to={`/events/${event.id}`}>{event.name}</Link>
        </li>
      </ul>
    </div>
  );
};

export default event;
