import {RETURN_ERRORS, RETURN_WARNINGS, RETURN_INFO, RETURN_SUCCESS} from "../actions/types.js";

const initialState = {
    error: {
        msg: {},
        status: null
    },
    warning: {
        msg: {},
        status: null
    },
    info: {
        msg: {},
        status: null
    },
    success: {
        msg: {},
        status: null
    }

};

export default function (state = initialState, action) {
    switch (action.type) {
        case RETURN_ERRORS:
            return {
                ...state,
                error: {
                    msg: action.payload.msg,
                    status: action.payload.status
                }
            };
        case RETURN_WARNINGS:
            return {
                ...state,
                warning: {
                    msg: action.payload.msg,
                    status: action.payload.status
                }
            };
        case RETURN_INFO:
            return {
                ...state,
                info: {
                    msg: action.payload.msg,
                    status: action.payload.status
                }
            };
        case RETURN_SUCCESS:
            return {
                ...state,
                success: {
                    msg: action.payload.msg,
                    status: action.payload.status
                }
            };
        default:
            return state;
    }
}