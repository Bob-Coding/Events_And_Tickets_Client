import * as actionTypes from "../actions/event";

initialState = {
  event: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EVENT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        event: action.event,
      };
    case actionTypes.FETCH_EVENT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.UPDATE_EVENT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        event: action.data,
      };
    case actionTypes.UPDATE_EVENT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
