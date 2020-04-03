import React, {Component} from 'react';


export class Footer extends Component {

    render() {

        return (
            <footer className="footer mt-auto">
                <div className="container wrapper">
                    <div className="row">
                        <div className="col-lg-6 h-100 text-center text-lg-left my-auto">
                            {/*<ul className="list-inline mb-2">*/}
                            {/*    <li className="list-inline-item">*/}
                            {/*        <a href="#">About</a>*/}
                            {/*    </li>*/}
                            {/*    <li className="list-inline-item">&sdot;</li>*/}
                            {/*    <li className="list-inline-item">*/}
                            {/*        <a href="#">Contact</a>*/}
                            {/*    </li>*/}
                            {/*    <li className="list-inline-item">&sdot;</li>*/}
                            {/*    <li className="list-inline-item">*/}
                            {/*        <a href="#">Terms of Use</a>*/}
                            {/*    </li>*/}
                            {/*    <li className="list-inline-item">&sdot;</li>*/}
                            {/*    <li className="list-inline-item">*/}
                            {/*        <a href="#">Privacy Policy</a>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                            <p className="text-muted small mb-4 mb-lg-0">&copy; <a href="http://www.varsandsava.com"
                                                                                   target="_blank">Vars&Sava
                                Devs</a> 2020. All
                                Rights Reserved.</p>
                        </div>
                        <div className="col-lg-6 h-100 text-center text-lg-right my-auto">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item mr-3">
                                    <a href="#">
                                        <i className="fab fa-facebook fa-2x fa-fw" />
                                    </a>
                                </li>
                                <li className="list-inline-item mr-3">
                                    <a href="#">
                                        <i className="fab fa-twitter-square fa-2x fa-fw" />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#">
                                        <i className="fab fa-instagram fa-2x fa-fw" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer








