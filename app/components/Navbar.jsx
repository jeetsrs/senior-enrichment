import React from 'react';
import { Link, Route } from 'react-router-dom';

const Navbar = (props) => {
    return (
      <nav className="navbar navbar-default">

          <div className="navbar-header">
          <img src="escolas.png" alt="Brand" width="50" height="50"  /><Link className="navbar-brand" to="/">Sol System Interplanetary Academy</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><Link to="/campus-list">Campuses</Link></li>
            <li><Link to="/student-list">Students</Link></li>
          </ul>
          </div>

      </nav>
    );
};

export default Navbar;
