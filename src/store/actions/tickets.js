import * as actionTypes from "./actionTypes";
import axios from "axios";
const url = "http://localhost:4000";

const fetchTicketsStart = () => {
  return {
    type: actionTypes.FETCH_TICKETS_START,
  };
};

const fetchTicketsSuccess = (tickets) => {
  return {
    type: actionTypes.FETCH_TICKETS_SUCCESS,
    tickets: tickets,
  };
};

const fetchTicketsFail = (error) => {
  return {
    type: actionTypes.FETCH_TICKETS_FAIL,
    error: error,
  };
};

export const fetchTickets = (eventID) => {
  return (dispatch) => {
    dispatch(fetchTicketsStart());
    axios.get(`${url}/events/${eventID}/tickets`).then((response) => {
      dispatch(fetchTicketsSuccess(response.data));
    }).catch = (error) => {
      dispatch(fetchTicketsFail(error));
    };
  };
};
