import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark ">
      <div className="container-fluid">
        <div style={{ position: 'relative' }}>
          <NavLink className="navbar-brand-name" to='/'>
            <img
              src={logo}
              alt=""
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '5%'
              }}
            />{' '}
            Placement Manager
          </NavLink>
          {/* <p className="tagline">Thrive, Wellness, and Harmony</p> */}
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul style={{textAlign:'center'}} className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" exact to='/'>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" exact to='/profiles'>
                Profiles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to='/opening'>
                List jobs
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
