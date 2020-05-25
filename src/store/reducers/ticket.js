import * as actionTypes from "../actions/actionTypes";
initialState = {
  loading: false,
  ticket: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TICKET_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        ticket: action.ticket,
      };
    case actionTypes.FETCH_TICKET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.UPDATE_TICKET_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        ticket: action.data,
      };
    case actionTypes.UPDATE_TICKET_FAIL:
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
