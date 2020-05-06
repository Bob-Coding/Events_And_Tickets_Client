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
        dispatch(fetchEventsSuccess(res.body.events));
      })
      .catch((err) => {
        dispatch(fetchEventsFail(err));
      });
  };
};
