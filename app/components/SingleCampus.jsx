import { NavLink, Link } from 'react-router-dom';
import React, { Component } from 'react';
import store ,{deleteStudentThunk, deleteCampusThunk, updateCampusThunk} from '../store';
import history from '../history';

export default class SingleCampus extends Component {
  constructor (props) {
    super(props);
    this.state = store.getState() || {};

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCampusDelete = this.handleCampusDelete.bind(this);
    this.handleChangeCampusName = this.handleChangeCampusName.bind(this);
    this.handleChangeCampusURL = this.handleChangeCampusURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    this.setState({campus: this.state.campuses.find(campus => (campus.id === +this.props.match.params.id) ? campus : null )});
  }
  componentWillUnmount () {
    this.unsubscribe();
  }

  handleCampusDelete(evt){
    evt.preventDefault();
    const deleteCampus = deleteCampusThunk(evt.target.value);
    store.dispatch(deleteCampus);
    history.push('/campus-list');
  }
  handleDelete(evt){
    const deleteStudent = deleteStudentThunk(evt.target.value);
    store.dispatch(deleteStudent);
    // history.push('/campus-list');
  }
  handleChangeCampusName(evt){
    this.setState({campus: {
      id: this.state.campus.id,
      name: evt.target.value,
      imgURL: this.state.campus.imgURL,
      student: this.state.campus.student
    }});
  }
  handleChangeCampusURL(evt){
    this.setState({campus: {
      id: this.state.campus.id,
      name: this.state.campus.name,
      imgURL: evt.target.value,
      student: this.state.campus.student
    }});
  }
  handleSubmit (evt) {
    evt.preventDefault();
    const updateCampus = updateCampusThunk(this.state.campus);
    store.dispatch(updateCampus);
    history.push('/campus-list');
  }


  render () {
    const campuses = this.state.campuses || [];
    const campus = this.state.campuses.find(campus => (campus.id === +this.props.match.params.id) ? campus : null ) || {};
    const students = this.state.students || [];

    return (
      <div>
        <div className="row">
          <div className="col-sm-6 col-md-4 pull-left">
            <div className="thumbnail">
              <img src={campus.imgURL} alt={campus.id} className="rounded" />
              <div className="caption">
                <h3>{campus.name}</h3>
                <p>
                <Link to="/add-student"><button className="btn btn-default" >Enroll Student</button></Link> <button className="btn btn-danger" value={campus.id} onClick={this.handleCampusDelete}>DELETE Campus</button>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 pull-right">
            <div className="panel panel-danger">
              <div className="panel-heading">
                <h3 className="panel-title">Edit campus details</h3>
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                <fieldset>
                  <label>Campus Name:</label>
                  <input className="form-control" type="text" name="CampusName" value={this.state.campus.name} onChange={this.handleChangeCampusName}/>
                  <br/>
                  <label>Campus imgURL:</label>
                  <input className="form-control" type="text" name="CampusURL" value={this.state.campus.imgURL} onChange={this.handleChangeCampusURL }/>
                  <br/>
                  <button className="btn btn-default" type="submit">Update</button>
                </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
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
            {students.map(student => {
              if (student.campusId == campus.id) {
                return(
                  <tr key={student.id}>
                  <td>{ student.id }</td>
                  <td><Link to={`/student/${student.id}`}>{ student.name }</Link></td>
                  <td>{ student.cohort }</td>
                  <td>{campuses.map(campus => (campus.id === student.campusId) ? campus.name : null )}</td>
                  <td><button className="btn btn-danger" value={student.id} onClick={this.handleDelete}>X</button></td>
                  </tr>
                );
              }
            })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
