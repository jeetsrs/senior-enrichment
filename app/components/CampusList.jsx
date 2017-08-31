import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import store from '../store';

export default class Campuses extends Component {
  constructor () {
    super();
    this.state = store.getState();
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }
  componentWillUnmount () {
    this.unsubscribe();
  }

  render () {
    const campuses = this.state.campuses;
    const students = this.state.students;
    return (
      <div>
        <h1>Campuses</h1>
        <p>
        <Link to="/add-campus"><button className="btn btn-default" >Create a new campus</button></Link>
        </p><br/>
        <div className="col-12">
          {campuses.map(campus => {
            return(
              <div key={campus.name} className="col-6 col-sm-3">
                <Link to={`/campus/${campus.id}`} className="thumbnail"><img src={campus.imgURL} className="rounded" /><h3>{ campus.name }</h3> Students: {students.filter(student => student.campusId === campus.id).length}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

