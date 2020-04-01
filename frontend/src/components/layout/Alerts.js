import React, {Component, Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        warning: PropTypes.object.isRequired,
        info: PropTypes.object.isRequired,
        success: PropTypes.object.isRequired,
    };

    componentDidUpdate(prevProps) {
        const {error, warning, info, success, alert} = this.props;
        if (error !== prevProps.error) {
            if (error.msg.title) {
                alert.error(`Title: ${error.msg.title.join()}`)
            }
            if (error.msg.categories) {
                alert.error("Categories: At least one category needs to be set")
            }
            if (error.msg.non_field_errors) {
                alert.error(`Login: ${error.msg.non_field_errors}`)
            }
            if (error.msg.username) {
                alert.error(`Username: ${error.msg.username}`)
            }
            if (error.msg.username) {
                alert.error(`Password: ${error.msg.password}`)
            }
        }

        if (warning !== prevProps.warning) {
            alert.error(warning.msg)
        }

        if (info !== prevProps.info) {
            alert.info(info.msg)
        }

        if (success !== prevProps.success) {
            alert.success(success.msg)
        }
    }


    render() {
        return <Fragment/>;
    }
}

const mapStateToProps = state => ({
    error: state.messages.error,
    warning: state.messages.warning,
    info: state.messages.info,
    success: state.messages.success
});

export default connect(mapStateToProps)(withAlert()(Alerts));