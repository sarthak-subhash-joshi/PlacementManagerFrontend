import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { BASE_URL } from "../Helper";

const UpdateStudentRecord = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [existingData, setExistingData] = useState([]);
  const [isButtonDisabled,setISButtonDisbled]=useState(false)


  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/student_record/${id}`)
      .then((res) => {
        setValues(res.data);
      })
      .catch((error) => console.log("error" + error));
  }, []);

  useEffect(() => {
    // Fetch existing data to check for duplicate fields
    axios
      .get(`${BASE_URL}/api/student_record`)
      .then((res) => {
        const existingData = res.data.filter(item => item._id !== id); // Exclude current record being updated
        setExistingData(existingData);
      })
      .catch(() => {
        toast.error("Error fetching existing data");
      });
  }, [id]);
  

    const handleUpdate = async(e) => {
      e.preventDefault();
      setISButtonDisbled(true)
      await axios .patch(`${BASE_URL}/api/student_record/${id}`, values)
        .then((res) => {
          toast.success("Record Updated Successfully!");
          setTimeout(function () {
            Navigate(`/profile/${id}`);
          }, 1000);
        })
        .catch((error) => {
            const { email, mobileNo, universityPRN } = values;
            const duplicateFields = [];
          
            existingData.forEach(record => {
              if (record.email === email) {
                duplicateFields.push("Email");
              }
              if (record.mobileNo === mobileNo) {
                duplicateFields.push("Mobile Number");
              }
              if (record.universityPRN === universityPRN) {
                duplicateFields.push("University PRN");
              }
            });
          
            if (duplicateFields.length > 0) {
              toast.error(`Error in updating record: ${duplicateFields.join(", ")} already exists in record`);
            } else {
              toast.error("Error in updating record");
            }
          }).finally(()=>{
            setISButtonDisbled(false)
          })
          
          
    };

  

  const [values, setValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    batch: "",
    universityPRN: "",
    gender: "",
    collegeName: "",
    course: "",
    branch: "",
    classXScore: "",
    classXIIScore: "",
    UGAggregate: "",
    PGAggregate: "",
  });

  return (
    <>
      <div className="form-container">
        <h4 className="form-heading">Update Student Record</h4>
        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="form-group col-lg-4">
              <label>First Name:</label>
              <input
                type="text"
                value={values.firstName}
                onChange={(e) =>
                  setValues({ ...values, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group col-lg-4">
              <label>Middle Name:</label>
              <input
                type="text"
                value={values.middleName}
                onChange={(e) =>
                  setValues({ ...values, middleName: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group col-lg-4">
              <label>Last Name:</label>
              <input
                type="text"
                value={values.lastName}
                onChange={(e) =>
                  setValues({ ...values, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-3">
              <label>Email:</label>
              <input
                type="email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group col-lg-3">
              <label>Mobile No:</label>
              <input
                type="tel"
                value={values.mobileNo}
                pattern="[0-9]{10}"
                title="Please enter a 10-digit mobile number"
                required
                onChange={(e) =>
                  setValues({ ...values, mobileNo: e.target.value })
                }
              />
            </div>
            <div className="form-group col-lg-3">
              <label>Batch:</label>
              <input
                type="text"
                value={values.batch}
                onChange={(e) =>
                  setValues({ ...values, batch: e.target.value })
                }
                required
                readOnly
                style={{border:'none',background:'transparent',color:'#40A2D8',fontWeight:'bolder',fontSize:'x-large',paddingTop:'0'}}
              />
            </div>

            <div className="form-group col-lg-3">
              <label>University PRN:</label>
              <input
                type="text"
                value={values.universityPRN}
                onChange={(e) =>
                  setValues({ ...values, universityPRN: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-3">
              <label>Gender:</label>
              <input
                type="text"
                value={values.gender}
                onChange={(e) =>
                  setValues({ ...values, gender: e.target.value })
                }
                required
                readOnly
                style={{border:'none',background:'transparent',color:'#40A2D8',fontWeight:'bolder',fontSize:'x-large',paddingTop:'0'}}
              />
            </div>
            <div className="form-group col-lg-3">
              <label>College Name:</label>
              <input
                type="text"
                value={values.collegeName}
                onChange={(e) =>
                  setValues({ ...values, collegeName: e.target.value })
                }
                required
                readOnly
                style={{border:'none',background:'transparent',color:'#40A2D8',fontWeight:'bolder',fontSize:'x-large',paddingTop:'0'}}
              />
            </div>
            <div className="form-group col-lg-3">
              <label>Course:</label>
              <input
                type="text"
                value={values.course}
                onChange={(e) =>
                  setValues({ ...values, course: e.target.value })
                }
                required
                readOnly
                style={{border:'none',background:'transparent',color:'#40A2D8',fontWeight:'bolder',fontSize:'x-large',paddingTop:'0'}}

              />
            </div>
            <div className="form-group col-lg-3">
              <label>Branch:</label>
              <input
                type="text"
                value={values.branch}
                onChange={(e) =>
                  setValues({ ...values, branch: e.target.value })
                }
                required
                readOnly
                style={{border:'none',background:'transparent',color:'#40A2D8',fontWeight:'bolder',fontSize:'x-large',paddingTop:'0'}}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-3">
              <label>Class X Score:</label>
              <input
                type="text"
                value={values.classXScore}
                onChange={(e) =>
                  setValues({ ...values, classXScore: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group col-lg-3">
              <label>Class XII Score:</label>
              <input
                type="text"
                value={values.classXIIScore}
                onChange={(e) =>
                  setValues({ ...values, classXIIScore: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group col-lg-3">
              <label>UG Aggregate:</label>
              <input
                type="text"
                value={values.UGAggregate}
                onChange={(e) =>
                  setValues({ ...values, UGAggregate: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group col-lg-3">
              <label>PG Aggregate:</label>
              <input
                type="text"
                value={values.PGAggregate}
                onChange={(e) =>
                  setValues({ ...values, PGAggregate: e.target.value })
                }
                required
              />
            </div>
          </div>
          <button className="btn btn-primary" disabled={isButtonDisabled} type="submit">
            Update
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={false}
        hideProgressBar={true}
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

export default UpdateStudentRecord;
