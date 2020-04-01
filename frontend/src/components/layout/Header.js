import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {logout} from "../../actions/auth";
import {getCategories, search} from "../../actions/search";

import SearchControlsComponent from "../common/SearchControlsComponent";


export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        page: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired
    };

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <Fragment>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.props.logout} style={{cursor: "pointer"}}>Logout</a>
                </li>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </Fragment>
        );

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-close navbar-brand" href="#">Oh that'school</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

                    {this.props.page === "search" ?
                        null
                        :
                        <SearchControlsComponent />
                    }

                    <ul className="navbar-close navbar-nav mt-2 mt-lg-0 ml-auto">
                        <Link to="/search" className="nav-link">Search</Link>
                        {isAuthenticated ? authLinks : guestLinks}
                    </ul>
                </div>
            </nav>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    page: state.website.page
});

export default connect(
    mapStateToProps,
    {logout, getCategories, search}
)(Header);