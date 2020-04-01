import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getIds, changePage, changeView} from "../../../../../actions/website";
import {getDetails, resetDetails, getList, resetListItems} from "../../../../../actions/educator";

import DetailsComponent from "../../../../common/DetailsComponent";
import BubbleMenuComponent, {button_types} from "../../../../common/BubbleMenuComponent";

export class LessonDashboard extends Component {

    static propTypes = {
        ids: PropTypes.object.isRequired,
        view: PropTypes.string.isRequired,
        getIds: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getIds();
        this.props.changePage("educator_lesson");
        this.props.changeView("lesson_details");
    }

    componentWillUnmount() {
        this.props.changePage("");
        this.props.changeView("");
        this.props.resetDetails();
        this.props.resetListItems();
    }

    render() {
        // Details Component
        const details_context = {
            getDetails: this.props.getDetails,
            get_what: "Lesson",
            get_id: this.props.ids.lesson,
            details_prop_list: [
            {label: "Module", properties: ["module", "title"]},
            {label: "Title", properties: ["title"]},
            {label: "Description", properties: ["description"]},
            {label: "Duration", properties: ["duration"]},
            {label: "Created at", properties: ["created_at"]},
        ],
        };

        // Prepare BubbleMenu data
        const button_list = [
            {
                name: "go_back",
                type: button_types.BACK_BUTTON,
                link: `/profile/educator/my_courses/${this.props.ids.my_course}/module/${this.props.ids.module}`,
            },
            {
                name: "lesson_details",
                type: button_types.VIEW_BUTTON,
                icon: "far fa-list-alt",
                view: "lesson_details",
            },
        ];

        return (
            <Fragment>
                <div className="container wrapper">
                    {this.props.ids.lesson && this.props.view === "lesson_details" ?
                        <Fragment>
                            <DetailsComponent details_context={details_context}/>
                        </Fragment>
                        : null}

                </div>
                <BubbleMenuComponent button_list={button_list}/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ids: state.website.ids,
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
})(LessonDashboard);
