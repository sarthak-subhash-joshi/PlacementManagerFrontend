import React, { useState } from "react";
import "../styles/components/AddStudent.css";
import axios from "axios";
import { useStudentRecordContext } from "../hooks/useStudentRecordContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../Helper";

function AddStudent() {
  const { dispatch } = useStudentRecordContext();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [batch, setBatch] = useState("");
  const [universityPRN, setUniversityPRN] = useState("");
  const [gender, setGender] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [classXScore, setClassXScore] = useState("");
  const [classXIIScore, setClassXIIScore] = useState("");
  const [UGAggregate, setUGAggregate] = useState("");
  const [PGAggregate, setPGAggregate] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      middleName,
      lastName,
      email,
      mobileNo,
      batch,
      universityPRN,
      gender,
      collegeName,
      course,
      branch,
      classXScore,
      classXIIScore,
      UGAggregate,
      PGAggregate,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/student_record`,
        formData
      );
      const data = response.data;
      setIsButtonDisabled(true);
      dispatch({ type: "CREATE_STUDENT_RECORD", payload: data });
      toast.success("New record added successfully!");
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setEmail("");
      setMobileNo("");
      setBatch("");
      setUniversityPRN("");
      setGender("");
      setCollegeName("");
      setCourse("");
      setBranch("");
      setClassXScore("");
      setClassXIIScore("");
      setUGAggregate("");
      setPGAggregate("");
      setError("");
    } catch (error) {
      // if (error.response && error.response.data && error.response.data.error) {
      //     const errorMessage = error.response.data.error;
      //     // Set the error state
      //     setError(errorMessage);
      // }
      let errorMessage = "An error occurred. Please try again.";

      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;

        // Check if errorMessage is null before using map
        if (errorMessage.includes("validation failed")) {
          const requiredFields = errorMessage
            .match(/`([^`]+)`/g)
            .map((field) => field.replace(/`/g, ""));
          const friendlyErrorMessage = `Required fields: ${requiredFields.join(
            ", "
          )}`;
          setError(friendlyErrorMessage);
        } else if (errorMessage.includes("duplicate key error")) {
          if (errorMessage.includes("email")) {
            setError("Duplicate entry: Email already exists.");
          } else if (errorMessage.includes("mobileNo")) {
            setError("Duplicate entry: Mobile number already exists.");
          } else if (errorMessage.includes("universityPRN")) {
            setError("Duplicate entry: University PRN already exists.");
          } else {
            setError("Duplicate entry: Record already exists.");
          }
        } else {
          setError("Validation Error: Please check your input fields.");
        }
      } else if (error.response) {
        setError("Server Error: Please try again later.");
      } else {
        setError("Network Error: Please check your internet connection.");
      }
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <div className="form-container">
        <h4 className="form-heading">ADD STUDENT RECORD</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col-lg-4">
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group col-lg-4">
              <label>Middle Name:</label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div className="form-group col-lg-4">
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-3">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group col-lg-3">
              <label>Mobile No:</label>
              <input
                type="tel"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                pattern="[0-9]{10}"
                title="Please enter a 10-digit mobile number"
                required
              />
            </div>
            <div className="form-group col-lg-3">
              <label>Batch:</label>
              <select value={batch} onChange={(e) => setBatch(e.target.value)}>
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
            </div>
            <div className="form-group col-lg-3">
              <label>University PRN:</label>
              <input
                type="text"
                value={universityPRN}
                onChange={(e) => setUniversityPRN(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-3">
              <label>Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group col-lg-3">
              <label htmlFor="collegeName">College Name:</label>
              <select
                id="collegeName"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
              >
                <option value="" disabled>
                  Select College
                </option>
                <option value="PCCOE">PCCOE</option>
                <option value="PCCOER">PCCOER</option>
                <option value="NMIT">NMIT</option>
              </select>
            </div>
            <div className="form-group col-lg-3">
              <label>Course:</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option disabled value="">
                  Select Course
                </option>
                <option value="B.Tech">B.Tech</option>
                <option value="BE">BE</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
              </select>
            </div>
            <div className="form-group col-lg-3">
              <label htmlFor="branch">Branch of Engineering:</label>
              <select
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="" disabled>
                  Select Branch
                </option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
                <option value="Electronics and Communication">
                  Electronics and Communication
                </option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                {/* <option value="Aerospace Engineering">
                  Aerospace Engineering
                </option> */}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-3">
              <label>Class X Score:</label>
              <input
                type="number"
                value={classXScore}
                onChange={(e) => setClassXScore(e.target.value)}
                min="0"
                max="100"
              />
            </div>
            <div className="form-group col-lg-3">
              <label>Class XII Score:</label>
              <input
                type="number"
                value={classXIIScore}
                onChange={(e) => setClassXIIScore(e.target.value)}
                min="0"
                max="100"
              />
            </div>
            <div className="form-group col-lg-3">
              <label>UG Aggregate:</label>
              <input
                type="number"
                value={UGAggregate}
                onChange={(e) => setUGAggregate(e.target.value)}
                min="0"
                max="100"
              />
            </div>
            <div className="form-group col-lg-3">
              <label>PG Aggregate:</label>
              <input
                type="number"
                value={PGAggregate}
                onChange={(e) => setPGAggregate(e.target.value)}
                min="0"
                max="100"
              />
            </div>
          </div>
          <button
            className="btn btn-success"
            type="submit"
            disabled={isButtonDisabled}
          >
            Submit
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
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
}

export default AddStudent;
