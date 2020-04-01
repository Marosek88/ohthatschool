import React, { Component, Fragment } from 'react';

export class ProfilePictureComponent extends Component {

    render() {
        let picture = 'https://ohthatschool-react.s3.amazonaws.com/img/zygzak.jpg';
        if (this.props.user) {
            picture = this.props.user.image ? this.props.user.image : picture
        } else if (this.props.image) {
            picture = this.props.image
        }

        return (
            <Fragment>
                <div className="user-photo" style={{background: `url(${picture}) no-repeat center center`}}/>
            </Fragment>
        )
    }
}

export default ProfilePictureComponent;