import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {changePage, changeView} from "../../actions/website";

import PieMenu from "./PieMenu";
import PieMenuMore from "./PieMenuMore";


export class WelcomeDashboard extends Component {

    static propTypes = {
        page: PropTypes.string.isRequired,
        view: PropTypes.string.isRequired,
        changePage: PropTypes.func.isRequired,
        changeView: PropTypes.func.isRequired,
    };

    checkProps(parent, children) {
        let element = parent;
        children.map(child => {
            if (typeof element === 'undefined') {
                return null
            } else {
                element = element[`${child}`]
            }
        });
        return element;
    }

    componentDidMount() {
        this.props.changePage("welcome_page");
        this.props.changeView("menu");
    }

    render() {
        return (
            <Fragment>
                <PieMenu />
                <PieMenuMore />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    page: state.website.page,
    view: state.website.view,
});

export default connect(mapStateToProps, {changePage, changeView})(WelcomeDashboard);