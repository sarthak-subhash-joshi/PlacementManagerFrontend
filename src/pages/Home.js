import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from "../components/BarChart";
import '../styles/pages/Home.css';

const Home = () => {
  const [collegeTotals, setCollegeTotals] = useState({ PCCOE: 0, PCCOER: 0, NMIT: 0 });
  const [placedTotals, setPlacedTotals] = useState({ PCCOE: 0, PCCOER: 0, NMIT: 0 });
  const [totalNoOfStudents,setTotalNoOfStudents]=useState(0);
  const [totalOffers,setTotalOffers]=useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student records
        const studentResponse = await axios.get("/api/student_record");
        const studentData = studentResponse.data;

        // Setting total no of students present in student record
        setTotalNoOfStudents(studentData.length)

        // Initialize totals object
        const totals = { PCCOE: 0, PCCOER: 0, NMIT: 0 };

        // Count total students for each college
        studentData.forEach((record) => {
          if (record.collegeName === "PCCOE") {
            totals.PCCOE++;
          } else if (record.collegeName === "PCCOER") {
            totals.PCCOER++;
          } else if (record.collegeName === "NMIT") {
            totals.NMIT++;
          }
        });

        // Update state with total students data
        setCollegeTotals(totals);

        // Fetch placement records
        const placementResponse = await axios.get("/api/placement_record");
        const placementData = placementResponse.data;


        // Setting total offers which is no of placement records     student can have multiple offer that is counted
        setTotalOffers(placementData.length)

        // Initialize placed totals object
        const placedTotals = { PCCOE: 0, PCCOER: 0, NMIT: 0 };

        // Count placed students for each college
        studentData.forEach((record) => {
          const isPlaced = placementData.some((placement) => placement.studentId === record._id);
          if (isPlaced) {
            if (record.collegeName === "PCCOE") {
              placedTotals.PCCOE++;
            } else if (record.collegeName === "PCCOER") {
              placedTotals.PCCOER++;
            } else if (record.collegeName === "NMIT") {
              placedTotals.NMIT++;
            }
          }
        });

        // Update state with placed students data
        setPlacedTotals(placedTotals);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Data for the BarChart component
  const chartData = {
    labels: ["PCCOE Total", "PCCOE Placed", "PCCOER Total", "PCCOER Placed", "NMIT Total", "NMIT Placed"],
    datasets: [
      {
        label: "Students Statistics",
        data: [
          collegeTotals.PCCOE,
          placedTotals.PCCOE,
          collegeTotals.PCCOER,
          placedTotals.PCCOER,
          collegeTotals.NMIT,
          placedTotals.NMIT
        ],
        backgroundColor: ["#59CE8F", "#2a71d0"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>

      <div className="total-statistics-container row">
  <div className="statistics-card col-lg-4">
    <p className="statistics-title">Total Students</p>
    <p className="statistics-value">{totalNoOfStudents}</p>
  </div>
  <div className="statistics-card col-lg-4">
    <p className="statistics-title">Total Offers</p>
    <p className="statistics-value">{totalOffers}</p>
  </div>
  <div className="statistics-card col-lg-4">
    <p className="statistics-title">Total Students Placed</p>
    <p className="statistics-value">{placedTotals.PCCOE + placedTotals.PCCOER + placedTotals.NMIT}</p>
  </div>
</div>


      <div className='container-bar-graph'>
      <h4 className='bar-graph'>Collegewise Students Statistics</h4>
      <BarChart chartData={chartData} />
    </div>
    </>
  );
};

export default Home;
