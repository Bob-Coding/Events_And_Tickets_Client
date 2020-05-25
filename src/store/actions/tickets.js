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

const createTicketStart = () => {
  return {
    type: actionTypes.CREATE_TICKET_START,
  };
};

const createTicketSuccess = (id, ticketData) => {
  return {
    type: actionTypes.CREATE_TICKET_SUCCESS,
    data: ticketData,
    id: id,
  };
};

const createTicketFail = (error) => {
  return {
    type: actionTypes.CREATE_TICKET_FAIL,
    error: error,
  };
};

export const createTicket = (ticketData, token) => {
  return (dispatch) => {
    dispatch(createTicketStart());
    axios({
      method: "post",
      url: `${url}/tickets`,
      data: ticketData,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        dispatch(createTicketSuccess(response.data.id, response.data));
      })
      .catch((err) => {
        dispatch(createTicketFail(err));
      });
  };
};

const deleteTicketStart = () => {
  return {
    type: actionTypes.DELETE_TICKET_START,
    loading: true,
  };
};

const deleteTicketSuccess = (id) => {
  return {
    type: actionTypes.DELETE_TICKET_SUCCESS,
    loading: false,
    id: id,
  };
};

const deleteTicketFail = (error) => {
  return {
    type: actionTypes.DELETE_TICKET_FAIL,
    error: error,
  };
};

export const deleteTicket = (id, token) => {
  return (dispatch) => {
    dispatch(deleteTicketStart());
    axios({
      method: "delete",
      url: `${url}/tickets/${id}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        dispatch(deleteTicketSuccess(id));
      })
      .catch((err) => {
        dispatch(deleteTicketFail(err));
      });
  };
};
