import React, { useState } from 'react';
import { usePlacementRecordContext } from '../hooks/usePlacementRecordContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPlacementForm = ({studentId}) => {
  const{dispatch}=usePlacementRecordContext();

  const [companyName, setCompanyName] = useState('');
  const [ctc, setCtc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    const formdata={
      companyName,
      ctc,
      studentId
    }

    try{
      const response=await axios.post(`/api/placement_record`,formdata)
      const data=response.data
      dispatch({type:'CREATE_PLACEMENT_RECORD',payload:data})
      toast.success("New record added successfully!");
      setCompanyName('')
      setCtc('')
      setError('')

    }catch(error){
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        // Check if error message contains required field error
        if (errorMessage.includes('validation failed')) {
          const requiredFields = errorMessage.match(/`([^`]+)`/g).map(field => field.replace(/`/g, ''));
          setError(`Required fields:  ${requiredFields.join(', ')}`);
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    }finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500); // 2 seconds delay
    }
    
  };

  return (
    <>

<div className="form-container">
      <h4 className='form-heading'>ADD PLACEMENT RECORD</h4>
      <form onSubmit={handleSubmit}>
        {/* PRN and Email fields are not displayed */}
        <input type="hidden" value={studentId}  readOnly />

        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="ctc">CTC (in LPA):</label>
          <input type="number" id="ctc" value={ctc} onChange={(e) => setCtc(e.target.value)} />
        </div>
        <button className='btn btn-success' disabled={loading} type="submit">Submit</button>

        {error && <div style={{ color: 'red',fontSize:'large' }}>{error}</div>}
      </form>
    </div>

       <ToastContainer
                position="top-right"
                autoClose={1100}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
    </>
  );
};

export default AddPlacementForm;
