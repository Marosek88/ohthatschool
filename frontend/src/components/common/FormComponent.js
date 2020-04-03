import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select'


export class FormComponent extends Component {
    constructor(props) {
        super(props);
        let form_data = {};
        props.form_context.field_list.map(field => {
            form_data[field.name] = field.start_value
        });
        this.state = {
            form_data: form_data,
            field_list: [],
        };

        this.handleMultiChange = this.handleMultiChange.bind(this);
    }

    static propTypes = {
        formContext: PropTypes.array.isRequired,
        formLoading: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        if (this.props.form_context.getFormContext) {
            this.props.form_context.getFormContext(this.props.form_context.what)
        }

        this.props.form_context.field_list.map(field => {
            if (field.field_type === "multiselect") {
                let selects = {};
                field.start_value.map(option => {
                    selects[option] = true
                });
                this.state.form_data[field.name] = selects;
                this.setState(this.state);
            }
        });

    }

    onChange = e => this.setState({
        form_data:
            {
                ...this.state.form_data,
                [e.target.name]: e.target.value
            }
    });

    handleMultiChange(option) {
        this.setState(state => {
            return {
                form_data: {
                    ...state.form_data,
                    [option.field_name]: option
                }
            };
        });
    }
    ;

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleCheckboxChange = e => {
        this.state.form_data[e.target.name] = !this.state.form_data[e.target.name];
        this.setState(this.state);
    };

    handleMultiselectClick = (e) => {
        this.state.form_data[e.target.name][e.target.value] = !this.state.form_data[e.target.name][e.target.value];
        this.setState(this.state)
    };

    prepareForm = (form, form_data, field_list) => {
        Object.keys(form_data).map(key => {
            let is_select = false;
            let is_image = false;
            let is_multiselect = false;
            this.state.field_list.map(field => {
                if (field.name === key && field.field_type === "select") {
                    is_select = true;
                } else if (field.name === key && field.field_type === "image") {
                    is_image = true;
                } else if (field.name === key && field.field_type === "multiselect") {
                    is_multiselect = true;
                }
            });

            if (is_select) {
                form.append(key, form_data[key]["value"])
            } else if (is_image) {
                if (this.state[key]) {
                    form.append(key, this.state[key], this.state[key]["name"]);
                }
            } else if (is_multiselect) {
                let selects = [];
                Object.keys(form_data[key]).map(select => {
                    if (form_data[key][select]) {
                        selects.push(select)
                    }
                });
                form.append(key, JSON.stringify(selects))
            } else {
                form.append(key, form_data[key])
            }
        })
    };

    onSubmit = e => {
        e.preventDefault();
        let form = new FormData();
        this.prepareForm(form, this.state.form_data);
        const what_id = this.props.form_context.what_id ? this.props.form_context.what_id : null;
        if (what_id) {
            this.props.form_context.submitFunction(this.props.form_context.what, what_id, form);
        } else {
            this.props.form_context.submitFunction(this.props.form_context.what, form);
        }
    };

    render() {


        this.state.field_list = this.props.form_context.field_list;
        if (this.props.form_context.addContextToForm) {
            this.props.form_context.addContextToForm(this.props.formContext, this.state.field_list);
        }

        const render_field = (field) => {
            if (field.field_type === "text") {
                return (
                    <div className="form-group" key={field.name}>
                        <label>{field.label}</label>
                        <input
                            className="form-control"
                            type="text"
                            name={field.name}
                            onChange={this.onChange}
                            value={this.state.form_data[field.name]}
                        />
                    </div>
                )
            } else if (field.field_type === "textarea") {
                return (
                    <div className="form-group" key={field.name}>
                        <label>{field.label}</label>
                        <textarea
                            className="form-control"
                            name={field.name}
                            onChange={this.onChange}
                            value={this.state.form_data[field.name]}/>
                    </div>
                )
            } else if (field.field_type === "number") {
                return (
                    <div className="form-group" key={field.name}>
                        <label>{field.label}</label>
                        <input
                            className="form-control"
                            type="number"
                            name={field.name}
                            onChange={this.onChange}
                            value={this.state.form_data[field.name]}
                        />
                    </div>
                )
            } else if (field.field_type === "select") {
                return (
                    <div className="form-group" key={field.name}>
                        <label>{field.label}</label>
                        <Select
                            name={field.name}
                            placeholder={field.label}
                            value={this.state.form_data[field.name]}
                            options={field.options}
                            onChange={this.handleMultiChange}
                            multi
                        />
                    </div>
                )
            } else if (field.field_type === "image") {
                return (
                    <div className="form-group" key={field.name}>
                        <label>{field.label}</label>
                        <input
                            className="form-control"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={this.handleImageChange}
                            name={field.name}
                            value={this.state.form_data[field.name]}
                        />
                    </div>
                )
            } else if (field.field_type === "checkbox") {
                return (
                    <div className="form-group" key={field.name}>
                        <label>{field.label}</label>
                        <input
                            className="form-control"
                            type="checkbox"
                            onChange={this.handleCheckboxChange}
                            name={field.name}
                            checked={this.state.form_data[field.name]}
                        />
                    </div>
                )
            }else if (field.field_type === "multiselect") {
                return (
                    <div className="form-group" key={field.name}>

                        <button type="button" className="btn btn-outline-primary dropdown-toggle my-2"
                                data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-th"/> {field.label}
                        </button>

                        <div className="dropdown-menu">
                            {this.props.formContext.map(option => (
                                <div className="dropdown-item"
                                     style={{display: "flex"}}>
                                    <span className="mr-3">{option.name}</span>
                                    <input type="checkbox"
                                           className="ml-auto"
                                           value={option.id}
                                           name={field.name}
                                           checked={this.state.form_data[field.name][option.id]}
                                           onClick={this.handleMultiselectClick}/>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        };

        const render_form = (
            <form onSubmit={this.onSubmit} encType="multipart/form-data">
                {this.state.field_list.map(field => (
                    render_field(field)
                ))}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        );

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>{this.props.form_context.what}</h2>
                {render_form}
            </div>
        );
    }
}

const
    mapStateToProps = state => ({
        formContext: state.common.formContext,
        formLoading: state.common.formLoading,
    });

export default connect(mapStateToProps)

(
    FormComponent
)
;