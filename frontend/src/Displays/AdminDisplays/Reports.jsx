import { useState, useEffect } from "react";
import ReportsAdminAddForm from "./ReportsAdminDisplayComponents/ReportsAdminAddForm";
import ReportsAdminTable from "./ReportsAdminDisplayComponents/ReportsAdminTable";
import { makeRequest } from "../../../axios";
import ReportsAdminPagination from "./ReportsAdminDisplayComponents/ReportsAdminPagination";
import ReportsAdminViewList from "./ReportsAdminDisplayComponents/ReportsAdminViewList";
import ReportsAdminAddList from "./ReportsAdminDisplayComponents/ReportsAdminAddList";

export default function Reports() {
  //ADD FORM FUNCTIONS FOR REPORT TABLE
  const [formData, setFormData] = useState({
    reportID: "",
    typeOfReport: "",
    agency: "",
    expected_frequency: "",
    submission_date: "",
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

  // const getMaxReportID = () => {
  //   if (reports.length === 0) {
  //     return 1;
  //   }
  //   const maxReportID = Math.max(
  //     ...reports.map((report) => parseInt(report.report_ID))
  //   );
  //   return maxReportID + 1;
  // };

  // pang add data sa database if eclick ang submit//

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
      // const reportID = getMaxReportID();

      const response = await makeRequest.post("/addReport", {
        // reportID: reportID,
        typeOfReport: formData.typeOfReport,
        agency: formData.agency,
        expected_frequency: formData.expected_frequency,
        submission_date: formData.submission_date,
      });

      if (response.data.Status === "Success") {
        alert("Report added successfully!");
        setFormData({
          reportID: "",
          typeOfReport: "",
          agency: "",
          expected_frequency: "",
          submission_date: "",
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
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reports.slice(indexOfFirstItem, indexOfLastItem);

  const handleHideFormClick = () => {
    setShowForm(false);
    setReportAddListModalOpen(false);
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
      reportID: "",
      typeOfReport: "",
      agency: "",
      expected_frequency: "",
      submission_date: "",
    }));
  };
  // for view list / details
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [reportList, setReportList] = useState([]);
  const [typeOfReport, setTypeOfReport] = useState("");
  const [reportID, setReportID] = useState("");
  const [isReportViewListModalOpen, setReportViewListModalOpen] =
    useState(false);

  const fetchReportList = async (report_ID) => {
  try {
    const response = await makeRequest.get(`/getReports/${report_ID}`);
    console.log("API Response:", response.data);

    if (response.data.length > 0) {
      setReportList(response.data.filter(item => item.list_report_ID !== null)); // Filter out entries where list_report_ID is null
      setTypeOfReport(response.data[0]?.type_of_report);
      console.log("report id: " + response.data[0]?.report_ID);
      setReportID(response.data[0]?.report_ID);
    } else {
      setReportList([]); // Clear previous report list if no data is returned
      setTypeOfReport("");
      setReportID(report_ID); // Ensure reportID is set even if no data
    }
  } catch (error) {
    console.error("Error fetching report list:", error);
    setReportList([]); // Clear previous report list in case of error
    setTypeOfReport("");
    setReportID(report_ID); // Ensure reportID is set in case of error
  }
};

  const handleReportListClick = (report_ID) => {
    setReportID(report_ID);
    // Find the selected row data based on the doc_id

    const selectedRow = reports.find(
      (report) => report.report_ID === report_ID
    );
    if (selectedRow) {
      setSelectedRowData(selectedRow);
      setReportViewListModalOpen(true);
      fetchReportList(report_ID); // Fetch document history when the modal opens
      setReportID(report_ID);
    }
  };
  //======================!!!======================//
  //     For ADD FORM FOR Report list / details    //
  //======================!!!======================//
  const [isReportAddListModalOpen, setReportAddListModalOpen] = useState(false);

  const handleAddReportListClick = () => {
    setReportAddListModalOpen(true);
    setLORFormData((prevData) => ({
      ...prevData,
      reportID: reportID,
    }));
  };
  //below all functions for the add

  const [LORformData, setLORFormData] = useState({
    // listreportID: "",
    reportID: reportID,
    remarks: "",
    dateSubmitted: new Date(),
    file: null,
    personnelID: "",
  });
  console.log(
    "the LORformData UseState of List of Reports" + JSON.stringify(LORformData)
  );
  // const [listOfReports, setListOfReports] = useState([]);

  // to fetch
  // useEffect(() => {
  //   fetchCOAAuditReports();
  // }, []);

  // const fetchCOAAuditReports = async () => {
  //   try {
  //     const response = await makeRequest.get("/getCOAAuditReports");
  //     console.log(response.data); // to check the fetched data
  //     const sortedCOAAuditReports = response.data.sort();
  //     setCOAAuditReports(sortedCOAAuditReports);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("An error occurred while fetching COA Audit Reports.");
  //   }
  // };

  const handleLORSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to add this record ?"
    );

    if (!userConfirmed) {
      // User clicked 'Cancel' in the confirmation dialog
      alert("Record not added.");
      return;
    }
    try {
      const formattedDateSubmitted =
        LORformData.dateSubmitted.toLocaleDateString();
      const LORformDataToSend = new FormData();

      // Append form data including the file
      LORformDataToSend.append("reportID", LORformData.reportID);
      LORformDataToSend.append("remarks", LORformData.remarks);
      LORformDataToSend.append("dateSubmitted", formattedDateSubmitted);
      LORformDataToSend.append("file", LORformData.file);
      LORformDataToSend.append("personnelID", LORformData.personnelID);

      console.log(
        "the formData to send(List of Report) " +
          JSON.stringify(LORformDataToSend)
      );
      const response = await makeRequest.post(
        "/addListOfReport",
        LORformDataToSend
      );

      if (response.data.Status === "Success") {
        alert("List of Report added successfully!");
        setLORFormData((prevData) => ({
          // listreportID: "",
          ...prevData,
          reportID: "",
          remarks: "",
          dateSubmitted: new Date(),
          file: null,
          personnelID: "",
        }));
        fetchReports();
        setReportAddListModalOpen(false);
      } else {
        alert("Error adding List of Report. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the List of Report.");
    }
  };

  const handleLORChange = (e) => {
    const { name, value } = e.target;
    setLORFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLORFileChange = (e) => {
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
        setLORFormData((prevData) => ({
          ...prevData,
          file: selectedFile,
        }));
      } else {
        // File exceeds the size limit or is not a PDF
        setLORFormData((prevData) => ({
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

  useEffect(() => {
    makeRequest
      .get("/")
      .then((res) => {
        const personnelID = res.data.personnel_ID;
        console.log("REPORTS -This is the personnel_ID: " + personnelID);
        // Set the personnelID in the state
        setLORFormData((prevData) => ({ ...prevData, personnelID }));
      })
      .catch((error) => {
        console.error("Error fetching User_ID:", error);
      });
  }, []);

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
          itemsPerPage={itemsPerPage}
          totalItems={reports.length}
        />

        <ReportsAdminViewList
          isReportViewListModalOpen={isReportViewListModalOpen}
          setReportViewListModalOpen={setReportViewListModalOpen}
          selectedRowData={selectedRowData}
          reportList={reportList}
          handleAddReportListClick={handleAddReportListClick}
          typeOfReport={typeOfReport}
          reportID={reportID}
        />
        <ReportsAdminAddList
          isReportAddListModalOpen={isReportAddListModalOpen}
          setReportAddListModalOpen={setReportAddListModalOpen}
          handleHideFormClick={handleHideFormClick}
          handleClearFormClick={handleClearFormClick}
          typeOfReport={typeOfReport}
          reportID={reportID}
          handleLORSubmit={handleLORSubmit}
          handleLORChange={handleLORChange}
          handleLORFileChange={handleLORFileChange}
          LORformData={LORformData}
        />
      </div>
    </div>
  );
}
