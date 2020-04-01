import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {prepareDetails} from "../../support/helpers";
import TileComponent from "../common/TileComponent";
import LoadingComponent from "./LoadingComponent";


export class TileListComponent extends Component {

    state = {
        pageLoading: false,
        link: "",
    };

    static propTypes = {
        listItems: PropTypes.array.isRequired,
        listItemsLoading: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        this.props.tile_list_data.getList(this.props.tile_list_data.get_what)
    }

    render() {
        const content = () => {
            if (this.props.listItems.length) {

                const tile_list = [];
                this.props.listItems.map(list_item => {

                    const details_list = prepareDetails(list_item, this.props.tile_list_data.tile_list_prop_list);
                    const details_object = {};
                    details_list.map(item => {
                        details_object[item[0]] = item[1]
                    });
                    tile_list.push(this.props.tile_list_data.prepareTileDataFunction(details_object));
                });
                return tile_list.map(tile_data => <TileComponent key={tile_data.id} tile_data={tile_data}/>)
            }

            return <div className="col-12 card card-body">Nothing to show yet!</div>
        };

        return (
            <Fragment>
                <h3 className="mt-2">{this.props.tile_list_data.list_title}</h3>
                <div className="row py-4">

                    {this.props.listItemsLoading ? <LoadingComponent/> : content()}

                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    listItems: state.common.listItems,
    listItemsLoading: state.common.listItemsLoading,
});

export default connect(mapStateToProps)(TileListComponent);