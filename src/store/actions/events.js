import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const fetchEventsStart = () => ({
  type: actionTypes.FETCH_EVENTS_START,
});

const fetchEventsSuccess = (events) => ({
  type: actionTypes.FETCH_EVENTS_SUCCESS,
  events: events,
});

const fetchEventsFail = (error) => ({
  type: actionTypes.FETCH_EVENTS_FAIL,
  error: error,
});

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

const createEventStart = () => ({
  type: EVENT_CREATE_START,
});

const createEventSuccess = (event) => ({
  type: EVENT_CREATE_SUCCESS,
  event: event,
});

const createEventFail = (error) => ({
  type: EVENT_CREATE_FAIL,
  error: error,
});

export const createEvent = () => {
  const state = getState();
  const { login } = state;
  return (dispatch) => {
    dispatch(createEventStart());
    axios
      .post(`${url}/events`)
      .set("Authorization", `Bearer ${login.jwt}`)
      .send(data)
      .then((response) => {
        dispatch(createEventSuccess(response.body));
      })
      .catch((err) => {
        dispatch(createEventFail(err));
      });
  };
};

const deleteEventStart = (id) => ({
  type: DELETE_EVENT_START,
  id,
});

const deleteEventSuccess = (id) => ({
  type: DELETE_EVENT_SUCCESS,
  id,
});

const deleteEventFail = (error) => ({
  type: DELETE_EVENT_FAIL,
  error: error,
});

export const deleteEvent = () => {
  const state = getState();
  const { login } = state;
  return (dispatch) => {
    dispatch(deleteEventStart());
    axios
      .delete(`${url}/events/${id}`)
      .set("Authorization", `Bearer ${login.jwt}`)
      .send(data)
      .then((response) => {
        dispatch(deleteEventSuccess(id));
      })
      .catch((err) => {
        dispatch(deleteEventFail(err));
      });
  };
};
