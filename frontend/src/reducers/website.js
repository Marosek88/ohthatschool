import {GET_IDS, CHANGE_PAGE, CHANGE_VIEW, CHANGE_SUB_VIEW} from "../actions/types.js";

const initialState = {
    ids: {},
    page: "",
    view: "",
    sub_view: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_IDS:
            return {
                ...state,
                ids: action.payload
            };
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            };
        case CHANGE_VIEW:
            return {
                ...state,
                view: action.payload
            };
        case CHANGE_SUB_VIEW:
            return {
                ...state,
                sub_view: action.payload
            };
        default:
            return state;
    }
}