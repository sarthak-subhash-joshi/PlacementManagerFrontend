import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const closeNavbar = () => {
    setCollapsed(true);
  };

  return (
   <>
     <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div className="container-fluid">
        <div style={{ position: 'relative' }}>
          <NavLink className="navbar-brand-name" to="/" onClick={closeNavbar}>
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
        </div>

        {/* Conditionally render close button when navbar is open */}
        {collapsed ? (
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        ) : (
          <button
            className="close-btn"
            type="button"
            onClick={closeNavbar}
          >
            &times;
          </button>
        )}

        <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`} id="navbarSupportedContent">
          <ul style={{ textAlign: 'center' }} className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" exact to="/" onClick={closeNavbar}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" exact to="/profiles" onClick={closeNavbar}>
                Profiles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/opening" onClick={closeNavbar}>
                List jobs
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>


   </>
  );
};

export default Navbar;
