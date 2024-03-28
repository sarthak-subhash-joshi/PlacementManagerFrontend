import React from "react";
import "../styles/components/FilteredCandidates.css";
import GridLoader from "react-spinners/GridLoader";

const FilteredCandidates = ({ candidates, flag, loading }) => {
  const copyAllToClipboard = () => {
    const allEmails = candidates.map((candidate) => candidate.email).join("\n");
    navigator.clipboard
      .writeText(allEmails)
      .then(() => alert("All emails copied to clipboard"))
      .catch((error) => console.error("Failed to copy:", error));
  };

  const downloadCSV = () => {
    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "UG Aggregate",
      "Gender",
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      candidates
        .map((candidate) => {
          return `${candidate.firstName},${candidate.lastName},${candidate.email},${candidate.UGAggregate},${candidate.gender}`;
        })
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "filtered_candidates.csv");
    document.body.appendChild(link);

    link.addEventListener("error", () => {
      // Show error message
      alert("Failed to download CSV file. Please try again later.");
    });

    link.addEventListener("click", () => {
      // Show confirmation message
      alert("CSV file has been downloaded.");
    });

    link.click();
  };

  return (
    <div className="filtered-candidates-container-inside">
      <h4 className="form-heading">Eligible Candidates</h4>
      {candidates.length > 0 ? (
        <>
          <ul>
            {candidates.map((candidate, index) => (
              <p style={{ margin: "0" }} key={index}>
                {index + 1}{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    marginRight: "10px",
                    marginLeft: "0",
                  }}
                >
                  {") "}
                </span>{" "}
                {candidate.email}
              </p>
            ))}
          </ul>
          <div>
            <button
              className="btn btn-success copy-icon-btn"
              onClick={copyAllToClipboard}
            >
              <i className="fa-regular fa-copy copy-icon"></i>{" "}
              <span style={{ margin: "5px" }}>Copy to Clipboard</span>
            </button>
            <button
              className="btn btn-primary download-icon-btn"
              onClick={downloadCSV}
            >
              <i className="fa-solid fa-download download-icon"></i>{" "}
              <span style={{ margin: "5px" }}>Download as CSV</span>
            </button>
          </div>
        </>
      ) : flag ? (
          <p style={{fontSize:'x-large',textAlign:'center'}}><strong>No such candidates found</strong></p>
      ) : (
        <p style={{textAlign:'center'}}>Apply criteria to find eligible candidates.</p>
      )}
    </div>
  );
};

export default FilteredCandidates;
