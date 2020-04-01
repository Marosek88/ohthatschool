import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {Provider} from 'react-redux';

import {Provider as AlertProvider, transitions} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// Alert Options
const alertOptions = {
    timeout: 6000,
    position: 'middle',
    offset: '30px',
    transition: transitions.SCALE,
    containerStyle: {
        width: 400,
    },
};

import Register from "./accounts/Register";
import Login from "./accounts/Login";
import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Footer from "./layout/Footer";
import PrivateRoute from "./common/PrivateRoute";
import WelcomeDashboard from "./welcome/WelcomeDashboard";
import SearchDashboard from "./search/SearchDashboard";
import ProfileDashboard from "./profile/ProfileDashboard";
import SettingsDashboard from "./profile/settings/SettingsDashboard";
import EducatorDashboard from "./educator/EducatorDashboard";
import CourseDashboard from "./educator/course/CourseDashboard";
import ModuleDashboard from "./educator/course/module/ModuleDashboard";
import LessonDashboard from "./educator/course/module/lesson/LessonDashboard";
import StudentDashboard from "./student/StudentDashboard";
import ComingSoonComponent from "./common/ComingSoonComponent";


import store from "../store";
import {loadUser} from "../actions/auth";

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        const uuid_regex = '([0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12})';

        // Search
        const search_course_url = `/search/courses/:course${uuid_regex}`;
        const search_educator_url = `/search/educators/:educator${uuid_regex}`;
        const search_student_url = `/search/students/:student${uuid_regex}`;

        // Educator urls
        const educator_course_url = `/profile/educator/my_courses/:course${uuid_regex}`;
        const educator_module_url = `/profile/educator/my_courses/:course${uuid_regex}/module/${uuid_regex}`;
        const educator_lesson_url = `/profile/educator/my_courses/:course${uuid_regex}/module/${uuid_regex}/lesson/${uuid_regex}`;

        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header/>
                            <div className="content">
                                <Alerts/>
                                <Switch>
                                    <Route exact path="/" component={WelcomeDashboard}/>
                                    <Route exact path="/register" component={Register}/>
                                    <Route exact path="/login" component={Login}/>
                                    <Route exact path="/search" component={SearchDashboard}/>
                                    <Route exact path={search_course_url} component={SearchDashboard}/>
                                    <Route exact path={search_educator_url} component={SearchDashboard}/>
                                    <Route exact path={search_student_url} component={SearchDashboard}/>
                                    <PrivateRoute exact path="/profile" component={ProfileDashboard}/>
                                    <PrivateRoute exact path="/profile/settings" component={SettingsDashboard}/>
                                    <PrivateRoute exact path="/profile/educator" component={EducatorDashboard}/>
                                    <PrivateRoute exact path="/profile/student" component={StudentDashboard}/>
                                    <PrivateRoute exact path="/profile/parent" component={ComingSoonComponent}/>
                                    <PrivateRoute exact path="/profile/school" component={ComingSoonComponent}/>
                                    <PrivateRoute
                                        exact path={educator_course_url}
                                        component={CourseDashboard}
                                    />
                                    <PrivateRoute
                                        exact path={educator_module_url}
                                        component={ModuleDashboard}
                                    />
                                    <PrivateRoute
                                        exact path={educator_lesson_url}
                                        component={LessonDashboard}
                                    />
                                </Switch>
                            </div>
                            <Footer/>
                        </Fragment>
                    </Router>

                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
