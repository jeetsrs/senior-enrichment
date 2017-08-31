import React, { Component } from 'react';
import store, { addNewStudent } from '../store';
import history from '../history';

export default class AddNewStudents extends Component {
  constructor (props) {
    super(props);
    this.state = store.getState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const newStudent = {};

    newStudent.name = evt.target.StudentName.value;
    newStudent.cohort = evt.target.StudentCohort.value;
    newStudent.campusId = evt.target.CampusId.value;

    const newStudentThunk = addNewStudent(newStudent);
    store.dispatch(newStudentThunk);
    history.push('/student-list');
  }

  render () {
    const campuses = this.state.campuses;
    return (
      <div className="panel panel-info">
      <div className="panel-heading">
        <h3 className="panel-title">New student enrolment</h3>
      </div>
      <div className="panel-body">
      <div className="form-group">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label>Student Name:</label>
            <input className="form-control" type="text" name="StudentName" placeholder="Enter student name" />
            <br/>
            <label>Student Cohort:</label>
            <input className="form-control" type="text" name="StudentCohort" placeholder="Enter student cohort" />
            <br/>
            <label>Campus Id:</label>&nbsp;&nbsp;&nbsp;
              <select name="CampusId">
                {campuses.map(campus => (
                  <option key={campus.id} value={campus.id}>          {campus.name}</option>
                  )
                )}
              </select>
            <br/><br/>
            <button className="btn btn-default" type="submit">Enroll Student</button>
          </fieldset>
        </form>
      </div>
      </div>
      </div>
    );
  }
}
