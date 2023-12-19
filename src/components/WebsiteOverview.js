import React from 'react';
import '../styles/components/WebsiteOverview.css'

const WebsiteOverview = () => {
  return (
    <div className='overview-container'>
      <h3 className='overview-headings'>Website Overview:</h3>
      <p >
      Welcome to Flexyog, our dynamic data management platform designed to provide a seamless user experience. We've built the frontend using ReactJS and Bootstrap, ensuring a modern and responsive interface. For efficient data handling, our backend relies on Express, creating a RESTful API that supports essential operations such as GET, PUT, and DELETE
      </p>

      

      <h3 className='overview-headings'>Technology Stack:</h3>
      <p>
        <strong>Frontend:</strong>
        <ul>
          <li>ReactJS: Providing a robust and responsive user interface.</li>
          <li>Bootstrap: Ensuring a clean and visually appealing design.</li>
        </ul>
      </p>
      <p>
        <strong>Backend (JSON Server):</strong>
        <ul>.
          <li>Flexyog's backend is powered by Express.js, creating a RESTful API for seamless interactions with our MongoDB database. This dynamic duo ensures efficient CRUD operations, allowing users to manage and persist data with ease.</li>
          <li> server : <a href="https://flexyogbackend.onrender.com/api" target="_blank" rel="noopener noreferrer">click here</a></li>
        </ul>
      </p>

      <h3 className='overview-headings'>Deployment:</h3>
      <p>
        website is live and hosted on Netlify, offering a reliable and scalable platform for users to access and interact
        with the data management features seamlessly.The backend is deployed on Render, ensuring optimal performance and responsiveness.
      </p>
    </div>
  );
};

export default WebsiteOverview;
