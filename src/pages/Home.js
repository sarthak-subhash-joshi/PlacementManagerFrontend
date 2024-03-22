import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../components/BarChart";
import "../styles/pages/Home.css";
import { BASE_URL } from "../Helper";
import PlacementStatistics from "../components/PlacementStatistics";
import PieChart from "../components/PieChart";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const [collegeTotals, setCollegeTotals] = useState({
    PCCOE: 0,
    PCCOER: 0,
    NMIT: 0,
  });
  const [placedTotals, setPlacedTotals] = useState({
    PCCOE: 0,
    PCCOER: 0,
    NMIT: 0,
  });
  const [totalNoOfStudents, setTotalNoOfStudents] = useState(0);
  const [totalOffers, setTotalOffers] = useState(0);
  const [loading, setLoading] = useState(true); 

  const [placementDataRecords, setPlacementDataRecords] = useState([]);
  const [studentDataRecords,setStudentDataRecords]=useState([]);
  const [batch,setBatch]=useState('2024');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student records
        const studentResponse = await axios.get(
          `${BASE_URL}/api/student_record`
        );
        const studentData = studentResponse.data;

        setStudentDataRecords(studentData);   //setting this to transfer this data to PlacementStatistics component

        // Setting total no of students present in student record
        setTotalNoOfStudents(studentData.length);

        // Initialize totals object
        const totals = { PCCOE: 0, PCCOER: 0, NMIT: 0 };

        // Count total students for each college
         studentData.forEach((record) => {
          if (record.collegeName === "PCCOE" && record.batch===batch) {
            totals.PCCOE++;
          } else if (record.collegeName === "PCCOER"  && record.batch===batch) {
            totals.PCCOER++;
          } else if (record.collegeName === "NMIT"  && record.batch===batch) {
            totals.NMIT++;
          }
        });

        // Update state with total students data
        setCollegeTotals(totals);

        // Fetch placement records
        const placementResponse = await axios.get(
          `${BASE_URL}/api/placement_record`
        );
        const placementData = placementResponse.data;

        setPlacementDataRecords(placementData);   //setting this to transfer this data to PlacementStatistics component

        // Setting total offers which is no of placement records     student can have multiple offer that is counted
        setTotalOffers(placementData.length);

        // Initialize placed totals object
        const placedTotals = { PCCOE: 0, PCCOER: 0, NMIT: 0 };

        // Count placed students for each college
        studentData.forEach((record) => {
          const isPlaced = placementData.some(
            (placement) => placement.studentId === record._id
          );
          if (isPlaced) {
            if (record.collegeName === "PCCOE"  && record.batch===batch) {
              placedTotals.PCCOE++;
            } else if (record.collegeName === "PCCOER"  && record.batch===batch) {
              placedTotals.PCCOER++;
            } else if (record.collegeName === "NMIT"  && record.batch===batch) {
              placedTotals.NMIT++;
            }
          }
        });

        // Update state with placed students data
        setPlacedTotals(placedTotals);

         // Set loading to false when data is fetched
         setLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [batch]);

  // Data for the BarChart component
  const chartData = {
    labels: [
      "PCCOE Total",
      "PCCOE Placed",
      "PCCOER Total",
      "PCCOER Placed",
      "NMIT Total",
      "NMIT Placed",
    ],
    datasets: [
      {
        label: "Student Statistics",
        data: [
          collegeTotals.PCCOE,
          placedTotals.PCCOE,
          collegeTotals.PCCOER,
          placedTotals.PCCOER,
          collegeTotals.NMIT,
          placedTotals.NMIT,
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
          <p className="statistics-value">{ loading ? <ClipLoader  />: totalNoOfStudents  }</p>
        </div>
        <div className="statistics-card col-lg-4">
          <p className="statistics-title">Total Offers</p>
          <p className="statistics-value">{ loading ? <ClipLoader  />: totalOffers}</p>
        </div>
        <div className="statistics-card col-lg-4">
          <p className="statistics-title">Total Students Placed</p>
          <p className="statistics-value">
          { loading ? <ClipLoader  />: placedTotals.PCCOE + placedTotals.PCCOER + placedTotals.NMIT} 
          </p>
        </div>
      </div>

      <div className="row container-graph-main">
      <div className="container-bar-graph col-lg-6">
        <h4 className="bar-graph-heading">Collegewise Students Statistics : </h4>
        <select className="select-option-college-student-statistics" value={batch} onChange={(e) => setBatch(e.target.value)}>
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
              </select>
        <BarChart chartData={chartData} />
      </div>

      <div className="container-pie-chart col-lg-6">
        <h4 className="bar-graph-heading">Branchwise Placement Statistics : </h4>
        <PieChart />
      </div>
      </div>

      <PlacementStatistics loading={loading} studentDataRecords={studentDataRecords} placementDataRecords={placementDataRecords}/>

     
       

    </>
  );
};

export default Home;
