import { useState, useEffect } from "react";
import { makeRequest } from "../../../axios";
import NCOAReportsAddForm from "./NCOAAuditReportsAdminDisplayComponents/NCOAReportsAddForm";
import NCOAReportsStaffTable from "./NCOAAuditReportsAdminDisplayComponents/NCOAReportsStaffTable";
import NCOAReportsStaffPagination from "./NCOAAuditReportsAdminDisplayComponents/NCOAReportsStaffPagination";

export default function NCOAAuditReports() {
  //ADD FORM FUNCTIONS

  const [formData, setFormData] = useState({
    coareportID: "",
    reference: "",
    dateCreated: new Date(),
    details: "",
    dateReceived: new Date(),
    complianceStatus: "",
    file: null,
    remarks: "",
    personnelID: "",
  });
  console.log(
    "the formData UseState of COA Audit Reports" + JSON.stringify(formData)
  );

  // to fetch
  useEffect(() => {
    fetchCOAAuditReports();
  }, []);

  const fetchCOAAuditReports = async () => {
    try {
      const response = await makeRequest.get("/getCOAAuditReports");
      console.log(response.data); // to check the fetched data
      const sortedCOAAuditReports = response.data.sort();
      setCOAAuditReports(sortedCOAAuditReports);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching COA Audit Reports.");
    }
  };

  // const getMaxCOAReportID = () => {
  //   if (coaAuditReports.length === 0) {
  //     return 1;
  //   }
  //   const maxCOAReportID = Math.max(
  //     ...coaAuditReports.map((coaauditreport) =>
  //       parseInt(coaauditreport.coa_report_ID)
  //     )
  //   );
  //   return maxCOAReportID + 1;
  // };

  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to add this COA Audit Report?"
    );

    if (!userConfirmed) {
      // User clicked 'Cancel' in the confirmation dialog
      alert("COA Audit Report not added.");
      return;
    }
    try {
      // const coareportID = getMaxCOAReportID();
      const formattedDateCreated = formData.dateCreated.toLocaleDateString();
      const formattedDateReceived = formData.dateReceived.toLocaleDateString();

      const formDataToSend = new FormData();

      // Append form data including the file
      // formDataToSend.append("coareportID", formData.coareportID);
      formDataToSend.append("reference", formData.reference);
      formDataToSend.append("dateCreated", formattedDateCreated);
      formDataToSend.append("details", formData.details);
      formDataToSend.append("dateReceived", formattedDateReceived);
      formDataToSend.append("complianceStatus", formData.complianceStatus);
      formDataToSend.append("file", formData.file);
      formDataToSend.append("remarks", formData.remarks);
      formDataToSend.append("personnelID", formData.personnelID);

      console.log("the formData to send " + JSON.stringify(formDataToSend));
      const response = await makeRequest.post(
        "/addCOAAuditReport",
        formDataToSend
      );

      if (response.data.Status === "Success") {
        alert("COA Audit Report added successfully!");
        setFormData((prevData) => ({
          ...prevData,
          coareportID: "",
          reference: "",
          dateCreated: new Date(),
          details: "",
          dateReceived: new Date(),
          complianceStatus: "",
          file: null,
          remarks: "",
          personnelID: "",
          // userID: prevData.userID,
        }));
        fetchCOAAuditReports();
        setShowForm(false);
      } else {
        alert("Error adding COA Audit Report. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the COA Audit Report.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileSizeLimit = 25000000; // 25MB in bytes
      // 25000000     25MB in bytes
      // 10000000     10MB in bytes
      //  5000000      5MB in bytes
      //  1000000      1MB in bytes

      if (
        selectedFile.size <= fileSizeLimit &&
        selectedFile.type === "application/pdf"
      ) {
        setFormData((prevData) => ({
          ...prevData,
          file: selectedFile,
        }));
      } else {
        // File exceeds the size limit or is not a PDF
        setFormData((prevData) => ({
          ...prevData,
          file: null,
        }));

        if (selectedFile.type !== "application/pdf") {
          alert("Please select a PDF file.");
        } else {
          alert("Please select a file that is no larger than 25MB.");
        }

        // Clear the input field
        e.target.value = "";
      }

      // Move this inside the if block to access selectedFile

      // setEditFileFormData((prevData) => ({
      //   ...prevData,
      //   file: selectedFile,
      // }));
    }
  };
  const [coaAuditReports, setCOAAuditReports] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = coaAuditReports.slice(indexOfFirstItem, indexOfLastItem);

  const handleHideFormClick = () => {
    setShowForm(false);
  };

  const handleAddCOAReportClick = () => {
    setShowForm(true);
    setFormData((prevData) => ({
      ...prevData,
    }));
  };

  const handleClearFormClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      coareportID: "",
      reference: "",
      dateCreated: new Date(),
      details: "",
      dateReceived: new Date(),
      complianceStatus: "",
      file: "",
      remarks: "",
      personnelID: "",
    }));
  };
  useEffect(() => {
    makeRequest
      .get("/")
      .then((res) => {
        const personnelID = res.data.personnel_ID;
        console.log("COA REPORTS -This is the personnel_ID: " + personnelID);
        // Set the personnelID in the state
        setFormData((prevData) => ({ ...prevData, personnelID }));
      })
      .catch((error) => {
        console.error("Error fetching User_ID:", error);
      });
  }, []);

  return (
    <div className="h-auto mt-2 p-1 px-5">
      <h1 className="text-3xl font-semibold font-mono text-indigo-800 mb-6 border-b-2 border-gray-300 pb-2">
        Staff COA Audit Reports
      </h1>
      <div>
        <NCOAReportsAddForm
          showForm={showForm}
          formData={formData}
          handleSubmit={handleSubmit}
          handleAddCOAReportClick={handleAddCOAReportClick}
          handleHideFormClick={handleHideFormClick}
          handleClearFormClick={handleClearFormClick}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
        />
        <NCOAReportsStaffTable currentItems={currentItems} />
        <NCOAReportsStaffPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={coaAuditReports.length}
        />
      </div>
    </div>
  );
}
