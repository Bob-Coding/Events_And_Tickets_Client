import * as actionTypes from "../actions/actionTypes";

const initialState = {
  events: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EVENTS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.events,
        loading: false,
      };
    case actionTypes.FETCH_EVENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.CREATE_EVENT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE_EVENT_SUCCESS:
      const newEvent = {
        ...action.eventData,
        id: action.eventId,
      };
      return {
        ...state,
        loading: false,
        events: state.events.concat(newEvent),
      };
    case actionTypes.CREATE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.DELETE_EVENT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_EVENT_SUCCESS:
      const newState = { ...state };
      return newState.filter((event) => event.id !== action.id);
    case actionTypes.DELETE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
