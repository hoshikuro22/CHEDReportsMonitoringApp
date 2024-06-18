import { useState, useEffect } from "react";

import COAReportsAddForm from "./COAAuditReportsAdminDisplayComponents/COAReportsAddForm";
import COAReportsAdminTable from "./COAAuditReportsAdminDisplayComponents/COAReportsAdminTable";
import { makeRequest } from "../../../axios";
import COAReportsAdminPagination from "./COAAuditReportsAdminDisplayComponents/COAReportsAdminPagination";
import COAReportsEditForm from "./COAAuditReportsAdminDisplayComponents/COAReportsEditForm";
import COAReportsAdminMoreDetails from "./COAAuditReportsAdminDisplayComponents/COAReportsAdminMoreDetails";

export default function COAAuditReports() {
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
// to fetch the current personnel's ID
  useEffect(() => {
    makeRequest
      .get("/")
      .then((res) => {
        const personnelID = res.data.personnel_ID;
        console.log("COA REPORTS -This is the current personnel_ID: " + personnelID);
        // Set the personnelID in the state
        setFormData((prevData) => ({ ...prevData, personnelID }));
      })
      .catch((error) => {
        console.error("Error fetching personnel_ID:", error);
      });
  }, []);

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
  //       parseInt(coaauditreport.coa_report_id)
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

      setEditFileFormData((prevData) => ({
        ...prevData,
        file: selectedFile,
      }));
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


  //===== Edit WITH/FOR FILE =====// - BELOW
  const [showEditFileForm, setShowEditFileForm] = useState(false);
  const [editFileFormData, setEditFileFormData] = useState({
    coa_report_id: "",
    reference: "",
    dateCreated: new Date(),
    details: "",
    dateReceived: new Date(),
    complianceStatus: "",
    file: null,
    remarks: "",
    personnelID: "",
  });
  console.log("the EditFileformData " + JSON.stringify(editFileFormData));

  const handleEditFileClick = (coa_report_id) => {
    const selectedRow = coaAuditReports.find(
      (coaAuditReport) => coaAuditReport.coa_report_id === coa_report_id
    );
    if (selectedRow) {
      console.log("Selected Row Data to edit:", selectedRow);
      selectedRow.coa_report_id = String(selectedRow.coa_report_id);
      setEditFileFormData({
        ...selectedRow,
        file: selectedRow.file ? new File([], selectedRow.file.name) : null,
      });
      setShowEditFileForm(true);
    }
  };

  // the "save form function of edit modal"
  const handleEditFileSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to save changes?"
    );

    if (!userConfirmed) {
      // User clicked 'Cancel' in the confirmation dialog
      alert("Changes not saved.");
      return;
    }

    try {
      // Create a new FormData object
      const formDataToSend = new FormData();
      const formattedDateCreated = formData.dateCreated.toLocaleDateString();
      const formattedDateReceived = formData.dateReceived.toLocaleDateString();

      // Append the non-file data to formDataToSend
      formDataToSend.append("coa_report_id", editFileFormData.coa_report_id);
      formDataToSend.append("reference", editFileFormData.reference);
      formDataToSend.append("date_created", formattedDateCreated);
      formDataToSend.append("details", editFileFormData.details);
      formDataToSend.append("date_received", formattedDateReceived);
      formDataToSend.append(
        "compliance_status",
        editFileFormData.compliance_status
      );
      formDataToSend.append("remarks", editFileFormData.remarks);
      formDataToSend.append("personnel_ID", editFileFormData.personnel_ID);

      // Append the file if it exists
      if (editFileFormData.file && editFileFormData.file instanceof File) {
        formDataToSend.append("file", editFileFormData.file);
      }

      // Make the API call to update the COA Audit Report details
      const response = await makeRequest.put(
        `/updateCOAReportFile/${editFileFormData.coa_report_id}`,
        formDataToSend
      );

      if (response.data.Status === "Success") {
        alert("COA Audit Reports edited successfully!");
        setShowEditFileForm(false);
        fetchCOAAuditReports(); // Refresh the COA Audit Report list
      } else {
        alert("Error editing COA Audit Reports. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while editing the COA Audit Report.");
    }
  };

  //EDIT WITH/FOR FILE ABOVE

  // for more details
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [coaHistory, setCOAHistory] = useState([]);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  const fetchCOAHistory = async (coa_report_id) => {
    try {
      const response = await makeRequest.get(
        `/getCOAAuditReportHistory/${coa_report_id}`
      );
      console.log("API Response:", response.data);
      setCOAHistory(response.data);
    } catch (error) {
      console.error("Error fetching document history:", error);
    }
  };

  const handleInfoClick = (coa_report_id) => {
    // Find the selected row data based on the doc_id
    const selectedRow = coaAuditReports.find(
      (coaAuditReports) => coaAuditReports.coa_report_id === coa_report_id
    );
    if (selectedRow) {
      setSelectedRowData(selectedRow);
      setInfoModalOpen(true);
      fetchCOAHistory(coa_report_id); // Fetch document history when the modal opens
    }
  };

  return (
    <div className="h-auto mt-2 p-1 px-5">
      <h1 className="text-3xl font-semibold font-mono text-indigo-800 mb-6 border-b-2 border-gray-300 pb-2">
        COA Audit Reports
      </h1>
      <div>
        <COAReportsAddForm
          showForm={showForm}
          formData={formData}
          handleSubmit={handleSubmit}
          handleAddCOAReportClick={handleAddCOAReportClick}
          handleHideFormClick={handleHideFormClick}
          handleClearFormClick={handleClearFormClick}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
        />
        <COAReportsAdminTable
          currentItems={currentItems}
          handleEditFileClick={handleEditFileClick}
          handleInfoClick={handleInfoClick}
        />

        <COAReportsAdminPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={coaAuditReports.length}
        />

        {/* Edit (file) Modal  Form */}
        {showEditFileForm && (
          <COAReportsEditForm
            editFileFormData={editFileFormData}
            handleEditFileSubmit={handleEditFileSubmit}
            handleCloseEditForm={() => setShowEditFileForm(false)}
            handleChange={(e) =>
              setEditFileFormData({
                ...editFileFormData,
                [e.target.name]: e.target.value,
              })
            }
            handleFileChange={handleFileChange}
          />
        )}

        <COAReportsAdminMoreDetails
          isInfoModalOpen={isInfoModalOpen}
          selectedRowData={selectedRowData}
          setInfoModalOpen={setInfoModalOpen}
          coaHistory={coaHistory}
        />
      </div>
    </div>
  );
}
