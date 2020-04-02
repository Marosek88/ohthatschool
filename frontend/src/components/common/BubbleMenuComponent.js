import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {changeView, changeSubView} from "../../actions/website";

export const button_types = {
    BACK_BUTTON: "back_button",
    VIEW_BUTTON: "view_button",
    VIEW_BUTTON_PARENT: "view_button_parent",
    SUB_VIEW_BUTTON: "sub_view_button"
};

export class BubbleMenuComponent extends Component {

    static propTypes = {
        page: PropTypes.string.isRequired,
        sub_view: PropTypes.string.isRequired,
        view: PropTypes.string.isRequired,
        changeView: PropTypes.func.isRequired,
        changeSubView: PropTypes.func.isRequired,
    };

    onButtonClick = (type, view, sub_view) => {
        if (type === button_types.VIEW_BUTTON) {
            this.props.changeView(view);
            this.props.changeSubView("");
        } else if (type === button_types.VIEW_BUTTON_PARENT) {
            this.props.changeView(view);
            this.props.changeSubView(sub_view);
        } else if (type === button_types.SUB_VIEW_BUTTON) {
            this.props.changeSubView(sub_view);
        }
    };

    render() {
        // Define 3 types of buttons ------------------------------------------------------------------------
        const big_button = (type, name, icon, sub_view) => (
            <div key={name}
                 className={this.props.view === name ? "bubble-menu-item bubble-menu-item-active" : "bubble-menu-item"}
                 id={name}
                 onClick={() => this.onButtonClick(type, name, sub_view)}>
                <div className="bubble-menu-text">
                    <i className={icon}/>
                </div>
            </div>
        );
        const big_back_button = (link) => (
            <Link key="back" to={link}>
                <div className="bubble-menu-item">
                    <div className="bubble-menu-text">
                        <i className="fas fa-arrow-left"/>
                    </div>
                </div>
            </Link>
        );
        const small_button = (type, name, icon) => (
            <div
                key={name}
                className={this.props.sub_view === name ? "bubble-menu-subitem bubble-menu-subitem-active" : "bubble-menu-subitem"}
                id={name}
                onClick={() => this.onButtonClick(type, null, name)}>
                <div className="bubble-menu-text">
                    <i className={icon}/>
                </div>
            </div>
        );

        // Create buttons render ------------------------------------------------------------------------
        const button_list = this.props.button_list;

        const buttons_render = button_list.map(button => {
            if (button.type === button_types.BACK_BUTTON) {
                return big_back_button(button.link)
            } else if (button.type === button_types.VIEW_BUTTON) {
                return big_button(button.type, button.view, button.icon)
            } else if (button.type === button_types.VIEW_BUTTON_PARENT) {
                const parent_button = big_button(button.type, button.view, button.icon, button.sub_view);
                const children_buttons = button.children.map(child_button => (
                    small_button(child_button.type, child_button.sub_view, child_button.icon)
                ));
                return (
                    <Fragment key={button.name}>
                        {parent_button}
                        {this.props.view === button.view ? children_buttons : null}
                    </Fragment>
                )
            }
        });

        // Render ------------------------------------------------------------------------
        return (
            <TransitionGroup component={null}>
                <CSSTransition classNames="dialog" timeout={300}>
                    <div className={this.props.page === "search" ? "bubble-menu-container mt-5" : "bubble-menu-container"} id="bubble-menu-container">
                        {buttons_render}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

const mapStateToProps = state => ({
    view: state.website.view,
    sub_view: state.website.sub_view,
    page: state.website.page,
    ids: state.website.ids,
});

export default connect(mapStateToProps, {changeView, changeSubView})(BubbleMenuComponent);
