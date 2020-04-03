import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


export class ConnectComponent extends Component {
    state = {
        link: "",
    };

    static propTypes = {
        detailsData: PropTypes.object.isRequired,
        detailsLoading: PropTypes.bool.isRequired,
    };

    componentDidMount() {
    }

    handleConnect = () => {
        const {connectAction, what, with_what, with_id, alternatives} = this.props.connect_context;
        let alternative_used = false;
        alternatives.map(alt => {
            if (!alternative_used && alt.test) {
                this.setState({link: alt.link});
                alternative_used = true;
            }
        });

        if (!alternative_used) {
            const form = new FormData();
            form.append('id', with_id);
            connectAction(what, with_what, form);
        }
    };

    render() {
        if (this.state.link) {
            return <Redirect to={this.state.link}/>
        }

        let text = "Connect!";
        let alternative_used = false;
        this.props.connect_context.alternatives.map(alt => {
            if (!alternative_used && alt.test) {
                text = alt.button_text;
                    alternative_used = true;
            }
        });

        return (
            <Fragment>

                <div className="row py-4">

                    <div className="col-12 btn btn-primary" style={{cursor: "pointer"}} onClick={this.handleConnect}>
                        <h2>{text}</h2>
                    </div>
                </div>

            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(ConnectComponent);
