import {RETURN_ERRORS, RETURN_WARNINGS, RETURN_INFO, RETURN_SUCCESS} from "./types";

// GET ERRORS
export const returnErrors = (msg, status) => {
    return {
        type: RETURN_ERRORS,
        payload: {msg, status}
    }
};

// GET WARNINGS
export const returnWarnings = (msg, status) => {
    return {
        type: RETURN_WARNINGS,
        payload: {msg, status}
    }
};

// GET INFO
export const returnInfo = (msg, status) => {
    return {
        type: RETURN_INFO,
        payload: {msg, status}
    }
};

// GET SUCCESS
export const returnSuccess = (msg, status) => {
    return {
        type: RETURN_SUCCESS,
        payload: {msg, status}
    }
};