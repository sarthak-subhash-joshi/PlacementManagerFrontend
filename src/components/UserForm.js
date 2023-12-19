import React, { useState } from "react";
import "../styles/components/UserForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import yogaImg1 from '../assets/yoga_img1.jpeg'
import yogaImg2 from '../assets/yoga_img2.jpeg'
import { NavLink, useNavigate } from 'react-router-dom'


const UserForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [batchTiming, setBatchTiming] = useState("");

  const [error, setError] = useState(null);

  const [isValidAge, setIsValidAge] = useState(false);

  const Navigate=useNavigate()

  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (isValidAge === false) {
      const userData = { name, age, enrollmentDate, batchTiming };
 
      const response = await fetch("https://flexyogbackend.onrender.com/api", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setName("");
        setAge("");
        setEnrollmentDate("");
        setBatchTiming("");
        setError(null);
        // console.log("new User Added Successfully");
        toast("new User Added Successfully !");
        setTimeout(function() {
          Navigate('/profiles')
          setButtonDisabled(false);
      }, 1500);
      }
    } else {
      console.log("Error, Please check carefully");
    }
  };

  const handleAgeChange = (e) => {
    const newAge = e.target.value;
    setAge(newAge);

    // Checking if the age is within the valid range (18 to 65)
    if (newAge < 18 || newAge > 65) {
      setIsValidAge(true);
    } else {
      setIsValidAge(false);
    }
  };

  return (
    <>
    
      <div className="user-form-main-container row">
        <form
          action=""
          className="create col-lg-6 col-xl-6"
          onSubmit={handleSubmit}
        >
          <h3
            style={{
              marginBottom: "5%",
              marginTop: "3%",
              color: "#7149C6",
              textAlign: "center",
            }}
          >
            <i
              style={{ color: "green" }}
              className="fa-solid fa-person-walking fa-sm"
            ></i>{" "}
            Yoga Class Admission Form{" "}
            <i
              style={{ color: "green" }}
              className="fa-solid fa-person-walking fa-sm"
            ></i>
          </h3>

          <label>Name:</label>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <label>Age:</label>
          <input
            required
            type="number"
            onChange={handleAgeChange}
            value={age}
          />
          {isValidAge === true && (
            <p className="error-message">Age must be between 18 and 65.</p>
          )}

          <label>Enrollment Date:</label>
          <input
            required
            type="date"
            onChange={(e) => setEnrollmentDate(e.target.value)}
            value={enrollmentDate}
          />

          <label>Batch Timing:</label>
          <select
            name="batch"
            required
            onChange={(e) => setBatchTiming(e.target.value)}
            value={batchTiming}
            className="select-input"
          >
            <option value="" disabled>Select</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>

          <button type="submit"  disabled={isButtonDisabled} className="button-contact">
            Submit
          </button>
        </form>
        <div className="col-lg-3 yoga-images-container">
          <img src={yogaImg1} className="yoga-img" alt="" />
          <img src={yogaImg2} className="yoga-img" alt="" />
        </div>
      </div>

      <ToastContainer
        toastStyle={{ backgroundColor: "green" }}
        position="top-right"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />


    </>
  );
};

export default UserForm;
