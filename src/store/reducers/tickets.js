import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tickets: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TICKETS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.tickets,
      };
    case actionTypes.FETCH_TICKETS_FAIL:
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
