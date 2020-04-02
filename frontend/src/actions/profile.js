import axios from 'axios';
import {returnErrors, returnSuccess} from './messages';

import {
    COMMON_LOADED_DETAILS,
    COMMON_LOADED_LIST_ITEMS,
    COMMON_LOADING_DETAILS,
    COMMON_LOADING_LIST_ITEMS,
    CREATE_ITEM,
    CREATE_STUDENT,
    GET_DETAILS,
    GET_FORM_CONTEXT, GET_LIST_ITEMS,
    PICTURE_UPLOADED,
    UPDATE_PROFILE,
    UPDATE_EDUCATOR,
    UPDATE_STUDENT,
} from './types';

import {tokenConfig} from "./auth";

// UPLOAD PICTURE
export const uploadPicture = (id, form) => (dispatch, getState) => {
    axios
        .post(`api/auth/user_profile/update_profile_picture/`, form, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: PICTURE_UPLOADED,
                payload: res.data
            });
            dispatch(returnSuccess(`Profile picture uploaded`, 201))
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  GET FORM CONTEXT  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



export const getFormContext = (get_what, get_id) => (dispatch, getState) => {

    // GENERAL SETTINGS FORM ---------------------------------------------------------------------
    if (get_what === "Create Achievement") {
        axios.get('/api/achievement/achievement/get_type_options/')
            .then(res => {
                dispatch({
                    type: GET_FORM_CONTEXT,
                    payload: res.data
                });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
    // EDUCATOR SETTINGS FORM ---------------------------------------------------------------------
    else if (["Educator Settings", "Student Settings"].includes(get_what)) {
        axios.get('/api/auth/category/')
            .then(res => {
                dispatch({
                    type: GET_FORM_CONTEXT,
                    payload: res.data
                });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
};



//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  GET LIST ITEMS  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



export const getList = (get_what, get_id) => (dispatch, getState) => {
    dispatch({type: COMMON_LOADING_LIST_ITEMS});

    // ACHIEVEMENTS ----------------------------------------------------------------------------------------
    if (get_what === "Achievements") {
        axios.get('/api/achievement/achievement-user/', tokenConfig(getState))
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



//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  CREATE ITEM  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



export const createItem = (add_what, form) => (dispatch, getState) => {
    // ADD ACHIEVEMENT ---------------------------------------------------------------------------------------- CREATE E
    if (add_what === "Achievement") {
        axios
            .post('/api/achievement/achievement-user/', form, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: CREATE_STUDENT,
                    payload: res.data
                });
                dispatch(returnSuccess(`${add_what} created successfully!`, 201))
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
};



//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  UPDATE ITEM  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



export const updateProfile = (update_what, update_id, form) => (dispatch, getState) => {
    // GENERAL SETTINGS ----------------------------------------------------------------------------------------
    if (update_what === "User Profile Settings") {
        axios
            .patch(`/api/auth/user_profile/${update_id}/`, form, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: res.data
                });
                dispatch(returnSuccess(`${update_what} updated successfully!`, 201))
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
    // EDUCATOR SETTINGS ----------------------------------------------------------------------------------------
    else if (update_what === "Educator Settings") {
        axios
            .patch(`/api/educator/educator-user/${update_id}/`, form, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: UPDATE_EDUCATOR,
                    payload: res.data
                });
                dispatch(returnSuccess(`${update_what} updated successfully!`, 201))
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
    // STUDENT SETTINGS ----------------------------------------------------------------------------------------
    else if (update_what === "Student Settings") {
        axios
            .patch(`/api/student/student-user/${update_id}/`, form, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: UPDATE_STUDENT,
                    payload: res.data
                });
                dispatch(returnSuccess(`${update_what} updated successfully!`, 201))
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
};
