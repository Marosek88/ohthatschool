import React, {Component, Fragment} from 'react';
import {Redirect} from "react-router-dom";


export class TileComponent extends Component {
    state = {
        link: ""
    };

    render() {
        const openLink = (link) => {
            this.setState({link: link})
        };
        if (this.state.link) {
            return <Redirect push to={this.state.link}/>;
        }

        const tile_data = this.props.tile_data;

        const bottom_count = tile_data.bottom.length;

        let bottom_width = "";
        switch (bottom_count) {
            case 1: bottom_width = "12"; break;
            case 2: bottom_width = "6"; break;
            default: bottom_width = "4";
        }

        const image_render = tile_data.image ?
            <div className="tile-img" style={{backgroundImage: `url(${tile_data.image})`}}/> :
            <div className="tile-img" style={{backgroundImage: "url('https://ohthatschool-react.s3.amazonaws.com/img/zygzak.jpg')"}}/>;

        return (
            <Fragment>
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={tile_data.id} onClick={() => openLink(tile_data.link)}>
                    <div className="tile">
                        {image_render}
                        <h5 className="tile-name">{tile_data.title}</h5>
                        <p className="tile-additional">{tile_data.subtitle}</p>
                        <p className="tile-description">{tile_data.description}</p>
                        <div className="container tile-footer">
                            <div className="row no-gutters tile-footer-labels">
                                {tile_data.bottom.map(item => <div key={item[0]} className={`col-${bottom_width}`}>{item[0]}:</div>)}
                            </div>
                            <div className="row no-gutters">
                                {tile_data.bottom.map(item => <div key={item[0]} className={`col-${bottom_width}`}>{item[1]}</div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default TileComponent;