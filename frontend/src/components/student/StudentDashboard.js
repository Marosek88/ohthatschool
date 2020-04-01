import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getIds, changePage, changeView, changeSubView} from "../../actions/website";
import {
    getFormContext,
    createItem,
    getList,
    resetListItems,
    resetDetails
} from "../../actions/student";
import {button_types} from "../common/BubbleMenuComponent";

import CreateRoleComponent from "../common/CreateRoleComponent";
import TileListComponent from "../common/TileListComponent";
import BubbleMenuComponent from "../common/BubbleMenuComponent";
import ProfilePageComponent from "../common/ProfilePageComponent";


export class StudentDashboard extends Component {
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
        getList: PropTypes.func.isRequired,
        resetListItems: PropTypes.func.isRequired,
        resetDetails: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.changePage("student_profile");
        this.props.changeView("student_page");
        this.props.getIds();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.resetListItems()
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

        if (!(this.props.user.student)) {

            // Create Role
            const create_role_form = [
                ["location", [this.props.user.user_profile.location.lat, this.props.user.user_profile.location.lon]],
                ["active", "true"],
                ["show_in_listings", "true"],
                ["local_connect", "true"],
                ["online_connect", "true"],
                ["short_bio", "Inspired Student ready to help you achieve your goals!"],
            ];

            render_view = (
                <Fragment>
                    <CreateRoleComponent createFunction={this.props.createItem}
                                         create_what="Student"
                                         form={create_role_form}
                                         icon="fas fa-user-graduate"/>
                </Fragment>
            );

        } else {

            // Profile Page data
            const profile_page_data = {
                my_profile: true,
                getProfile: null,
                get_what: "Student's Profile",
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
                get_what: "Student's Courses",
                list_title: "My Courses",
                tile_list_prop_list: [
                    {label: "Id", properties: ["id"]},
                    {label: "Image", properties: ["course", "image"]},
                    {label: "Title", properties: ["course", "title"]},
                    {label: "Subtitle", properties: ["course", "owner", "id", "email"]},
                    {label: "Description", properties: ["course", "description"]},
                    {label: "Rating", properties: ["course", "rating"]},
                    {label: "Price", properties: ["course", "price"]},
                ],
                prepareTileDataFunction: (tile_object) => (
                    {
                        id: ["Id", tile_object["Id"]],
                        link: `/profile/student/my_courses/${tile_object["Id"]}`,
                        image: tile_object["Image"],
                        title: tile_object["Title"],
                        subtitle: `by ${tile_object["Subtitle"]}`,
                        description: tile_object["Description"],
                        bottom: [
                            ["Learners", "123"],
                            ["Rating", tile_object["Rating"] ? tile_object["Rating"] + " / 5.0" : "Not rated"],
                            ["Price", `€${tile_object["Price"]}`]
                        ],
                    }
                )
            };

            // Educators Tile List
            const educator_tile_list_data = {
                getList: this.props.getList,
                get_what: "Educators",
                list_title: "My Educators",
                tile_list_prop_list: [
                    {label: "Id", properties: ["id", "id"]},
                    {label: "Image", properties: ["id", "image"]},
                    {label: "First name", properties: ["id", "first_name"]},
                    {label: "Last name", properties: ["id", "last_name"]},
                    {label: "Subtitle", properties: ["id", "email"]},
                ],
                prepareTileDataFunction: (tile_object) => (
                    {
                        id: ["Id", tile_object["Id"]],
                        link: `/profile/student/my_students/${tile_object["Id"]}`,
                        image: tile_object["Image"],
                        title: `${tile_object["First name"]} ${tile_object["Last name"]}`,
                        subtitle: `by ${tile_object["Subtitle"]}`,
                        description: null,
                        bottom: [],
                    }
                )
            };

            // Achievements Tile List
            const achievements_tile_list_data = {
                getList: this.props.getList,
                get_what: "Student's Achievements",
                list_title: "My Achievements",
                tile_list_prop_list: [
                    {label: "Id", properties: ["id"]},
                    {label: "Image", properties: ["image"]},
                    {label: "First name", properties: ["first_name"]},
                    {label: "Last name", properties: ["last_name"]},
                    {label: "Subtitle", properties: ["email"]},
                ],
                prepareTileDataFunction: (tile_object) => (
                    {
                        id: ["Id", tile_object["Id"]],
                        link: `/profile/student/my_students/${tile_object["Id"]}`,
                        image: tile_object["Image"],
                        title: `${tile_object["First name"]} ${tile_object["Last name"]}`,
                        subtitle: `by ${tile_object["Subtitle"]}`,
                        description: "",
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
                    name: "student_page",
                    type: button_types.VIEW_BUTTON,
                    icon: "fas fa-id-card",
                    view: "student_page",
                },
                {
                    name: "courses",
                    type: button_types.VIEW_BUTTON,
                    icon: "fas fa-book-reader",
                    view: "courses",
                },
                {
                    name: "educator_list",
                    type: button_types.VIEW_BUTTON,
                    icon: "fas fa-chalkboard-teacher",
                    view: "educator_list",
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
                    <div className="container wrapper mt-2">

                        {this.props.view === "student_page" ?
                            <ProfilePageComponent profile_page_data={profile_page_data}/>
                            : null}

                        {this.props.view === "courses" ?
                            <TileListComponent tile_list_data={tile_list_data}/>
                            : null}

                        {this.props.view === "educator_list" ?
                            <TileListComponent tile_list_data={educator_tile_list_data}/>
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
    getList,
    resetListItems,
    resetDetails
})(StudentDashboard);
