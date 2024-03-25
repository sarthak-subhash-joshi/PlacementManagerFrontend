import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Helper";

const BulkStudentDataUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${BASE_URL}/importUser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("File uploaded successfully!");
        window.location.reload();
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again later."); // Handling error
    }
  };

  return (
    <div>
   

      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
       <i class="fa-solid fa-cloud-arrow-up"></i> Upload CSV
      </button>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
              Bulk Student Data Upload
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
                <div style={{border:'3px dashed #DDDDDD'}}>
                <input style={{margin:'50px'}} type="file" accept=".csv" onChange={handleFileChange} />
                </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={handleSubmit}
              >
                <i class="fa-solid fa-file-arrow-up"></i> Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkStudentDataUpload;
