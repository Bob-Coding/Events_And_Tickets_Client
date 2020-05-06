import React from "react";
import ticketslogo from "../../Pictures/ticketswap-whiteblue417x77.png";
import classes from "./Logo.module.css";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={ticketslogo} alt="ticketsLogo" />
  </div>
);

export default logo;
