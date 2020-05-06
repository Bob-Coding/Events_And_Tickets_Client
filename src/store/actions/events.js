import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const fetchEventsStart = () => ({
  type: actionTypes.EVENTS_FETCH_START,
});

const fetchEventsSuccess = (events) => ({
  type: actionTypes.EVENTS_FETCH_SUCCES,
  events: events,
});

const fetchEventsFail = (error) => ({
  type: actionTypes.EVENTS_FETCH_SUCCES,
  error: error,
});

export const fetchEvents = () => {
  if (getState().events) return;
  return (dispatch) => {
    dispatch(fetchEventsStart());
    axios
      .get(`${url}/events.json`)
      .then((res) => {
        dispatch(fetchEventsSuccess(res.body));
      })
      .catch((err) => {
        dispatch(fetchEventsFail(err));
      });
  };
};
