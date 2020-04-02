import React, {Component, Fragment} from 'react';

import MoreEducator from "./MoreEducator";
import MoreStudent from "./MoreStudent";
import MoreParents from "./MoreParents";
import MoreSchools from "./MoreSchools";


export class PieMenuMore extends Component {

    goToTop = () => {
        $('.go-to-top').click(function () {
            $('html, body').animate({
                scrollTop: ($('#page-top').offset().top - 140)
            }, 500, "easeInOutExpo");
            $('.go-to-top').hide(500);
            $('.index-info').fadeOut(1200);

            return false;
        });
    };

    render() {
        return (
            <Fragment>
                <div id="info"/>

                <MoreStudent/>
                <MoreEducator/>
                <MoreParents/>
                <MoreSchools/>

                <div className="go-to-top-container">
                    <div className="go-to-top" id="go-to-top" style={{display: "none"}} onClick={this.goToTop}>
                        <div className="go-to-top-text"><i className="icon-arrow-up"/></div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default PieMenuMore