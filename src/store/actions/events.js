import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
const url = "http://localhost:4000";

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
  type: actionTypes.CREATE_EVENT_START,
});

const createEventSuccess = (event) => ({
  type: actionTypes.CREATE_EVENT_SUCCESS,
  event: event,
});

const createEventFail = (error) => ({
  type: actionTypes.CREATE_EVENT_FAIL,
  error: error,
});

export const createEvent = (data) => {
  return (dispatch, getState) => {
    const state = getState();
    const { login } = state;
    dispatch(createEventStart());
    axios({
      method: "post",
      url: "http://localhost:4000/events",
      data: data,
      headers: {
        Authorization: "Bearer " + login.jwt,
      },
    })
      .then((response) => {
        dispatch(createEventSuccess(response.body));
      })
      .catch((err) => {
        dispatch(createEventFail(err));
      });
  };
};

const deleteEventStart = () => ({
  type: actionTypes.DELETE_EVENT_START,
  loading: true,
});

const deleteEventSuccess = (id) => ({
  type: actionTypes.DELETE_EVENT_SUCCESS,
  loading: false,
  id: id,
});

const deleteEventFail = (error) => ({
  type: actionTypes.DELETE_EVENT_FAIL,
  error: error,
});

export const deleteEvent = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const { login } = state;
    dispatch(deleteEventStart());
    axios
      .delete(`${url}/events/${id}`)
      .set("Authorization", `Bearer ${login.jwt}`)
      .then((response) => {
        dispatch(deleteEventSuccess(id));
      })
      .catch((err) => {
        dispatch(deleteEventFail(err));
      });
  };
};
