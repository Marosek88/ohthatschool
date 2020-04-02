import axios from 'axios';

import {
    GET_LIST_ITEMS,
    COMMON_LOADING_LIST_ITEMS,
    COMMON_LOADED_LIST_ITEMS,

    GET_SEARCH_CATEGORIES,
    OUTSIDE_SEARCH,
    RESET_OUTSIDE_SEARCH,
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

};


//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  RESET  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// RESET OUTSIDE SEARCH
export const resetOutsideSearch = () => (dispatch) => {
    dispatch({
        type: RESET_OUTSIDE_SEARCH,
    });
};
