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
    case actionTypes.CREATE_TICKET_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE_TICKET_SUCCESS:
      const newTicket = {
        ...action.data,
        id: action.id,
      };
      return {
        ...state,
        loading: false,
        tickets: state.tickets.concat(newTicket),
      };
    case actionTypes.CREATE_TICKET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.DELETE_TICKET_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_TICKET_SUCCESS:
      const newState = { ...state };
      return newState.filter((ticket) => ticket.id !== action.id);
    case actionTypes.DELETE_TICKET_FAIL:
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
