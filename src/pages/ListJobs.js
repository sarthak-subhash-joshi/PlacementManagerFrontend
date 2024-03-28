import React, { useState } from 'react';
import FilteredCandidates from '../components/FilteredCandidates';
import axios from 'axios';
import '../styles/pages/ListJobs.css';
import { BASE_URL } from '../Helper';
import GridLoader from "react-spinners/GridLoader";

const ListJobs = ({ onSubmit }) => {
  const [minPercentage, setMinPercentage] = useState('');
  const [gender, setGender] = useState('');
  const [minCtc, setMinCtc] = useState(0);
  const [filteredCandidates, setFilteredCandidates] = useState([]); 
  const [flag,setFlag]=useState(false);
  const [selection, setSelection] = useState(''); // To track the selection (Unplaced or Anyone)
  const [batch,setBatch]=useState("");

  const [loading,setLoading]=useState(false);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true)  //setting loading 

     // Start timeout for displaying message after 1.5 minutes
     const timeoutId = setTimeout(() => {
      setShowTimeoutMessage(true);
    }, 90000); // 1.5 minutes

    if (!selection) { // If no selection has been made
      alert('Please select "Unplaced" or "Anyone" before submitting.'); // Show alert
      return; // Prevent further execution
    }
  
    try {
      // Fetch placement records from the API endpoint
      const placementResponse = await axios.get(`${BASE_URL}/api/placement_record/`);
      const placementData = placementResponse.data;
  
      // Create a map of studentId to maximum CTC among placements for each student
      const maxCtcByStudentId = {};
      placementData.forEach(placement => {
        const studentId = placement.studentId;
        const ctc = parseFloat(placement.ctc);
        if (!maxCtcByStudentId[studentId] || ctc > maxCtcByStudentId[studentId]) {
          maxCtcByStudentId[studentId] = ctc;
        }
      });
  
      // Fetch candidates from the API endpoint
      const candidateResponse = await axios.get(`${BASE_URL}/api/student_record/`);
      const candidateData = candidateResponse.data;

      // Filter candidates based on criteria
      let filteredCandidates;
      
      // Filter candidates based on criteria and minimum CTC
      filteredCandidates = candidateData.filter(candidate => {
        const ctcThreshold = parseFloat(minCtc);
        const candidateCtc = maxCtcByStudentId[candidate._id];
        // Check if the gender is 'Both'
        if (gender === 'Both') {
          return (
            candidate.UGAggregate > parseFloat(minPercentage) &&
            (candidate.gender === 'Male' || candidate.gender === 'Female') &&
            (!candidateCtc || candidateCtc <= ctcThreshold) && candidate.batch===batch
          );
        } else {
          // Filter based on selected gender
          return (
            candidate.UGAggregate > parseFloat(minPercentage) &&
            candidate.gender === gender &&
            (!candidateCtc || candidateCtc <= ctcThreshold) && candidate.batch===batch
          );
        }
      });
  
      // Extract necessary data from filtered candidates
      const candidateDetails = filteredCandidates.map(candidate => ({
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        UGAggregate: candidate.UGAggregate,
        gender: candidate.gender
      }));
  
      // Update the state with filtered candidates
      setFilteredCandidates(candidateDetails);

       // Set loading to false when data is fetched
       setLoading(false);
      

    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }

    setFlag(true);
  };

 

  return (
    <>
      <div className="row list-jobs-container-main align-items-start">
        <div className="criteria-form-container col-lg-3 ">
          <h4 className='form-heading'>Enter Criteria</h4>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="minPercentage">Minimum UG Aggregate Percentage:</label>
              <input
                type="number"
                id="minPercentage"
                value={minPercentage}
                onChange={(e) => setMinPercentage(e.target.value)}
                placeholder="Enter minimum UG aggregate percentage"
                min={0}
                max={100}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Both">Both Male and Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Select One:</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="unplaced"
                  name="selection"
                  value="Unplaced"
                  checked={selection === 'Unplaced'}
                  onChange={() => setSelection('Unplaced')}
                  required
                />
                <label htmlFor="unplaced">Unplaced</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="anyone"
                  name="selection"
                  value="Anyone"
                  checked={selection === 'Anyone'}
                  onChange={() => setSelection('Anyone')}
                  required
                />
                <label htmlFor="anyone">Below certain CTC students</label>
              </div>
            </div>

            {selection === 'Anyone' && (
              <div className="form-group">
                <label htmlFor="minCtc">Maximum CTC students can apply:</label>
                <input
                  type="text"
                  id="minCtc"
                  value={minCtc}
                  onChange={(e) => setMinCtc(e.target.value)}
                  className="form-control"
                  placeholder="Enter minimum CTC"
                  min={0}
                  required
                />
              </div>
            )}


            <label>Batch:</label>
              <select value={batch} onChange={(e) => setBatch(e.target.value)} required>
                <option value="" disabled>
                  Select Batch
                </option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
                <option value="2031">2031</option>
                <option value="2032">2032</option>
                <option value="2033">2033</option>
                <option value="2034">2034</option>
                <option value="2035">2035</option>
              </select>

              

            <button style={{marginTop:'30px'}} disabled={loading} className='btn btn-success' type="submit">Submit</button>

          </form>
        </div>
        <div style={{ position: 'relative' }} className="filtered-candidates-container  col-lg-4">
       {
        loading===true ? (
          <div className="filtering-loader">
            <GridLoader color="gray" />
          </div>
        ) :<FilteredCandidates  candidates={filteredCandidates} flag={flag} />
       }
       {loading && showTimeoutMessage && (
            <p style={{textAlign:'center'}}>It is taking more time than required. Please check your internet connection and try again.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ListJobs;
