import * as actionTypes from "./actionTypes";
import axios from "axios";
const url = "http://localhost:4000";

const fetchEventStart = () => {
  return {
    type: actionTypes.FETCH_TICKET_START,
  };
};

const fetchTicketSuccess = (ticket) => {
  return {
    type: actionTypes.FETCH_TICKET_SUCCESS,
    ticket: ticket,
  };
};

const fetchTicketFail = (error) => {
  return {
    type: actionTypes.FETCH_TICKET_FAIL,
    error: error,
  };
};

export const fetchTicket = (id) => {
  return (dispatch) => {
    dispatch(fetchEventStart());
    axios
      .get(`${url}/tickets/${id}`)
      .then((res) => {
        dispatch(fetchTicketSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchTicketFail(err));
      });
  };
};

const updateTicketStart = () => {
  return {
    type: actionTypes.UPDATE_TICKET_START,
  };
};

const updateTicketSuccess = (id, ticketData) => {
  return {
    type: actionTypes.UPDATE_TICKET_SUCCESS,
    id: id,
    data: ticketData,
  };
};

const updateTicketFail = (error) => {
  return {
    type: actionTypes.UPDATE_TICKET_FAIL,
    error: error,
  };
};

export const updateTicket = (id, ticketData) => {
  return (dispatch) => {
    dispatch(updateTicketStart());
    axios({
      method: "put",
      url: `${url}/events/${id}`,
      data: ticketData,
    })
      .then((response) => {
        dispatch(updateTicketSuccess(response.data.id, response.data));
      })
      .catch((err) => {
        dispatch(updateTicketFail(err));
      });
  };
};
