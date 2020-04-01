import { GET_SEARCH_CATEGORIES } from "../actions/types.js";

const initialState = {
  categories: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    default:
      return state;
  }
}