import { GET_SEARCH_CATEGORIES, OUTSIDE_SEARCH, RESET_OUTSIDE_SEARCH } from "../actions/types.js";

const initialState = {
  categories: [],
  outside_search: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
      case OUTSIDE_SEARCH:
      return {
        ...state,
        outside_search: true
      };
      case RESET_OUTSIDE_SEARCH:
      return {
        ...state,
        outside_search: false
      };
    default:
      return state;
  }
}