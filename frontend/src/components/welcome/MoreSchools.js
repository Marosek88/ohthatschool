import React, {Component, Fragment} from 'react';


export class MoreSchools extends Component {

    render() {
        return (
            <Fragment>
                <div id="info-school" className="index-info" style={{display: 'none'}}>

                    {/*Icons Grid*/}
                    <section className="features-icons bg-light text-center">
                        <div className="container wrapper">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <div className="features-icons-icon d-flex">
                                            <i className="icon-graduation m-auto text-primary"/>
                                        </div>
                                        <h3>Variety</h3>
                                        <p className="lead mb-0">Search among hundreds of courses, educators and schools
                                            local and remote to find your perfect fit</p>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <div className="features-icons-icon d-flex">
                                            <i className="icon-chart m-auto text-primary"/>
                                        </div>
                                        <h3>Flexibility</h3>
                                        <p className="lead mb-0">Mix and match personal and remote learning to best suit
                                            your needs</p>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                        <div className="features-icons-icon d-flex">
                                            <i className="icon-compass m-auto text-primary"/>
                                        </div>
                                        <h3>Availability</h3>
                                        <p className="lead mb-0">Access your books and assignments anywhere you the
                                            Internet dares to reach</p>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                        <div className="features-icons-icon d-flex">
                                            <i className="icon-rocket m-auto text-primary"/>
                                        </div>
                                        <h3>Fun</h3>
                                        <p className="lead mb-0">Study with use of interactive games, challenging quizes
                                            and entertaining videos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/*Student Info*/}
                    <section className="showcase">
                        <div className="container-fluid wrapper-bg py-4">
                            <div className="row no-gutters">
                                <div className="col-lg-6 order-lg-2 text-white showcase-img"
                                     style={{background: "url('https://ohthatschool-react.s3.amazonaws.com/img/bg-cloud.jpg') no-repeat center center"}}/>
                                <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                                    <h2>Connect and keep in touch</h2>
                                    <p className="lead mb-0">Find new inspiring educators and keep in touch with them
                                        using our messaging platform. Get your assignments and updates as soon as they
                                        get posted!</p>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-lg-6 text-white showcase-img"
                                     style={{background: "url('https://ohthatschool-react.s3.amazonaws.com/img/bg-studying.jpg') no-repeat center center"}}/>
                                <div className="col-lg-6 my-auto showcase-text">
                                    <h2>Do your cramming at your own pace</h2>
                                    <p className="lead mb-0">The world wasn't built in one day. Do your studying at
                                        home, in a library or in a park using materials posted by your teacher. Take.
                                        Your. Time.</p>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-lg-6 order-lg-2 text-white showcase-img"
                                     style={{background: "url('https://ohthatschool-react.s3.amazonaws.com/img/bg-tutoring.jpg') no-repeat center center"}}/>
                                <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                                    <h2>Meet your local educator</h2>
                                    <p className="lead mb-0">If you choose to work with a local tutor, you can arrange
                                        meetings to personally go through some tougher parts </p>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-lg-6 text-white showcase-img"
                                     style={{background: "url('https://ohthatschool-react.s3.amazonaws.com/img/bg-portfolio.jpg') no-repeat center center"}}/>
                                <div className="col-lg-6 my-auto showcase-text">
                                    <h2>Build your portfolio</h2>
                                    <p className="lead mb-0">Keep all of your homework and assignments in one place -
                                        they can serve as a valuable portfolio in the future</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Fragment>
        );
    }
}

export default MoreSchools