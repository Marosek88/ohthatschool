import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


export class ConnectComponent extends Component {
    state = {
        link: "",
        confirm_button: false,
    };

    static propTypes = {
        detailsData: PropTypes.object.isRequired,
        detailsLoading: PropTypes.bool.isRequired,
    };

    componentDidMount() {
    }

    handleDeleteClick = () => {
        this.state.confirm_button = true;
        this.setState(this.state)
    };

    handleConfirmClick = () => {
        const {deleteItem, delete_what, delete_id, link} = this.props.delete_context;
        deleteItem(delete_what, delete_id);
        this.state.link = link;
        this.setState(this.state)
    };

    render() {
        if (this.state.link && !this.props.deleting) {
            return <Redirect to={this.state.link}/>
        }

        return (
            <Fragment>

                <div className="row py-4">

                    <div className="col-12 btn btn-danger" style={{cursor: "pointer"}} onClick={this.handleDeleteClick}>
                        <h2>Delete</h2>
                    </div>

                    {this.state.confirm_button
                        ?
                        <div className="col-12 btn btn-danger mt-4" style={{cursor: "pointer"}}
                             onClick={this.handleConfirmClick}>
                            <h2>Confirm!</h2>
                        </div>
                        :
                        null
                    }
                </div>

            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    deleting: state.common.deleting
});

export default connect(mapStateToProps)(ConnectComponent);
