import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/pages/ProfileDetails.css";
import PacmanLoader from "react-spinners/FadeLoader";
import AddPlacementForm from "../components/AddPlacementForm";
import PlacementDetails from "../components/PlacementDetails";

const ProfileDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`/api/student_record/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [id]);

  return (
    <div className="profile-container">
      {student ? (
        <div className="profile-details">
          <div style={{ overflowX: "auto" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="row-border">Name</th>
                  <th className="row-border">Email</th>
                  <th className="row-border">PRN</th>
                  <th className="row-border">Mobile Number</th>
                  <th className="row-border">Course</th>
                  <th className="row-border">Branch</th>
                  <th className="row-border">Batch</th>
                  <th className="row-border">College</th>
                  <th className="row-border">Class X %</th>
                  <th className="row-border">Class XII %</th>
                  <th className="row-border">UG Aggregate</th>
                  <th className="row-border">PG Aggregate</th>
                  <th className="row-border">Gender</th>
                </tr>
              </thead>
              <tbody>
                <tr key={student._id}>
                  <td className="row-border">{`${student.firstName} ${student.middleName} ${student.lastName}`}</td>
                  <td className="row-border">{student.email}</td>
                  <td className="row-border">{student.universityPRN}</td>
                  <td className="row-border">{student.mobileNo}</td>
                  <td className="row-border">{student.course}</td>
                  <td className="row-border">{student.branch}</td>
                  <td className="row-border">{student.batch}</td>
                  <td className="row-border">{student.collegeName}</td>
                  <td className="row-border">{student.classXScore}</td>
                  <td className="row-border">{student.classXIIScore}</td>
                  <td className="row-border">{student.UGAggregate}</td>
                  <td className="row-border">{student.PGAggregate}</td>
                  <td className="row-border">{student.gender}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="row placement-details-outer-container">
            <div className="col-lg-6 placement-form-container">
              <AddPlacementForm studentId={student._id} />
            </div>
            <div className="col-lg-6 placement-details">
              <PlacementDetails studentId={student._id}/>
            </div>
          </div>
        </div>
      ) : (
        <PacmanLoader color="#36d7b7" />
      )}
    </div>
  );
};

export default ProfileDetails;
