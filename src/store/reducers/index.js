import { combineReducers } from "redux";

import eventReducer from "./event";
import eventsReducer from "./events";
import authReducer from "./auth";
import ticketsReducer from "./tickets";

export default combineReducers({
  event: eventReducer,
  events: eventsReducer,
  auth: authReducer,
  tickets: ticketsReducer,
});
