import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, { fetchStudents, fetchCampuses } from '../store';
import Navbar from './Navbar';
import CampusList from './CampusList';
import StudentList from './StudentList';
import AddCampus from './AddCampus';
import AddNewStudent from './AddNewStudent';
import SingleStudent from './SingleStudent';
import SingleCampus from './SingleCampus';
import HomePage from './Home';

export default class MainBody extends Component {
  constructor () {
    super();
    this.state = store.getState() || {};
  }
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }
  componentWillUnmount () {
    this.unsubscribe();
  }
  componentWillMount () {
    const campusesThunk = fetchCampuses();
    const studentsThunk = fetchStudents();
    store.dispatch(campusesThunk);
    store.dispatch(studentsThunk);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/campus-list" component={CampusList} />
            <Route exact path="/student-list" component={StudentList} />
            <Route path="/add-campus" component={AddCampus} />
            <Route path="/add-student" component={AddNewStudent} />
            <Route path="/student/:id" component={SingleStudent} />
            <Route path="/campus/:id" component={SingleCampus} />
            <Route exact path='/' component={HomePage} />
          </Switch>
        </div>
      </div>
    );
  }
};
