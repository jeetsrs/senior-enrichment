import React, { Component } from 'react';
import store, { fetchStudents, addStudent } from '../store';
import Navbar from './Navbar';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    const studentsThunk = fetchStudents();
    store.dispatch(studentsThunk);
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  //this compoent will display the list of campuses and students in them.
  render() {
    const students = this.state.students;
    return (
      <div>
        <Navbar />
        <h1>Students</h1>
        <ul>
          {students.map(student => (
            <li key={student.id}>{student.name} - {student.cohort} - {student.campusId}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
