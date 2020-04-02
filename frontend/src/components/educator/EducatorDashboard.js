import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getIds, changePage, changeView, changeSubView} from "../../actions/website";
import {
    getFormContext,
    createItem,
    getDetails,
    getList,
    resetListItems,
    resetDetails
} from "../../actions/educator";
import {button_types} from "../common/BubbleMenuComponent";

import CreateRoleComponent from "../common/CreateRoleComponent";
import TileListComponent from "../common/TileListComponent";
import BubbleMenuComponent from "../common/BubbleMenuComponent";
import ProfilePageComponent from "../common/ProfilePageComponent";
import FormComponent from "../common/FormComponent";


export class EducatorDashboard extends Component {
    state = {
        previous_list_view: ""
    };

    static propTypes = {
        user: PropTypes.object.isRequired,
        ids: PropTypes.object.isRequired,
        view: PropTypes.string.isRequired,
        changePage: PropTypes.func.isRequired,
        changeView: PropTypes.func.isRequired,
        changeSubView: PropTypes.func.isRequired,
        getIds: PropTypes.func.isRequired,
        getFormContext: PropTypes.func.isRequired,
        createItem: PropTypes.func.isRequired,
        getDetails: PropTypes.func.isRequired,
        getList: PropTypes.func.isRequired,
        resetListItems: PropTypes.func.isRequired,
        resetDetails: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.changePage("educator_profile");
        if (this.props.page === "educator_course") {
            this.props.changeView("courses");
            this.props.changeSubView("course_list");
        } else {
            this.props.changeView("educator_page");
            this.props.changeSubView("");
        }
        this.props.getIds();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (["courses", "student_list", "achievements"].includes(prevProps.view)) {
            if (["courses", "student_list", "achievements"].includes(this.props.view)) {
                this.props.resetListItems()
            } else {
                this.state.previous_list_view = prevProps.view
            }
        } else {
            if (this.state.previous_list_view !== this.props.view) {
                this.props.resetListItems()
            }
        }
    }

    componentWillUnmount() {
        this.props.changePage("");
        this.props.changeView("");
        this.props.changeSubView("");
        this.props.resetDetails();
        this.props.resetListItems();
    }

    render() {
        let render_view = null;

        if (!(this.props.user.educator)) {

            // Create Role
            const create_role_form = [
                ["location", [this.props.user.user_profile.location.lat, this.props.user.user_profile.location.lon]],
                ["active", "true"],
                ["show_in_listings", "true"],
                ["local_connect", "true"],
                ["online_connect", "true"],
                ["short_bio", "Inspired Educator ready to help you achieve your goals!"],
            ];

            render_view = (
                <Fragment>
                    <CreateRoleComponent createFunction={this.props.createItem}
                                         create_what="Educator"
                                         form={create_role_form}
                                         icon="fas fa-chalkboard-teacher"/>
                </Fragment>
            );

        } else {

            // Add Course data
            const form_context = {
                getFormContext: this.props.getFormContext,
                submitFunction: this.props.createItem,
                what: "Course",
                field_list: [
                    {field_type: "image", label: "Course Image", name: "image"},
                    {field_type: "text", label: "Title", name: "title", start_value: ""},
                    {field_type: "textarea", label: "Description", name: "description", start_value: ""},
                    {
                        field_type: "select",
                        label: "Category",
                        name: "category",
                        options: null,
                        start_value: ""
                    },
                    {field_type: "text", label: "Price", name: "price", start_value: "0"},
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


            // Profile Page data
            const profile_page_data = {
                my_profile: true,
                getProfile: null,
                get_what: "Educator's Profile",
                get_id: null,
                details_prop_list: [
                    {label: "First name", properties: ["id", "first_name"]},
                    {label: "Last name", properties: ["id", "last_name"]},
                    {label: "Email", properties: ["id", "email"]},
                    {label: "Active", properties: ["active"]},
                    {label: "Teaches locally", properties: ["local_connect"]},
                    {label: "Teaches remotely", properties: ["online_connect"]},
                ],
                short_bio_prop_list: [{label: "Short bio", properties: ["short_bio"]},],
                prepareDetailDataFunction: (details_list) => {
                    let new_details_list = [];
                    details_list.map(details => {
                        if (details[0] === "First name") {
                            new_details_list.push(details)
                        } else if (details[0] === "First name") {
                            new_details_list[0][1] += " " + details[1]
                        } else if (typeof details[1] === "boolean") {
                            new_details_list.push([details[0], details[1] ? "Yes" : "No"])
                        } else {
                            new_details_list.push(details)
                        }
                    });
                    return new_details_list
                }
            };


            // Course Tile List data
            const tile_list_data = {
                getList: this.props.getList,
                get_what: "Educator's Courses",
                list_title: "My Courses",
                tile_list_prop_list: [
                    {label: "Id", properties: ["id"]},
                    {label: "Image", properties: ["image"]},
                    {label: "Title", properties: ["title"]},
                    {label: "Subtitle", properties: ["category", "name"]},
                    {label: "Description", properties: ["description"]},
                    {label: "Rating", properties: ["rating"]},
                    {label: "Price", properties: ["price"]},
                ],
                prepareTileDataFunction: (tile_object) => (
                    {
                        id: ["Id", tile_object["Id"]],
                        link: `/profile/educator/my_courses/${tile_object["Id"]}`,
                        image: tile_object["Image"],
                        title: tile_object["Title"],
                        subtitle: `${tile_object["Subtitle"]}`,
                        description: tile_object["Description"],
                        bottom: [
                            ["Learners", "123"],
                            ["Rating", tile_object["Rating"] ? tile_object["Rating"] + " / 5.0" : "Not rated"],
                            ["Price", `€${tile_object["Price"]}`]
                        ],
                    }
                )
            };

            // Students Tile List
            const student_tile_list_data = {
                getList: this.props.getList,
                get_what: "Students",
                list_title: "My Students",
                tile_list_prop_list: [
                    {label: "Id", properties: ["id", "id"]},
                    {label: "Image", properties: ["id", "image"]},
                    {label: "First name", properties: ["id", "first_name"]},
                    {label: "Last name", properties: ["id", "last_name"]},
                    {label: "Email", properties: ["id", "email"]},
                ],
                prepareTileDataFunction: (tile_object) => (
                    {
                        id: ["Id", tile_object["Id"]],
                        link: `/profile/educator/my_students/${tile_object["Id"]}`,
                        image: tile_object["Image"],
                        title: `${tile_object["First name"]} ${tile_object["Last name"]}`,
                        subtitle: `Email: ${tile_object["Email"]}`,
                        description: "",
                        bottom: [],
                    }
                )
            };

            // Achievements Tile List
            const achievements_tile_list_data = {
                getList: this.props.getList,
                get_what: "Educator's Achievements",
                list_title: "My Achievements",
                tile_list_prop_list: [
                    {label: "Id", properties: ["id"]},
                    {label: "Image", properties: ["image"]},
                    {label: "Name", properties: ["name"]},
                    {label: "Description", properties: ["description"]},
                ],
                prepareTileDataFunction: (tile_object) => (
                    {
                        id: ["Id", tile_object["Id"]],
                        link: `/profile/educator/awards/${tile_object["Id"]}`,
                        image: tile_object["Image"],
                        title: tile_object["Name"],
                        subtitle: null,
                        description: tile_object["Description"],
                        bottom: [],
                    }
                )
            };

            // BubbleMenu data
            const button_list = [
                {
                    name: "go_back",
                    type: button_types.BACK_BUTTON,
                    link: "/profile",
                },
                {
                    name: "educator_page",
                    type: button_types.VIEW_BUTTON,
                    icon: "fas fa-id-card",
                    view: "educator_page",
                },
                {
                    name: "courses",
                    type: button_types.VIEW_BUTTON_PARENT,
                    icon: "fas fa-book-reader",
                    view: "courses",
                    sub_view: "course_list",
                    children: [
                        {
                            name: "course_list",
                            type: button_types.SUB_VIEW_BUTTON,
                            icon: "far fa-list-alt",
                            sub_view: "course_list"
                        },
                        {
                            name: "add_course",
                            type: button_types.SUB_VIEW_BUTTON,
                            icon: "fas fa-plus",
                            sub_view: "add_course"
                        },
                    ]
                },
                {
                    name: "student_list",
                    type: button_types.VIEW_BUTTON,
                    icon: "fas fa-user-graduate",
                    view: "student_list",
                },
                {
                    name: "achievements",
                    type: button_types.VIEW_BUTTON,
                    icon: "fas fa-trophy",
                    view: "achievements",
                },
            ];


            render_view = (
                <Fragment>
                    <div className="container wrapper mt-2 mt-lg-4">

                        {this.props.view === "educator_page" ?
                            <ProfilePageComponent profile_page_data={profile_page_data}/>
                            : null}

                        {this.props.sub_view === "add_course" ?
                            <FormComponent form_context={form_context}/>
                            : null}

                        {this.props.sub_view === "course_list" ?
                            <TileListComponent tile_list_data={tile_list_data}/>
                            : null}

                        {this.props.view === "student_list" ?
                            <TileListComponent tile_list_data={student_tile_list_data}/>
                            : null}

                        {this.props.view === "achievements" ?
                            <TileListComponent tile_list_data={achievements_tile_list_data}/>
                            : null}
                    </div>

                    <BubbleMenuComponent button_list={button_list}/>

                </Fragment>
            );
        }

        return render_view
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    view: state.website.view,
    sub_view: state.website.sub_view,
    page: state.website.page,
    ids: state.website.ids,
});

export default connect(mapStateToProps, {
    changePage,
    changeView,
    changeSubView,
    getIds,
    getFormContext,
    createItem,
    getDetails,
    getList,
    resetListItems,
    resetDetails
})(EducatorDashboard);
