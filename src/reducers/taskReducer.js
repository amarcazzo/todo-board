import {
  GET_TASKS,
  ADD_TASK,
  CHANGE_STATE,
  DELETE_TASK,
  SEARCH_TASK
} from "../actions/types";

const initialState = {
  items: [],
  lastUpdatedItemId: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return { items: action.payload, lastUpdatedItemId: "" };
    case ADD_TASK:
      return { ...state, lastUpdatedItemId: action.payload };
    case CHANGE_STATE:
      return { ...state, lastUpdatedItemId: action.payload };
    case DELETE_TASK:
      return { ...state, lastUpdatedItemId: action.payload };
    case SEARCH_TASK:
      return { ...state, items: action.payload };
    default:
      return state;
  }
}
