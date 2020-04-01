import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {prepareDetails} from "../../support/helpers";
import ProfilePictureComponent from "./ProfilePictureComponent";
import LoadingComponent from "./LoadingComponent";


export class DetailsComponent extends Component {

    static propTypes = {
        detailsData: PropTypes.object.isRequired,
        detailsLoading: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        this.props.details_context.getDetails(this.props.details_context.get_what, this.props.details_context.get_id);
    }

    render() {

        const details_list = prepareDetails(this.props.detailsData, this.props.details_context.details_prop_list);
        const details_render = details_list.map(detail => (
            <Fragment key={detail[0]}>
                <strong>{detail[0]}:</strong> {detail[1]}<br/>
            </Fragment>
        ));

        return (
            <Fragment>

                <div className="row py-4">
                    <div className="col-12 card card-body">
                        {this.props.detailsLoading ?
                            <LoadingComponent small={true}/>
                            :
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <h2>{this.props.details_context.get_what} Details</h2>
                                </div>
                                <div className="col-12 col-sm-4 mb-3">
                                    <ProfilePictureComponent image={this.props.detailsData.image}/>
                                </div>
                                <div className="col-12 col-sm-8">
                                    <div className="profile-details">
                                        {details_render}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    detailsData: state.common.detailsData,
    detailsLoading: state.common.detailsLoading,
});

export default connect(mapStateToProps)(DetailsComponent);