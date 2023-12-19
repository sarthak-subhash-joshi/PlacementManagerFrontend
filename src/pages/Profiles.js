import React, { useState, useEffect } from 'react';
import '../styles/pages/Profiles.css';
import { NavLink } from 'react-router-dom';

const Profiles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://flexyogbackend.onrender.com/api');
      const json = await response.json();
      if (response.ok) {
        setUsers(json);
      }
    };

    fetchUser();
  }, []);

  const formatDate = (dateString) => {
    // Assuming dateString is in the format "yyyy-mm-ddThh:mm:ss.sssZ"
    const parts = dateString.split('T');
    const datePart = parts[0];
    const [year, month, day] = datePart.split('-');
  
    return `${day}/${month}/${year}`;
  };
  

  return (
    <>

<NavLink to="/"><button className='goToHomeBtn'><i class="fa-solid fa-arrow-left"></i> Home</button></NavLink>
    
      <div style={{ overflowX: 'auto' }} className="subject-container col-lg-8">
        <h4 className="subject-heading">User Data</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="row-border">Name</th>
              <th className="row-border">Age</th>
              <th className="row-border">Enrollment Date</th>
              <th className="row-border">Batch Timing</th>
            </tr>
          </thead>
          {users.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="7">
                  <div className="loader-container">
                    <div className="loader"></div>
                    <br />
                  </div>
                  <p style={{textAlign:'center'}}>Hold on, the data is currently being loaded.</p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {users.map((currElem, index) => (
                <tr key={currElem.id}>
                  <td className="row-border" scope="row">
                    {currElem.name}
                  </td>
                  <td className="row-border" scope="row">
                    {currElem.age}
                  </td>
                  <td className="row-border" scope="row">
                    {formatDate(currElem.enrollmentDate)}
                  </td>
                  <td className="row-border" scope="row">
                    {currElem.batchTiming}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default Profiles;
