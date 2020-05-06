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
    default:
      return state;
  }
};

export default reducer;
