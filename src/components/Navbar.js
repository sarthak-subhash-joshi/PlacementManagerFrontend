import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/Navbar.css';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <div style={{ position: 'relative' }}>
          <NavLink className="navbar-brand" to='/'>
            <img
              src={logo}
              alt=""
              style={{
                width: '80px',
                height: '50px',
                borderRadius: '5%'
              }}
            />{' '}
            Flexyog
          </NavLink>
          <p className="tagline">Thrive, Wellness, and Harmony</p>
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
              <NavLink className="nav-link" activeClassName="active" to='/profiles'>
                User Profiles
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
