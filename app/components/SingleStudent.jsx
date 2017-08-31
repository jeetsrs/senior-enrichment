import { NavLink, Link } from 'react-router-dom';
import React, { Component } from 'react';
import store ,{deleteStudentThunk, updateStudentThunk} from '../store';
import history from '../history';

export default class SingleStudent extends Component {
  constructor (props) {
    super(props);
    this.state = store.getState() || {};

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeStudentName = this.handleChangeStudentName.bind(this);
    this.handleChangeStudentCohort = this.handleChangeStudentCohort.bind(this);
    this.handleChangeCampusId = this.handleChangeCampusId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    this.setState({student: this.state.students.find(student => (student.id === +this.props.match.params.id) ? student : null )});
  }
  componentWillUnmount () {
    this.unsubscribe();
  }

  handleDelete(evt){
    evt.preventDefault();
    const deleteStudent = deleteStudentThunk(evt.target.value);
    store.dispatch(deleteStudent);
    history.push('/student-list');
  }
  handleChangeStudentName (evt) {
    this.setState({student: {
      id: this.state.student.id,
      name: evt.target.value,
      cohort: this.state.student.cohort,
      campusId: this.state.student.campusId
    }});
  }
  handleChangeStudentCohort (evt) {
    this.setState({student: {
      id: this.state.student.id,
      name: this.state.student.name,
      cohort: evt.target.value,
      campusId: this.state.student.campusId
    }});
  }
  handleChangeCampusId (evt) {
    this.setState({student: {
      id: this.state.student.id,
      name: this.state.student.name,
      cohort: this.state.student.cohort,
      campusId: +evt.target.value
    }});
  }
  handleSubmit (evt) {
    evt.preventDefault();
    const updateStudent = updateStudentThunk(this.state.student);
    store.dispatch(updateStudent);
    history.push('/student-list');
  }


  render () {
    const students = this.state.students || [];
    const campuses = this.state.campuses || [];
    const student = Object.assign({}, this.state.student);
    const campus = campuses.filter(campus => (campus.id == student.campusId))[0] || {};

    return (
      <div className="row">
      <div className="col-md-8 pull-left">
        <h3>{student.name}</h3>
        Cohort: {student.cohort} <br/>
        Campus Id: {student.campusId} <br/>
        Campus: <Link to={`/campus/${campus.id}`}>{campus.name}</Link> <br/><br/>
        <button className="btn btn-danger" value={student.id} onClick={this.handleDelete}>X - Expell Student</button>
      </div>

      <div className="col-md-4 pull-right">
        <div className="panel panel-danger">
          <div className="panel-heading">
            <h3 className="panel-title">Edit student details</h3>
          </div>

          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label>Student Name:</label>
              <input className="form-control" type="text" name="StudentName" value={this.state.student.name} onChange={this.handleChangeStudentName}/>
              <br/>
              <label>Student Cohort:</label>
              <input className="form-control" type="text" name="StudentCohort" value={this.state.student.cohort} onChange={this.handleChangeStudentCohort }/>
              <br/>
              <label>Campus Id:</label>&nbsp;&nbsp;&nbsp;
                <select name="CampusId" value={this.state.student.campusId} onChange={this.handleChangeCampusId}>
                  {campuses.map(campus => (
                    <option key={campus.id} value={campus.id}>    {campus.name}</option>
                    )
                  )}
                </select>
              <br/><br/>
              <button className="btn btn-default" type="submit">Update</button>
            </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
