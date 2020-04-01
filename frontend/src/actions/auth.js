import axios from 'axios';
import {returnErrors} from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';

// CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({type: USER_LOADING});

    axios.get('/api/auth/user_profile/get_user_profiles', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};


// LOGIN USER
export const login = (username, password) => dispatch => {

    // Get Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({username, password});

    axios.post('/api/auth/login', body, config)
        .then(res => {
            // this.props.returnMessage({welcomeBack: `Hello ${username}, welcome back!`});
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

//REGISTER USER
export const register = ({first_name, last_name, password, email}) => dispatch => {

    // Get Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({first_name, last_name, password, email});

    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios.post('/api/auth/logout', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};


// Setup config with token - helper function
export const tokenConfig = getState => {

    // Get Token from State
    const token = getState().auth.token;

    // Get Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // If Token, add to Headers Config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};