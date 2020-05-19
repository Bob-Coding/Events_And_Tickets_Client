import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
const url = "http://localhost:4000";

const fetchEventsStart = () => {
  return {
    type: actionTypes.FETCH_EVENTS_START,
  };
};

const fetchEventsSuccess = (events) => {
  return {
    type: actionTypes.FETCH_EVENTS_SUCCESS,
    events: events,
  };
};

const fetchEventsFail = (error) => {
  return {
    type: actionTypes.FETCH_EVENTS_FAIL,
    error: error,
  };
};

export const fetchEvents = () => {
  return (dispatch) => {
    dispatch(fetchEventsStart());
    axios
      .get(`/events`)
      .then((res) => {
        console.log(res);
        dispatch(fetchEventsSuccess(res.data.events));
      })
      .catch((err) => {
        dispatch(fetchEventsFail(err));
      });
  };
};

const createEventStart = () => {
  return {
    type: actionTypes.CREATE_EVENT_START,
  };
};

const createEventSuccess = (id, eventData) => {
  return {
    type: actionTypes.CREATE_EVENT_SUCCESS,
    eventData: eventData,
    eventId: id,
  };
};

const createEventFail = (error) => {
  return {
    type: actionTypes.CREATE_EVENT_FAIL,
    error: error,
  };
};

export const createEvent = (eventData, token) => {
  return (dispatch) => {
    dispatch(createEventStart());
    axios({
      method: "post",
      url: "http://localhost:4000/events",
      data: eventData,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        dispatch(createEventSuccess(response.data.id, response.data));
      })
      .catch((err) => {
        dispatch(createEventFail(err));
      });
  };
};

const deleteEventStart = () => {
  return {
    type: actionTypes.DELETE_EVENT_START,
    loading: true,
  };
};

const deleteEventSuccess = (id) => {
  return {
    type: actionTypes.DELETE_EVENT_SUCCESS,
    loading: false,
    id: id,
  };
};

const deleteEventFail = (error) => {
  return {
    type: actionTypes.DELETE_EVENT_FAIL,
    error: error,
  };
};

export const deleteEvent = (id, token) => {
  return (dispatch) => {
    dispatch(deleteEventStart());
    axios({
      method: "delete",
      url: `http://localhost:4000/events/${id}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        dispatch(deleteEventSuccess(id));
      })
      .catch((err) => {
        dispatch(deleteEventFail(err));
      });
  };
};
