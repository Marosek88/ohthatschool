import React, {Component} from 'react';
import BubbleMenuComponent, {button_types} from "./BubbleMenuComponent";


export class ComingSoonComponent extends Component {

    render() {
        // BubbleMenu data
            const button_list = [
                {
                    name: "go_back",
                    type: button_types.BACK_BUTTON,
                    link: this.props.link ? this.props.link : "/profile",
                }
            ];

        return (
                <header className="index" style={{backgroundImage: "url('https://ohthatschool-react.s3.amazonaws.com/img/bg-coming-soon.jpg')"}}>
                    <div className="overlay"/>

                    <div className="index-header mt-3 mt-md-5">
                        <p className="my-5">
                            <span>Coming Soon!</span>
                        </p>
                    </div>

                    <div className="container wrapper mt-2 mt-md-5">
                        <div className="row row-center mt-2 mt-md-5">
                            <div className="vns-loading-td col-12">
                                <div className="vns-shaking-icon">
                                    <i className="fas fa-pencil-ruler"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.props.bubble_menu ? <BubbleMenuComponent button_list={button_list}/> : null}

                </header>
        );
    }
}

export default ComingSoonComponent



