import { combineReducers } from "redux";

import eventReducer from "./event";
import eventsReducer from "./events";
import authReducer from "./auth";

export default combineReducers({
  event: eventReducer,
  events: eventsReducer,
  auth: authReducer,
});
