import { combineReducers } from "redux";
import auth from "./auth";
import common from "./common";
import search from "./search";
import educator from "./educator";
import messages from "./messages";
import website from "./website";

export default combineReducers({
  auth,
  common,
  search,
  educator,
  messages,
  website,
});