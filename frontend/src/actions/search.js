import axios from 'axios';

import {
    RESET_DETAILS,
    GET_LIST_ITEMS,
    RESET_LIST_ITEMS,
    COMMON_LOADING_LIST_ITEMS,
    COMMON_LOADED_LIST_ITEMS,

    GET_SEARCH_CATEGORIES, CREATE_EDUCATOR, CREATE_ITEM

} from "./types";
import {returnErrors, returnWarnings, returnInfo, returnSuccess} from "./messages"
import {tokenConfig} from "./auth";



//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  GET SEARCH CONTEXT  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// GET CATEGORIES LIST
export const getCategories = () => dispatch => {
    axios.get('/api/course/category/')
        .then(res => {
            dispatch({
                type: GET_SEARCH_CATEGORIES,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};



//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  GET LIST ITEMS  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



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
    // SEARCH PAGE - COURSES ------------------------------------------------------------------------------------
    else {
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