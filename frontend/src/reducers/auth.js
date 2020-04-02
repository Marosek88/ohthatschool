import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    PICTURE_UPLOADED,
    UPDATE_PROFILE,
    UPDATE_EDUCATOR,
    UPDATE_STUDENT,
    CREATE_EDUCATOR,
    CREATE_STUDENT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: {
        user_profile: null,
        educator: null,
        student: null,
        parent: null
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case PICTURE_UPLOADED:
            return {
                ...state,
                user: {...state.user, user_profile: action.payload}
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                user: {...state.user, user_profile: action.payload}
            };
        case UPDATE_EDUCATOR:
            return {
                ...state,
                user: {...state.user, educator: action.payload}
            };
        case UPDATE_STUDENT:
            return {
                ...state,
                user: {...state.user, student: action.payload}
            };
        case CREATE_EDUCATOR:
            return {
                ...state,
                user: {...state.user, educator: action.payload}
            };
        case CREATE_STUDENT:
            return {
                ...state,
                user: {...state.user, student: action.payload}
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: {
                    user_profile: action.payload.user_profile,
                    educator: action.payload.educator,
                    student: action.payload.student,
                    parent: action.payload.parent
                },
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: {
                    user_profile: null,
                    educator: null,
                    student: null,
                    parent: null
                },
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state
    }
}