import React, { Component } from 'react';
import store, { addNewCampus } from '../store';
import history from '../history';


export default class NewCampusEntry extends Component {
  handleSubmit (evt) {
    evt.preventDefault();
    const newCampus = {};

    newCampus.name = evt.target.CampusName.value;
    newCampus.imgURL = evt.target.CampusImageURL.value;

    const newCampusThunk = addNewCampus(newCampus);
    store.dispatch(newCampusThunk);
    history.push('/campus-list');
  }

  render () {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">Create a new campus</h3>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <form onSubmit={this.handleSubmit}>
              <fieldset>
                <input className="form-control" type="text" name="CampusName" placeholder="Enter campus name" /><br/>
                <input className="form-control" type="text" name="CampusImageURL" placeholder="Enter campus image URL" /><br/>
                <button className="btn btn-default" type="submit">Create Campus</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
