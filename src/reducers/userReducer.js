import { LOG_IN, LOG_OUT, AUTH_INIT } from "../actions/types";

const initialState = {
  name: "",
  id: "",
  email: "",
  picture: "../images/profile_placeholder.png",
  isLoggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        ...action.payload
      };
    case LOG_OUT:
      return {
        ...state,
        ...action.payload
      };
    case AUTH_INIT:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
