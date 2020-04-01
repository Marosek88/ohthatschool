import axios from 'axios';

import { GET_IDS, CHANGE_PAGE, CHANGE_VIEW, CHANGE_SUB_VIEW } from "./types";

// GET IDS
export const getIds = () => dispatch => {
    // let my_course_re = new RegExp('(?<=(my_courses\/))[0-9]+');
    let my_course_re = new RegExp('(?<=(my_courses\/))([0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12})');
    let module_re = new RegExp('(?<=(module\/))([0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12})');
    let lesson_re = new RegExp('(?<=(lesson\/))([0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12})');

    let ids =  {
        "my_course": my_course_re.exec(window.location.href) ? my_course_re.exec(window.location.href)[0] : null,
        "module": module_re.exec(window.location.href) ? module_re.exec(window.location.href)[0] : null,
        "lesson": lesson_re.exec(window.location.href) ? lesson_re.exec(window.location.href)[0] : null,
    };

    dispatch({
        type: GET_IDS,
        payload: ids
    })
};

// CHANGE PAGE
export const changePage = (page) => dispatch => {
    dispatch({
        type: CHANGE_PAGE,
        payload: page,
    })
};

// CHANGE VIEW
export const changeView = (view) => dispatch => {
    dispatch({
        type: CHANGE_VIEW,
        payload: view,
    })
};

// CHANGE SUB VIEW
export const changeSubView = (sub_view) => dispatch => {
    dispatch({
        type: CHANGE_SUB_VIEW,
        payload: sub_view,
    })
};