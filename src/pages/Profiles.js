import React, { useState, useEffect } from "react";
import "../styles/pages/Profiles.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useStudentRecordContext } from "../hooks/useStudentRecordContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PacmanLoader from "react-spinners/FadeLoader";
import { BASE_URL } from "../Helper";
import BulkStudentDataUpload from "../components/BulkStudentDataUpload";


const Profiles = () => {
  const { students, dispatch } = useStudentRecordContext();
  const[pageSize,setPageSize]=useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  const[placementData,setPlacementData]=useState([])

  useEffect(() => {
    fetchRecordCount();
  }, [currentPage, searchTerm, dispatch,pageSize]);

  const fetchRecordCount = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/student_record?q=${searchTerm}`);
      const totalRecords = response.data.length;
      setTotalPages(Math.ceil(totalRecords / pageSize));

      // Calculate the slice of students based on pagination
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      setFilteredStudents(response.data.slice(start, end));

      const placementResponse = await axios.get(`${BASE_URL}/api/placement_record`);
      setPlacementData(placementResponse.data);

    } catch (error) {
      console.error("Error fetching record count:", error);
    }
  };

  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`${BASE_URL}/api/student_record/${studentId}`);
        toast.success("Record deleted successfully!");
        dispatch({ type: "DELETE_STUDENT_RECORD", payload: studentId });
        fetchRecordCount(); // Update pagination after deletion
      } catch (error) {
        console.error("Error deleting student record:", error);
        toast.error("Error deleting student record");
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

      <div className="container-home-top ">
          <NavLink to="/add_student">
            <button id="addUserBtn" type="button" className="btn btn-success">
              <i className="fa-solid fa-plus"></i> Add Student 
            </button>
          </NavLink>
         <BulkStudentDataUpload/>

      </div>

     
    
      <div  className="subject-container ">
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
              <th className="row-border">Batch</th>
              <th className="row-border">College</th>
              <th className="row-border">Status</th>
              <th className="row-border">
                  Preview
              </th>
              <th  className="row-border">
                  Delete
              </th>
              <th  className="row-border">
                  Edit
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
                <td className="row-border">{student.batch}</td>
                <td className="row-border">{student.collegeName}</td>
                <td className="row-border" style={{color:"#008DDA",fontWeight:'bolder'}}>{placementData.find(entry => entry.studentId === student._id) !== undefined  ? 'Placed' : 'Unplaced'}</td>
                <td  className="row-border btn-container">
                  <NavLink to={`/profile/${student._id}`}>  <i className="fa-regular fa-eye preview-icon"></i></NavLink>
                </td>
                <td id="BtnContainer" className="row-border btn-container">
                    <i className="fa-solid fa-trash delete-icon" onClick={() => handleDelete(student._id)}></i>
                </td>
                <td id="BtnContainer" className="row-border btn-container">
                <NavLink to={`/update_student_record/${student._id}`}> <i class="fa-solid fa-pen-to-square update-icon"></i></NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
       

          <div>
        <select style={{width:'70px'}} value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))}>
  <option value="" disabled>
  Rows Per Page
  </option>
  <option value={5}>5</option> {/* Set value attribute to a number */}
  <option value={10}>10</option> {/* Set value attribute to a number */}
  <option value={20}>20</option> {/* Set value attribute to a number */}
</select>
        </div>
        <div className="pagination-container">

        {currentPage !== 1 && (
    <>
    <button className="pagination-btn" onClick={() => handlePageChange(1)}>
          <i className="fa-solid fa-backward fa-lg"></i>
        </button>
        <button
          className="pagination-btn"
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        >
          <i className="fa-solid fa-caret-left fa-lg"></i>
        </button>
    </>
  )}
   
       
        {currentPage} of {totalPages}

        {currentPage !== totalPages && (
    <>
    <button
          className="pagination-btn"
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
        >
          <i className="fa-solid fa-caret-right fa-lg"></i>
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="pagination-btn"
        >
          <i className="fa-solid fa-forward fa-lg"></i>
        </button>
    </>
  )}
      
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
