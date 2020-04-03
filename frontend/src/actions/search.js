import axios from 'axios';

import {
    GET_LIST_ITEMS,
    COMMON_LOADING_LIST_ITEMS,
    COMMON_LOADED_LIST_ITEMS,

    GET_SEARCH_CATEGORIES,
    GET_USER_CONNECTS,
    OUTSIDE_SEARCH,
    RESET_OUTSIDE_SEARCH,
    COMMON_LOADING_DETAILS,
    GET_DETAILS,
    COMMON_LOADED_DETAILS,
} from "./types";
import {returnErrors, returnWarnings, returnInfo, returnSuccess} from "./messages"
import {tokenConfig} from "./auth";


//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  GET SEARCH CONTEXT  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// GET CATEGORIES LIST
export const getCategories = () => dispatch => {
    axios.get('/api/auth/category/')
        .then(res => {
            dispatch({
                type: GET_SEARCH_CATEGORIES,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// USER'S CONNECTS ----------------------------------------------------------------------------------------
export const getUserConnects = () => (dispatch, getState) => {
    axios.get('/api/auth/user_profile/get_user_connects/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_USER_CONNECTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};


//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  SEARCH LIST ITEMS  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


export const search = (page, view, form) => dispatch => {
    // SEARCH PAGE - COURSES ------------------------------------------------------------------------------------
    if (page === "search" && view === "courses") {
        axios
            .post('/api/course/course/search/', form)
            .then(res => {
                dispatch({
                    type: GET_LIST_ITEMS,
                    payload: res.data
                });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
    // FROM OUTSIDE ------------------------------------------------------------------------------------
    else {
        dispatch({type: OUTSIDE_SEARCH});
        axios
            .post('/api/course/course/search/', form)
            .then(res => {
                dispatch({
                    type: GET_LIST_ITEMS,
                    payload: res.data
                });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
};


//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  GET LIST ITEMS  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


export const getList = (get_what, get_id) => (dispatch, getState) => {
    dispatch({type: COMMON_LOADING_LIST_ITEMS});

    // COURSES ----------------------------------------------------------------------------------------
    if (get_what === "Courses") {
        axios.get('/api/course/course/', tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_LIST_ITEMS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: COMMON_LOADED_LIST_ITEMS});
            });

    }
    // EDUCATORS ----------------------------------------------------------------------------------------
    else if (get_what === "Educators") {
        axios.get(`/api/educator/educator/`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_LIST_ITEMS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: COMMON_LOADED_LIST_ITEMS});
            });
    }
    // COURSE MODULES ---------------------------------------------------------------------------------------- C M
    else if (get_what === "Course Modules") {
        axios.get(`/api/course/course/${get_id}/get_course_modules/`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_LIST_ITEMS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: COMMON_LOADED_LIST_ITEMS});
            });
    }

};


//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   GET DETAILS  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


export const getDetails = (get_what, get_id) => (dispatch, getState) => {
    dispatch({type: COMMON_LOADING_DETAILS});

    // DETAILS FOR COURSE ---------------------------------------------------------------------------------------- C
    if (get_what === "Course") {

        axios.get(`/api/course/course/${get_id}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_DETAILS,
                    payload: res.data
                });
                dispatch({type: COMMON_LOADED_DETAILS});
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: COMMON_LOADED_DETAILS});
            });
    }
};


//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  CONNECT  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


export const connectAction = (what, with_what, form) => (dispatch, getState) => {
    if (what === "Student" && with_what === "Course") {
        axios
            .post(`/api/student/student-course/connect_with_course/`, form, tokenConfig(getState))
            .then(res => {
                // dispatch({
                //     type: UPDATE_STUDENT,
                //     payload: res.data
                // });
                dispatch(returnSuccess(`You are now connected with this ${with_what}!`, 201))
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
};


//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  RESET  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// RESET OUTSIDE SEARCH
export const resetOutsideSearch = () => (dispatch) => {
    dispatch({
        type: RESET_OUTSIDE_SEARCH,
    });
};
