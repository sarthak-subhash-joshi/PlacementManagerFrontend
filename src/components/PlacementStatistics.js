import React,{useState} from 'react';
import '../styles/components/PlacementStatistics.css'
import ClipLoader from "react-spinners/ClipLoader";

const PlacementStatistics = ({ placementDataRecords, studentDataRecords,loading }) => {
  let totalPlacedStudents = 0;
  let totalPlacedPackages = 0;
  let totalStudents = studentDataRecords.length;

  // Calculate average package considering only placed students
  if (placementDataRecords && placementDataRecords.length > 0) {
    placementDataRecords.forEach(placementRecord => {
      const correspondingStudent = studentDataRecords.find(student => student._id === placementRecord.studentId);
      if (correspondingStudent) {
        totalPlacedStudents++;
        const packageValue = parseFloat(placementRecord.ctc); // Converted to float
        totalPlacedPackages += packageValue;
      }
    });
  }

  // Calculate average package considering only the highest offer of placed students
  let placedStudentIds = new Set();
  let highestPackageTotal = 0;
  placementDataRecords.forEach(placementRecord => {
    if (!placedStudentIds.has(placementRecord.studentId)) {
      placedStudentIds.add(placementRecord.studentId);
      const packageValue = parseFloat(placementRecord.ctc); // Converted to float
      highestPackageTotal += packageValue;
    }
  });
  const averagePackageHighestOffer = placedStudentIds.size > 0 ? highestPackageTotal / placedStudentIds.size : 0;

  return (
    <>
      <div className="placement-statistics-container">
      <h4 className="placement-statistics-heading">Placement Statistics :</h4>
      {placementDataRecords && (
        <div className='placement-statistics-body'>
          <div className="container-inside">
          <p><span className='Statistics-type'>Highest Package</span> <span className='statistics-value-pacement'>{loading ? <ClipLoader  /> : placementDataRecords.reduce((max, placementRecord) => Math.max(max, parseFloat(placementRecord.ctc)), 0).toFixed(2) }</span></p> 
          </div>
          <div className="container-inside">
          <p><span className='Statistics-type'>Average Package</span>  <span className="statistics-value-pacement">{loading ? <ClipLoader /> :totalPlacedStudents > 0 && (totalPlacedPackages / totalPlacedStudents).toFixed(2) }</span></p>
          <p className='note-message'><strong style={{color:'red'}}>Note: </strong>Considering only placed students and Multiple offers by signle student are allowed</p>
          </div>
          <div className="container-inside">
          <p><span className='Statistics-type'>Average Package</span>  <span className="statistics-value-pacement">{loading ? <ClipLoader  /> : averagePackageHighestOffer.toFixed(2)}</span></p>
          <p className='note-message'><strong style={{color:'red'}}>Note:</strong> Only the highest offer made to a student is considered. If a student receives multiple offers, only the highest one is taken into account for calculating the average package.</p>
          </div>
          {/* <div className="container-inside">
          <p><span className='Statistics-type'>Average Package</span>  <span className="statistics-value-pacement">{totalStudents > 0 ? (totalPlacedPackages / totalStudents).toFixed(2) : "0.00"}</span></p>
          <p className='note-message'><strong style={{color:'red'}}>Note:</strong> Considering both placed and unplaced students and Multiple offers by signle student are allowed</p>
          </div> */}
         
          
        </div>
      )}
      </div>
    </>
  );
};

export default PlacementStatistics;
