import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StudentRecordContextProvider } from './context/StudentRecordContext'
import { PlacementRecordContextProvider } from './context/PlacementRecordContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <PlacementRecordContextProvider>
    <StudentRecordContextProvider>
       <App />
    </StudentRecordContextProvider>
    </PlacementRecordContextProvider>
  </React.StrictMode>
);


