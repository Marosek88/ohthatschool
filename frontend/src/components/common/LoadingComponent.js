import React, {Component} from 'react';


export class LoadingComponent extends Component {

    render() {
        return (
            this.props.small ?

                <div className="container wrapper my-1">
                    <div className="row row-center">
                        <div className="vns-loading-td col-12">
                            <div className="vns-loading-icon">
                                <i className="fas fa-sync-alt"/>
                            </div>
                        </div>
                    </div>
                </div>

                :

                <header className="index">

                    <div className="index-header mt-3 mt-md-5">
                        <p className="my-5">
                            <span>Loading...</span>
                        </p>
                    </div>

                    <div className="container wrapper mt-2 mt-md-5">
                        <div className="row row-center mt-2 mt-md-5">
                            <div className="vns-loading-td col-12">
                                <div className="vns-loading-icon">
                                    <i className="fas fa-sync-alt"/>
                                </div>
                            </div>
                        </div>
                    </div>

                </header>
        );
    }
}

export default LoadingComponent



