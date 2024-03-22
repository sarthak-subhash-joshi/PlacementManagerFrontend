import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { BASE_URL } from "../Helper";

function PieChart({batch}) {
  const [chartData, setChartData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student data
        const studentDataResponse = await axios.get(`${BASE_URL}/api/student_Record`);
        const studentData = studentDataResponse.data;
  
        // Fetch placement data
        const placementDataResponse = await axios.get(`${BASE_URL}/api/placement_record`);
        const placementData = placementDataResponse.data;
  
        // Process data to get branch-wise counts
        const branchCounts = {};
        const uniqueStudentIds = new Set(); // Set to track unique student IDs
        placementData.forEach(placement => {
          const studentId = placement.studentId;
          if (!uniqueStudentIds.has(studentId)) {
            uniqueStudentIds.add(studentId);
            const student = studentData.find(student => student._id === studentId && student.batch===batch);
            if (student) {
              const branch = student.branch;
              if (!branchCounts[branch]) {
                branchCounts[branch] = 0;
              }
              branchCounts[branch]++;
            }
          }
        });
  
        // Generate chart data from branch counts
        const labels = Object.keys(branchCounts);
        const data = Object.values(branchCounts);
  
        setChartData({
          labels,
          datasets: [
            {
              label: "Number of placed students : ",
              data,
              backgroundColor: ["#59CE8F", "#2a71d0", "#FF5BAE", "#DDDDDD", "#FDAF7B", "#76ABAE", "#FAA300"],
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [batch]);
  
  
  return (
    <>
      
      {chartData && <Pie data={chartData} />}
    </>
  );
}

export default PieChart;
