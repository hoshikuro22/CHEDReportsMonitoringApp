import { useState, useEffect } from "react";
import ReportsAdminAddForm from "./ReportsAdminDisplayComponents/ReportsAdminAddForm";
import ReportsAdminTable from "./ReportsAdminDisplayComponents/ReportsAdminTable";
import { makeRequest } from "../../../axios";
import ReportsAdminPagination from "./ReportsAdminDisplayComponents/ReportsAdminPagination";
import ReportsAdminViewList from "./ReportsAdminDisplayComponents/ReportsAdminViewList";
// import { makeRequest } from "../../../axios";

export default function Reports() {
  //ADD FORM FUNCTIONS
  const [formData, setFormData] = useState({
    reportID: "Report2024000",
    reportName: "",
    reportType: "",
    agencyID: "",
    expected_frequency: "",
    submission_date: "",
    personnelID: "",
  });
  console.log("the formData " + JSON.stringify(formData));

  //to fetch
  useEffect(() => {
    // Fetch data when component mounts
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await makeRequest.get("/getReports");
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      // Handle error state or display a message to the user
    }
  };

  const getMaxReportID = () => {
    if (reports.length === 0) {
      return 1;
    }
    const maxReportID = Math.max(
      ...reports.map((report) => parseInt(report.report_ID))
    );
    return maxReportID + 1;
  };

  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to add this client?"
    );

    if (!userConfirmed) {
      // User clicked 'Cancel' in the confirmation dialog
      alert("Client not added.");
      return;
    }

    try {
      const reportID = getMaxReportID();

      const response = await makeRequest.post("/addReport", {
        reportID: reportID,
        reportName: formData.reportName,
        reportType: formData.reportType,
        agencyID: formData.agencyID,
        expected_frequency: formData.expected_frequency,
        submission_date: formData.submission_date,
        personnelID: formData.personnelID,
      });

      if (response.data.Status === "Success") {
        alert("Report added successfully!");
        setFormData({
          reportID: "",
          reportName: "",
          reportType: "",
          agencyID: "",
          expected_frequency: "",
          submission_date: "",
          personnelID: "",
        });
        fetchReports();
        setShowForm(false);
      } else {
        alert("Error adding report. Please try again.(frontend)");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the report.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reports.slice(indexOfFirstItem, indexOfLastItem);

  const handleHideFormClick = () => {
    setShowForm(false);
  };

  const handleAddReportClick = () => {
    setShowForm(true);
    setFormData((prevData) => ({
      ...prevData,
    }));
  };

  const handleClearFormClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      reportID: "Report2024000",
      reportName: "",
      reportType: "",
      agencyID: "",
      expected_frequency: "",
      submission_date: "",
      personnelID: "",
    }));
  };
  // for view list / details
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [reportList, setReportList] = useState([]);
  const [isReportListModalOpen, setReportListModalOpen] = useState(false);

  const fetchReportList = async (report_ID) => {
    try {
      const response = await makeRequest.get(
        `/getReports/${report_ID}`
      );
      console.log("API Response:", response.data);
      setReportList(response.data);
    } catch (error) {
      console.error("Error fetching report list:", error);
    }
  };

  const handleReportListClick = (report_ID) => {
    // Find the selected row data based on the doc_id
    const selectedRow = reports.find(
      (report) => report.report_ID === report_ID
    );
    if (selectedRow) {
      setSelectedRowData(selectedRow);
      setReportListModalOpen(true);
      fetchReportList(report_ID); // Fetch document history when the modal opens
    }
  };

  return (
    <div className="h-auto mt-2 p-1 px-5">
      <h1 className="text-3xl font-semibold font-mono text-indigo-800 mb-6 border-b-2 border-gray-300 pb-2">
        Reports
      </h1>
      <div>
        <ReportsAdminAddForm
          showForm={showForm}
          formData={formData}
          handleSubmit={handleSubmit}
          handleAddReportClick={handleAddReportClick}
          handleHideFormClick={handleHideFormClick}
          handleClearFormClick={handleClearFormClick}
          handleChange={handleChange}
        />
        <ReportsAdminTable
          currentItems={currentItems}
          handleReportListClick={handleReportListClick}
        />

        <ReportsAdminPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          reports={reports}
          itemsPerPage={itemsPerPage}
        />

        <ReportsAdminViewList
          isReportListModalOpen={isReportListModalOpen}
          setReportListModalOpen={setReportListModalOpen}
          selectedRowData={selectedRowData}
          reportList={reportList}
        />
      </div>
    </div>
  );
}
