import React, {Component, Fragment} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {prepareDetails} from "../../support/helpers";
import ProfilePictureComponent from "./ProfilePictureComponent";
import LoadingComponent from "./LoadingComponent";


export class ListComponent extends Component {
    state = {
        link: ""
    };

    static propTypes = {
        listItems: PropTypes.array.isRequired,
        listItemsLoading: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        this.props.list_context.getList(this.props.list_context.get_what, this.props.list_context.get_id)
    }

    render() {
        const openLink = (link) => {
            this.setState({link: link})
        };
        if (this.state.link) {
            return <Redirect push to={this.state.link}/>;
        }

        const list_render = () => {
            if (this.props.listItems.length) {
                return this.props.listItems.map(list_item => {
                    const details_list = prepareDetails(list_item, this.props.list_context.list_prop_list);
                    const details_render = details_list.map(detail =>
                        <Fragment key={detail[0]}><strong>{detail[0]}:</strong> {detail[1]}<br/></Fragment>);
                    return (

                        <Fragment key={details_list[0]}>
                            <div className="row"
                                 onClick={() => openLink(`${this.props.list_context.link_to}${list_item.id}`)}
                                 style={{cursor: "pointer"}}>
                                <div className="col-12 card card-body m-1">
                                    <div className="row">
                                        <div className="col-4 mb-1">
                                            <ProfilePictureComponent image={list_item.image}/>
                                        </div>
                                        <div className="col-6">
                                            <div className="profile-details">
                                                {details_render}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>

                    )
                });
            } else {
                return <div className="row"><div className="col-12 card card-body">Nothing to show yet!</div></div>
            }
        }

        return (
            <Fragment>
                <div className="row py-4">
                    <div className="col-12 card card-body">
                        {this.props.listItemsLoading ?
                            <LoadingComponent/>
                            :
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <h2>{this.props.list_context.get_what}</h2>
                                </div>
                            </div>
                        }
                        {list_render()}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    listItems: state.common.listItems,
    listItemsLoading: state.common.listItemsLoading,
});

export default connect(mapStateToProps)(ListComponent);