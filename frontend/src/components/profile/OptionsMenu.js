import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";


export class OptionsMenu extends Component {
    state = {
        link: "",
    };

    render() {
        const openLink = e => {
            this.setState({
                link: e.target.parentElement.id,
            })
        };

        if (this.state.link) {
            return <Redirect push to={this.state.link}/>;
        }

        return (
            <header className="index" style={{backgroundImage: "url('https://ohthatschool-react.s3.amazonaws.com/img/bg-profile-img.jpg')"}}>
                <div className="overlay"/>
                <div className="index-header mt-3 mt-md-5">
                    <p className="my-5">
                        <span>Choose action</span>
                    </p>
                </div>
                <div className="container wrapper mt-2 mt-md-5">
                    <div className="row row-center">

                        <div className="col-6 col-lg-2 text-center mx-auto my-3">
                            <Link to="/profile/settings">
                                <div className="round-item">
                                    <div className="round-item-text">
                                        <i className="fas fa-user-cog"/>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-6 col-lg-2 text-center mx-auto my-3">
                            <Link to="/profile/educator">
                                <div className="round-item">
                                    <div className="round-item-text">
                                        <i className="fas fa-chalkboard-teacher"/>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-6 col-lg-2 text-center mx-auto my-3">
                            <Link to="/profile/student">
                                <div className="round-item">
                                    <div className="round-item-text">
                                        <i className="fas fa-user-graduate"/>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-6 col-lg-2 text-center mx-auto my-3">
                            <Link to="/profile/parent">
                                <div className="round-item">
                                    <div className="round-item-text">
                                        <i className="fas fa-female"/>
                                        <i className="fas fa-child" style={{fontSize: "50%"}}/>
                                        <i className="fas fa-male"/>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-6 col-lg-2 text-center mx-auto my-3">
                            <Link to="/profile/school">
                                <div className="round-item">
                                    <div className="round-item-text">
                                        <i className="fas fa-school"/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default OptionsMenu



