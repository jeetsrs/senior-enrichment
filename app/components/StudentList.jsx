import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import store, {deleteStudentThunk} from '../store';

export default class Students extends Component {
  constructor () {
    super();
    this.state = store.getState();
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }
  componentWillUnmount () {
    this.unsubscribe();
  }
  handleDelete(e){
    e.preventDefault();
    const deleteStudent = deleteStudentThunk(e.target.value);
    store.dispatch(deleteStudent);
  }

  render () {
    const students = this.state.students;
    const campuses = this.state.campuses;
    return (
      <div>
        <h1>Students</h1>
        <p>
        <Link to="/add-student"><button className="btn btn-default" >Enroll a new student</button></Link>
        </p>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Cohort</th>
            <th>Enrolled in campus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {students.map(student => (
          <tr key={student.id}>
            <td>{ student.id }</td>
            <td><Link to={`/student/${student.id}`}>{ student.name }</Link></td>
            <td>{ student.cohort }</td>
            <td>{campuses.map(campus => (campus.id === student.campusId) ? campus.name : null )}</td>
            <td><button className="btn btn-danger" value={student.id} onClick={this.handleDelete}>X</button></td>
          </tr>
        ))}
        </tbody>
        </table>
      </div>
    );
  }
}
