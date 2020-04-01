import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {getCategories, search} from "../../actions/search";

import SearchControlsComponent from "./SearchControlsComponent";

export class SearchBarComponent extends Component {

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <SearchControlsComponent />

            </nav>

        );
    }
}

export default SearchBarComponent;