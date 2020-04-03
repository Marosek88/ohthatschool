import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getIds, changePage, changeView} from "../../../actions/website";
import {resetDetails, resetListItems} from "../../../actions/common";
import {connectAction, getDetails, getList} from "../../../actions/search";

import DetailsComponent from "../../common/DetailsComponent";
import BubbleMenuComponent, {button_types} from "../../common/BubbleMenuComponent";
import ListComponent from "../../common/ListComponent";
import ConnectComponent from "../../common/ConnectComponent";


export class SearchCourseDashboard extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        ids: PropTypes.object.isRequired,
        changePage: PropTypes.func.isRequired,
        changeView: PropTypes.func.isRequired,
        getIds: PropTypes.func.isRequired,
        getDetails: PropTypes.func.isRequired,
        getList: PropTypes.func.isRequired,
        resetDetails: PropTypes.func.isRequired,
        resetListItems: PropTypes.func.isRequired,
        connectAction: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getIds();
        this.props.changePage("search_course");
        this.props.changeView("course_details");
    }

    componentWillUnmount() {
        this.props.changePage("");
        this.props.changeView("");
        this.props.resetDetails();
        this.props.resetListItems();
    }

    render() {
        // Details component
        const details_context = {
            getDetails: this.props.getDetails,
            resetDetails: this.props.resetDetails,
            get_what: "Course",
            get_id: this.props.ids.course,
            details_prop_list: [
                {label: "Title", properties: ["title"]},
                {label: "Category", properties: [""]},
                {label: "Description", properties: ["description"]},
                {label: "Duration", properties: ["duration"]},
                {label: "Price", properties: ["price"]},
                {label: "Created at", properties: ["created_at"]},
            ],
        };

        // List component
        const link_to = `/search/courses/${this.props.ids.course}/module/`;
        const list_context = {
            getList: this.props.getList,
            get_what: "Course Modules",
            get_id: this.props.ids.course,
            link_to: link_to,
            list_prop_list: [
                {label: "Title", properties: ["title"]},
                {label: "Description", properties: ["description"]},
                {label: "Active", properties: ["active"], boolean: true},
            ],

        };

        // Connect context
        const connect_context = {
            connectAction: this.props.connectAction,
            what: "Student",
            with_what: "Course",
            with_id: this.props.ids.course,
            // Alternatives: text must be true for alternative to be triggered
            alternatives: [
                {
                    test: !this.props.isAuthenticated,
                    button_text: "Log in to connect",
                    link: "/login"
                },
                {
                    test: !this.props.user.student,
                    button_text: "Create Student Profile to Connect",
                    link: "/profile/student"
                },
                {
                    test: this.props.user.student && this.props.user.student.connects.courses.includes(this.props.ids.course),
                    button_text: "You are already connected!",
                    link: "/profile/student"
                }
            ],
        };


        // BubbleMenu data
        const button_list = [
            {
                name: "go_back",
                type: button_types.BACK_BUTTON,
                link: "/search",
            },
        ];

        return (
            <Fragment>
                <div className="container wrapper">

                    {this.props.ids.course && this.props.view === "course_details" ?
                        <Fragment>
                            <DetailsComponent details_context={details_context}/>
                            <ListComponent list_context={list_context}/>
                            <ConnectComponent connect_context={connect_context}/>
                        </Fragment>
                        : null}

                    <BubbleMenuComponent button_list={button_list}/>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    ids: state.website.ids,
    page: state.website.page,
    view: state.website.view,
});

export default connect(mapStateToProps, {
    getIds,
    changePage,
    changeView,
    getDetails,
    resetDetails,
    getList,
    resetListItems,
    connectAction,
})(SearchCourseDashboard);
