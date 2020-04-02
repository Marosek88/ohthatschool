import React, {Component} from 'react';

import SearchControlsComponent from "./SearchControlsComponent";

export class SearchBarComponent extends Component {

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                Search Options
                <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <SearchControlsComponent />

            </nav>

        );
    }
}

export default SearchBarComponent;