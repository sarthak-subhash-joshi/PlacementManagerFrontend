import React, { useState, useEffect } from "react";
import "../styles/pages/Profiles.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useStudentRecordContext } from "../hooks/useStudentRecordContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PacmanLoader from "react-spinners/FadeLoader";


const Profiles = () => {
  const { students, dispatch } = useStudentRecordContext();
  const pageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    fetchRecordCount();
  }, [currentPage, searchTerm, dispatch]);

  const fetchRecordCount = async () => {
    try {
      const response = await axios.get(`/api/student_record?q=${searchTerm}`);
      const totalRecords = response.data.length;
      setTotalPages(Math.ceil(totalRecords / pageSize));

      // Calculate the slice of students based on pagination
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      setFilteredStudents(response.data.slice(start, end));
    } catch (error) {
      console.error("Error fetching record count:", error);
    }
  };

  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`/api/student_record/${studentId}`);
        toast.success("Record deleted successfully!");
        dispatch({ type: "DELETE_STUDENT_RECORD", payload: studentId });
        fetchRecordCount(); // Update pagination after deletion
      } catch (error) {
        console.error("Error deleting student record:", error);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset current page to 1
    fetchRecordCount();
  };

  return (
    <>
      <div className="search-bar-container">
        <label className="search-label" htmlFor="searchTerm">
          Search by First Name, Middle Name, Last Name, Email, PRN, or Mobile Number
        </label>
        <input
          className="search-input"
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(); // Call handleSearch when the input value changes
          }}
          // placeholder="Enter search term"
          // placeholder="🔍 Search"
          placeholder="&#128269; Search"
        />
      </div>

      <div className="container-home-top">
        <div className="add-delete-btns-container">
          <NavLink to="/add_student">
            <button id="addUserBtn" type="button" className="btn btn-success">
              <i className="fa-solid fa-plus"></i> Add Student 
            </button>
          </NavLink>
        </div>
      </div>

     
    
      <div  className="subject-container col-lg-8">
        <h4 className="subject-heading">Student's Data (Master Data)</h4>
        {filteredStudents.length === 0 ? (
          <>
            {searchTerm==="" ? (<PacmanLoader color="#36d7b7" />) : (<div style={{color:'#00337C'}}>No records found </div>)}
          </>
        ) : (
          <>
          <div style={{ overflowX: "auto" }}>
          <table  className="table table-striped">
          <thead>
            <tr>
              <th className="row-border">#</th>
              <th className="row-border">Name</th>
              <th className="row-border">Email</th>
              <th className="row-border">PRN</th>
              <th className="row-border">Mobile Number</th>
              <th className="row-border">Course</th>
              <th className="row-border">Branch</th>
              <th id="BtnContainer" className="row-border">
                {/* Delete */}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student._id}>
                <td className="row-border" scope="row">
                  {index + 1 + pageSize * (currentPage - 1)}
                </td>
                <td className="row-border">{`${student.firstName} ${student.middleName} ${student.lastName}`}</td>
                <td className="row-border">{student.email}</td>
                <td className="row-border">{student.universityPRN}</td>
                <td className="row-border">{student.mobileNo}</td>
                <td className="row-border">{student.course}</td>
                <td className="row-border">{student.branch}</td>
                <td id="BtnContainer" className="row-border">
                  {/* <button onClick={() => handleDelete(student._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button> */}
                  <NavLink to={`/profile/${student._id}`}>  <i className="fa-regular fa-eye preview-icon"></i></NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
       


        <div className="pagination-container">
        <button className="pagination-btn" onClick={() => handlePageChange(1)}>
          <i className="fa-solid fa-backward"></i>
        </button>
        <button
          className="pagination-btn"
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        >
          <i className="fa-solid fa-caret-left"></i>
        </button>
        {currentPage} of {totalPages}
        <button
          className="pagination-btn"
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
        >
          <i className="fa-solid fa-caret-right"></i>
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="pagination-btn"
        >
          <i className="fa-solid fa-forward"></i>
        </button>
      </div>


</>
        )}
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

export default Profiles;
