import {
    RESET_DETAILS,
    RESET_LIST_ITEMS,
    RESET_FORM_CONTEXT,
    RESET_PROFILE,
} from "./types";


// RESET DETAILS
export const resetDetails = () => (dispatch) => {
    dispatch({
        type: RESET_DETAILS,
    });
};

// RESET LIST ITEMS
export const resetListItems = () => (dispatch) => {
    dispatch({
        type: RESET_LIST_ITEMS,
    });
};

// RESET PROFILE DATA
export const resetProfile = () => (dispatch) => {
    dispatch({
        type: RESET_PROFILE,
    });
};

// RESET FORM CONTEXT
export const resetFormContext = () => (dispatch) => {
    dispatch({
        type: RESET_FORM_CONTEXT,
    });
};