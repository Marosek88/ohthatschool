import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {prepareDetails} from "../../support/helpers";
import ProfilePictureComponent from "./ProfilePictureComponent";
import LoadingComponent from "./LoadingComponent";

export class ProfilePageComponent extends Component {
    static propTypes = {
        profileLoading: PropTypes.bool.isRequired,
        profileData: PropTypes.object.isRequired,
    };

    componentDidMount() {

    }

    render() {

        // Get context from props
        let image = "";
        let details_list = {};
        let details_render;
        let short_bio = [];

        if (this.props.profile_page_data.my_profile) {
            // If My Profile
            image = this.props.user.user_profile.image;
            if (this.props.profile_page_data.get_what === "Educator's Profile") {
                details_list = prepareDetails(this.props.user.educator, this.props.profile_page_data.details_prop_list);
                short_bio = prepareDetails(this.props.user.educator, this.props.profile_page_data.short_bio_prop_list)[0];
            } else if (this.props.profile_page_data.get_what === "Student's Profile") {
                details_list = prepareDetails(this.props.user.student, this.props.profile_page_data.details_prop_list);
                short_bio = prepareDetails(this.props.user.student, this.props.profile_page_data.short_bio_prop_list)[0];
            } else if (this.props.profile_page_data.get_what === "Parent's Profile") {
                details_list = prepareDetails(this.props.user.parent, this.props.profile_page_data.details_prop_list);
                short_bio = prepareDetails(this.props.user.parent, this.props.profile_page_data.short_bio_prop_list)[0];
            }
        } else {
            // If not My Profile
            details_list = prepareDetails(this.props.profileData, this.props.profile_page_data.details_prop_list)
            short_bio = prepareDetails(this.props.profileData, this.props.profile_page_data.short_bio_prop_list)[0];
        }

            // Get context ready
            const ready_details_list = this.props.profile_page_data.prepareDetailDataFunction(details_list);

            details_render = ready_details_list.map(detail => (
                <Fragment key={detail[0]}>
                    <strong>{detail[0]}:</strong> {detail[1]}<br/>
                </Fragment>
            ));


        return (
            this.props.profileLoading ?
                <LoadingComponent/>

                :

                <Fragment>
                    <h3>{this.props.profile_page_data.get_what}</h3>
                    <div className="row py-4">
                        <div className="col-12 card card-body">
                            <div className="row">
                                <div className="col-12 col-sm-4 mb-3">
                                    <ProfilePictureComponent image={image}/>
                                </div>
                                <div className="col-12 col-sm-8">
                                    <div className="profile-details">
                                        {details_render}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row py-4">
                        <div className="col-12 card card-body">
                            <strong>{short_bio[0]}:</strong> {short_bio[1]}
                        </div>
                    </div>

                </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    profileLoading: state.common.profileLoading,
    profileData: state.common.profileData,
    user: state.auth.user,
});

export default connect(mapStateToProps)(ProfilePageComponent);
