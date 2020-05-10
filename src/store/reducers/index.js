import { combineReducers } from "redux";
import eventsReducer from "./events";
import authReducer from "./auth";

export default combineReducers({
  events: eventsReducer,
  login: authReducer,
  signUp: authReducer,
});
