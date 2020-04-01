import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {changePage} from "../../actions/website";

export class CreateRoleComponent extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        changePage: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.changePage("create_role");
    }

    componentWillUnmount() {
        this.props.changePage("");
    }

    submit = () => {
        let form = new FormData();
        this.props.form.map(field => {
            form.append(field[0], field[1])
        });
        this.props.createFunction(this.props.create_what, form);
    };

    render() {
        return (
            <Fragment>
                <div className="container wrapper mt-5" style={{textAlign: "center"}}>
                    <h1 className="mt-5">Create {this.props.create_what} Profile!</h1>
                    <p style={{fontSize: "5rem", cursor: "pointer"}}>
                        <i className={this.props.icon} onClick={this.submit}/>
                    </p>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {changePage})(CreateRoleComponent);
