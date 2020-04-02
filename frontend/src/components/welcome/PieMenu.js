import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {changePage} from "../../actions/website";


export class PieMenu extends Component {

    static propTypes = {
        page: PropTypes.string.isRequired,
        changePage: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.changePage("welcome")
    }

    componentWillUnmount() {
        this.props.changePage("")
    }

    scrollToInfo = () => {
        $('.js-scroll-trigger[data-href*="#"]:not([data-href="#"])').click(function () {
            let target = $($(this).attr('data-href'));
            // first hide the pages
            $('.index-info').fadeOut(500);
            // then show the target page
            target.fadeIn(500, function () {
                // move to the page
                $('html, body').animate({
                    scrollTop: ($('#info').offset().top)
                }, 500, "easeInOutExpo");
                $('.go-to-top').show(500);
            });
            return false;
        });
    };

    render() {
        return (
            <header className="index" style={{backgroundImage: "url('https://ohthatschool-react.s3.amazonaws.com/img/bg-index.jpg')"}}>
                <div className="overlay"/>
                <div className="index-header">
                    <p>
                        <span>School is cool! Check all the cool things we've prepared for...</span>
                    </p>
                </div>
                <div className="container wrapper">
                    <div className="row">
                        <div className="col-12">
                            <div className="container index-pie-container">
                                <div className="row index-pie-row">
                                    <div className="col-6 index-pie-col js-scroll-trigger"
                                         data-href="#info-student"
                                         onClick={this.scrollToInfo}
                                    >
                                        <div className="index-pie-col-background"
                                             style={{backgroundImage: "url('https://ohthatschool-react.s3.amazonaws.com/img/pie-student.jpg')"}}/>
                                        <div className="index-pie-text index-pie-student">Students</div>
                                    </div>

                                    <div className="col-6 index-pie-col js-scroll-trigger"
                                         data-href="#info-educator"
                                         onClick={this.scrollToInfo}
                                    >
                                        <div className="index-pie-col-background"
                                             style={{backgroundImage: "url('https://ohthatschool-react.s3.amazonaws.com/img/pie-educator.jpg')"}}/>
                                        <div className="index-pie-text index-pie-educator">Educators</div>
                                    </div>

                                    <div className="col-6 index-pie-col js-scroll-trigger"
                                         data-href="#info-parent"
                                         onClick={this.scrollToInfo}
                                    >
                                        <div className="index-pie-col-background"
                                             style={{backgroundImage: "url('https://ohthatschool-react.s3.amazonaws.com/img/pie-parent.jpg')"}}/>
                                        <div className="index-pie-text index-pie-parent">Parents</div>
                                    </div>

                                    <div className="col-6 index-pie-col js-scroll-trigger"
                                         data-href="#info-school"
                                         onClick={this.scrollToInfo}
                                    >
                                        <div className="index-pie-col-background"
                                             style={{backgroundImage: "url('https://ohthatschool-react.s3.amazonaws.com/img/pie-school.jpg')"}}/>
                                        <div className="index-pie-text index-pie-school">Schools</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    page: state.website.page,
});

export default connect(mapStateToProps, {changePage})(PieMenu);



