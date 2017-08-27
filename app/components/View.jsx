import React, { Component } from 'react';
import store, { fetchStudents, fetchCampuses, addStudent } from '../store';
import Navbar from './Navbar';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    const campusesThunk = fetchCampuses();
    store.dispatch(campusesThunk);
    const studentsThunk = fetchStudents();
    store.dispatch(studentsThunk);
    this.setState(store.getState());
  }

  //this compoent will display the list of campuses and students in them.
  render() {
    return (
      <div>
        <Navbar />
        <ul>
          { this.state.campuses.map(campus => <li>{campus}</li>)}
        </ul>
      </div>
    );
  }
}
