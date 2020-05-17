import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
const url = "http://localhost:4000";

const fetchEventStart = () => {
  return {
    type: actionTypes.FETCH_EVENT_START,
  };
};

const fetchEventSuccess = (event) => {
  return {
    type: actionTypes.FETCH_EVENT_SUCCESS,
    event: event,
  };
};

const fetchEventFail = (error) => {
  return {
    type: actionTypes.FETCH_EVENT_FAIL,
    error: error,
  };
};

export const fetchEvent = (id) => {
  return (dispatch) => {
    dispatch(fetchEventStart());
    axios
      .get(`http://localhost:4000/events/${id}`)
      .then((res) => {
        dispatch(fetchEventSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchEventFail(error));
      });
  };
};

const updateEventStart = () => {
  return {
    type: actionTypes.UPDATE_EVENT_START,
  };
};

const updateEventSuccess = (id, data) => {
  return {
    type: actionTypes.UPDATE_EVENT_SUCCESS,
    eventId: id,
    data: data,
  };
};

const updateEventFail = (error) => {
  return {
    type: actionTypes.UPDATE_EVENT_FAIL,
    error: error,
  };
};

export const updateEvent = (id, eventData) => {
  return (dispatch) => {
    dispatch(updateEventStart());
    axios({
      method: "put",
      url: `http://localhost:4000/events/${id}`,
      data: eventData,
    })
      .then((response) => {
        dispatch(updateEventSuccess(response.data.id, response.data));
      })
      .catch((err) => {
        dispatch(updateEventFail(err));
      });
  };
};
