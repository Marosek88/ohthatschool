import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {register} from '../../actions/auth';
import {returnWarnings, returnSuccess} from '../../actions/messages';

export class Register extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: ''
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        returnSuccess: PropTypes.func.isRequired,
        returnWarnings: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    onSubmit = e => {
        e.preventDefault();
        const {first_name, last_name, email, password, password2} = this.state;
        if (first_name === "") {
            this.props.returnWarnings({
                noFirstName: 'First Name is required'
            });
        }
        else if (last_name === "") {
            this.props.returnWarnings({
                noLastName: 'Last Name is required'
            })
        }
        else if (email === "") {
            this.props.returnWarnings({
                noEmail: 'Email address is required'
            })
        }
        else if (password !== password2) {
            this.props.returnWarnings({
                passwordsNotMatch: 'Passwords do not match'
            });
        } else {
            const newUser = {
                first_name,
                last_name,
                password,
                email
            };
            this.props.register(newUser);
            this.props.returnSuccess(`Welcome, ${first_name}! you are now registered`, 201)
        }
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});


    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }

        const {first_name, last_name, email, password, password2} = this.state;

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                onChange={this.onChange}
                                value={first_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                onChange={this.onChange}
                                value={last_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password2"
                                onChange={this.onChange}
                                value={password2}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register, returnSuccess, returnWarnings})(Register);