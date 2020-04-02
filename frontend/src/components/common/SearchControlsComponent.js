import React, {Component, Fragment} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {getCategories, search} from "../../actions/search";

export class SearchControlsComponent extends Component {
    state = {
        link: "",
        form_data: {
            categories: {},
            sort_by: "",
            query: "",
        }
    };

    static propTypes = {
        categories: PropTypes.array.isRequired,
        getCategories: PropTypes.func.isRequired,
        search: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getCategories();
        const categories = this.state.form_data.categories;
        this.props.categories.map(category => categories[category.id] = false);
        this.setState(this.state);
    }

    handleCategoryClick = (category) => {
        this.state.form_data.categories[category] = !this.state.form_data.categories[category];
        this.setState(this.state)
    };

    handleSortClick = (sort_by) => {
        this.state.form_data.sort_by = sort_by;
        this.setState(this.state)
    };

    handleSearchChange = e => {
        this.state.form_data.query = e.target.value;
        this.setState(this.state)
    };

    onSubmit = e => {
        e.preventDefault();
        const {categories, sort_by, query} = this.state.form_data;
        let form = new FormData();
        let cat_list = [];
        Object.keys(categories).map(category => {
            if (categories[category]) {
                cat_list.push(category)
            }
        });
        form.append("categories", JSON.stringify(cat_list));
        form.append("sort_by", sort_by);
        form.append("query", query);
        this.props.search(this.props.page, this.props.view, form);

        if (this.props.page !== "search") {
            this.state.link = "/search";
            this.setState(this.state)
        }
    };

    render() {
        if (this.state.link !== "") {
            return <Redirect to={this.state.link}/>
        }
        // Prepare Categories list
        const cats = this.props.categories;
        let category_list = [];
        for (let i = 0; i < cats.length; i++) {

            category_list.push(
                <div className="dropdown-item"
                     key={cats[i].id}
                     style={{display: "flex"}}
                     onClick={() => this.handleCategoryClick(cats[i].id)}>
                    <span className="mr-3">{cats[i].name}</span>
                    <input type="checkbox"
                           className="ml-auto"
                           name={cats[i].name}
                           value={cats[i].id}
                           checked={this.state.form_data.categories[cats[i].id]}/>
                </div>);
            if (i < cats.length - 1) {
                category_list.push(<div className="dropdown-divider" key={i}/>)
            }
        }

        const sort_list =
            <Fragment>
                <div className="dropdown-item"
                     style={{display: "flex"}}
                     onClick={() => this.handleSortClick("title")}>
                    <span className="mr-3">Title</span>
                    <input type="checkbox"
                           className="ml-auto"
                           name="sort_by"
                           value="title"
                           checked={this.state.form_data.sort_by === "title"}/>
                </div>
                <div className="dropdown-divider"/>
                <div className="dropdown-item"
                     style={{display: "flex"}}
                     onClick={() => this.handleSortClick("category")}>
                    <span className="mr-3">Category</span>
                    <input type="checkbox"
                           className="ml-auto"
                           name="sort_by"
                           value="category"
                           checked={this.state.form_data.sort_by === "category"}/>
                </div>

            </Fragment>;

        return (
                <div className="collapse navbar-collapse ml-0 ml-lg-5" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mt-2">

                        {this.props.page === "search" ?
                            <Fragment>
                                <li>
                                    <div className="btn-group my-2 my-lg-0 mr-sm-2 ml-lg-5">
                                        <button type="button" className="btn btn-outline-primary dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-th"/> Categories
                                        </button>
                                        <div className="dropdown-menu">
                                            {category_list.map(category => category)}
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="btn-group my-2 my-lg-0 mr-sm-2">
                                        <button type="button" className="btn btn-outline-primary dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-sort-amount-down-alt"/> Sort by
                                        </button>
                                        <div className="dropdown-menu">
                                            {sort_list}
                                        </div>
                                    </div>
                                </li>

                            </Fragment>

                            : null}

                        <li>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2"
                                       type="search"
                                       placeholder="Search"
                                       value={this.state.form_data.query}
                                       onChange={this.handleSearchChange}/>
                                <button className="navbar-close btn btn-outline-primary my-2 my-sm-0"
                                        type="submit"
                                        onClick={this.onSubmit}>Search
                                </button>
                            </form>
                        </li>

                    </ul>
                </div>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.search.categories,
    page: state.website.page,
    view: state.website.view,
});

export default connect(
    mapStateToProps,
    {getCategories, search}
)(SearchControlsComponent);