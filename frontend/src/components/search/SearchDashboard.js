import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getIds, changePage, changeView, changeSubView} from "../../actions/website";
import {getList, resetOutsideSearch} from "../../actions/search";
import {resetListItems} from "../../actions/common";

import {button_types} from "../common/BubbleMenuComponent";

import TileListComponent from "../common/TileListComponent";
import BubbleMenuComponent from "../common/BubbleMenuComponent";
import SearchBarComponent from "../common/SearchBarComponent";
import ComingSoonComponent from "../common/ComingSoonComponent";


export class SearchDashboard extends Component {
    state = {
        previous_list_view: ""
    };

    static propTypes = {
        user: PropTypes.object.isRequired,
        ids: PropTypes.object.isRequired,
        view: PropTypes.string.isRequired,
        outside_search: PropTypes.bool.isRequired,
        changePage: PropTypes.func.isRequired,
        changeView: PropTypes.func.isRequired,
        changeSubView: PropTypes.func.isRequired,
        getIds: PropTypes.func.isRequired,
        getList: PropTypes.func.isRequired,
        resetListItems: PropTypes.func.isRequired,
        resetOutsideSearch: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.changePage("search");
        this.props.changeView("courses");
        this.props.getIds();
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log("updated")
    //     this.props.resetListItems()
    // }

    componentWillUnmount() {
        this.props.changePage("");
        this.props.changeView("");
        this.props.changeSubView("");
        this.props.resetListItems();
        this.props.resetOutsideSearch();
    }

    render() {
        // Courses Tile List data
        const courses_tile_list_data = {
            getList: this.props.outside_search ? null : this.props.getList,
            get_what: "Courses",
            list_title: "Search Courses",
            tile_list_prop_list: [
                {label: "Id", properties: ["id"]},
                {label: "Image", properties: ["image"]},
                {label: "Title", properties: ["title"]},
                {label: "Subtitle", properties: ["owner", "username"]},
                {label: "Description", properties: ["description"]},
                {label: "Rating", properties: ["rating"]},
                {label: "Price", properties: ["price"]},
            ],
            prepareTileDataFunction: (tile_object) => (
                {
                    id: ["Id", tile_object["Id"]],
                    link: `/search/courses/${tile_object["Id"]}`,
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
        const educators_tile_list_data = {
            getList: this.props.outside_search ? null : this.props.getList,
            get_what: "Educators",
            list_title: "Search Educators",
            tile_list_prop_list: [
                {label: "Id", properties: ["id"]},
                {label: "Image", properties: ["image"]},
                {label: "First name", properties: ["first_name"]},
                {label: "Last name", properties: ["last_name"]},
                {label: "Email", properties: ["email"]},
            ],
            prepareTileDataFunction: (tile_object) => (
                {
                    id: ["Id", tile_object["Id"]],
                    link: `/search/educators/${tile_object["Id"]}`,
                    image: tile_object["Image"],
                    title: `${tile_object["First name"]} ${tile_object["Last name"]}`,
                    subtitle: `by ${tile_object["Email"]}`,
                    description: "",
                    bottom: [],
                }
            )
        };

        // Students Tile List
        const students_tile_list_data = {
            getList: this.props.outside_search ? null : this.props.getList,
            get_what: "Students",
            list_title: "Search Students",
            tile_list_prop_list: [
                {label: "Id", properties: ["id"]},
                {label: "Image", properties: ["image"]},
                {label: "First name", properties: ["first_name"]},
                {label: "Last name", properties: ["last_name"]},
                {label: "Email", properties: ["email"]},
            ],
            prepareTileDataFunction: (tile_object) => (
                {
                    id: ["Id", tile_object["Id"]],
                    link: `/search/students/${tile_object["Id"]}`,
                    image: tile_object["Image"],
                    title: `${tile_object["First name"]} ${tile_object["Last name"]}`,
                    subtitle: `by ${tile_object["Email"]}`,
                    description: "",
                    bottom: [],
                }
            )
        };


        // BubbleMenu data
        const button_list = [
            {
                name: "courses",
                type: button_types.VIEW_BUTTON,
                icon: "fas fa-book-reader",
                view: "courses",
            },
            {
                name: "educators",
                type: button_types.VIEW_BUTTON,
                icon: "fas fa-chalkboard-teacher",
                view: "educators",
            },
            {
                name: "students",
                type: button_types.VIEW_BUTTON,
                icon: "fas fa-user-graduate",
                view: "students",
            },
        ];


        return (
            <Fragment>
                <SearchBarComponent/>
                <div className="container wrapper mt-2">

                    {this.props.view === "courses" ?
                        <TileListComponent tile_list_data={courses_tile_list_data}/>
                        : null}

                </div>

                {this.props.view === "educators" ?
                    <ComingSoonComponent bubble_menu={false}/>
                    : null}

                {this.props.view === "students" ?
                    <ComingSoonComponent bubble_menu={false}/>
                    : null}

                <BubbleMenuComponent button_list={button_list}/>

            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    view: state.website.view,
    sub_view: state.website.sub_view,
    page: state.website.page,
    ids: state.website.ids,
    outside_search: state.search.outside_search
});

export default connect(mapStateToProps, {
    changePage,
    changeView,
    changeSubView,
    getIds,
    getList,
    resetListItems,
    resetOutsideSearch,
})(SearchDashboard);
