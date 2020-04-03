import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getIds, changePage, changeView, changeSubView} from "../../../actions/website";
import {resetListItems, resetDetails} from "../../../actions/common"
import {createItem, getDetails, getList, getFormContext, updateItem, deleteItem} from "../../../actions/educator";

import DetailsComponent from "../../common/DetailsComponent";
import FormComponent from "../../common/FormComponent";
import BubbleMenuComponent, {button_types} from "../../common/BubbleMenuComponent";
import ListComponent from "../../common/ListComponent";
import DeleteComponent from "../../common/DeleteComponent";


export class CourseDashboard extends Component {

    static propTypes = {
        ids: PropTypes.object.isRequired,
        changePage: PropTypes.func.isRequired,
        changeView: PropTypes.func.isRequired,
        changeSubView: PropTypes.func.isRequired,
        getIds: PropTypes.func.isRequired,
        createItem: PropTypes.func.isRequired,
        getDetails: PropTypes.func.isRequired,
        getList: PropTypes.func.isRequired,
        getFormContext: PropTypes.func.isRequired,
        updateItem: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        resetDetails: PropTypes.func.isRequired,
        resetListItems: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getIds();
        this.props.changePage("educator_course");
        this.props.changeView("course");
        this.props.changeSubView("course_details");
    }

    componentWillUnmount() {
        this.props.changePage("");
        this.props.changeView("");
        this.props.changeSubView("");
        this.props.resetDetails();
        this.props.resetListItems();
    }

    render() {
        // Details component
        const details_context = {
            getDetails: this.props.getDetails,
            resetDetails: this.props.resetDetails,
            get_what: "Course",
            get_id: this.props.ids.my_course,
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
        const link_to = `/profile/educator/my_courses/${this.props.ids.my_course}/module/`;
        const list_context = {
            getList: this.props.getList,
            get_what: "Course Modules",
            get_id: this.props.ids.my_course,
            link_to: link_to,
            list_prop_list: [
                {label: "Title", properties: ["title"]},
                {label: "Description", properties: ["description"]},
                {label: "Active", properties: ["active"], boolean: true},
            ],

        };

        // Edit component
        const course = this.props.detailsData;
        const category = "category" in course ? {field_name: "category", value: course.category.id, label: course.category.name} : null;
        const edit_form_context = {
            getFormContext: this.props.getFormContext,
            submitFunction: this.props.updateItem,
            what: "Edit Course",
            what_id: this.props.ids.my_course,
            field_list: [
                {field_type: "image", label: "Course Image", name: "image"},
                {field_type: "text", label: "Title", name: "title", start_value: course.title},
                {field_type: "textarea", label: "Description", name: "description", start_value: course.description},
                {
                    field_type: "select",
                    label: "Category",
                    name: "category",
                    options: null,
                    start_value: category
                },
                {field_type: "text", label: "Price", name: "price", start_value: course.price},
            ],
            addContextToForm: (context, field_list) => {
                let category_options = [];
                context.map(category => {
                    category_options.push({field_name: "category", value: category.id, label: category.name})
                });
                field_list.map(field => {
                    if (field.label === "Category") {
                        field["options"] = category_options
                    }
                });
            }
        };

        // Delete component
        const delete_context = {
            deleteItem: this.props.deleteItem,
            delete_what: "Delete Course",
            delete_id: this.props.ids.my_course,
            link: "/profile/educator",
        };

        // Form component
        const form_context = {
            getFormContext: null,
            submitFunction: this.props.createItem,
            what: "Module",
            field_list: [
                {field_type: "invisible", label: "", name: "course", start_value: this.props.ids.my_course},
                {field_type: "image", label: "Module Image", name: "image"},
                {field_type: "text", label: "Title", name: "title", start_value: ""},
                {field_type: "textarea", label: "Description", name: "description", start_value: ""},
                {field_type: "checkbox", label: "Active", name: "active", start_value: false},
            ],
            addContextToForm: null,
        };

        // BubbleMenu data
        const button_list = [
            {
                name: "go_back",
                type: button_types.BACK_BUTTON,
                link: "/profile/educator",
            },
            {
                name: "course",
                type: button_types.VIEW_BUTTON_PARENT,
                icon: "fas fa-book-reader",
                view: "course",
                sub_view: "course_details",
                children: [
                    {
                        name: "course_details",
                        type: button_types.SUB_VIEW_BUTTON,
                        icon: "far fa-list-alt",
                        sub_view: "course_details"
                    },
                    {
                        name: "edit_course",
                        type: button_types.SUB_VIEW_BUTTON,
                        icon: "far fa-edit",
                        sub_view: "edit_course"
                    },
                    {
                        name: "delete_course",
                        type: button_types.SUB_VIEW_BUTTON,
                        icon: "fas fa-trash-alt",
                        sub_view: "delete_course"
                    },
                ]
            },
            {
                name: "add_module",
                type: button_types.VIEW_BUTTON,
                icon: "fas fa-plus",
                view: "add_module",
            },

        ];

        return (
            <Fragment>
                <div className="container wrapper">
                    {this.props.ids.my_course && this.props.sub_view === "course_details" ?
                        <Fragment>
                            <DetailsComponent details_context={details_context}/>
                            <ListComponent list_context={list_context}/>
                        </Fragment>
                        : null}

                    {this.props.ids.my_course && this.props.detailsData && this.props.sub_view === "edit_course" ?
                        <Fragment>
                            <FormComponent form_context={edit_form_context}/>
                        </Fragment>
                        : null}

                    {this.props.ids.my_course && this.props.sub_view === "delete_course" ?
                        <Fragment>
                            <DetailsComponent details_context={details_context}/>
                            <DeleteComponent delete_context={delete_context} />
                        </Fragment>
                        : null}

                    {this.props.ids.my_course && this.props.view === "add_module" ?
                        <FormComponent form_context={form_context}
                        />
                        : null}
                    <BubbleMenuComponent button_list={button_list}/>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ids: state.website.ids,
    page: state.website.page,
    view: state.website.view,
    sub_view: state.website.sub_view,
    detailsData: state.common.detailsData,
});

export default connect(mapStateToProps, {
    getIds,
    changePage,
    changeView,
    changeSubView,
    createItem,
    getFormContext,
    updateItem,
    deleteItem,
    getDetails,
    resetDetails,
    getList,
    resetListItems
})(CourseDashboard);
