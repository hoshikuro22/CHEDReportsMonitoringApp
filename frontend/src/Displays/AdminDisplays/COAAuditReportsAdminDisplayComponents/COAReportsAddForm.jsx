import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";
import { makeRequest } from "../../../../axios";

export default function COAReportsAddForm() {
  const [formData, setFormData] = useState({
    coareportID: "COAReport2024000",
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

  const getMaxCOAReportID = () => {
    if (coaAuditReports.length === 0) {
      return 1;
    }
    const maxDocID = Math.max(
      ...coaAuditReports.map((coaauditreport) => parseInt(coaauditreport.coa_report_ID))
    );
    return maxDocID + 1;
  };

  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to add this communication?"
    );

    if (!userConfirmed) {
      // User clicked 'Cancel' in the confirmation dialog
      alert("Communication not added.");
      return;
    }
    try {
      const coareportID = getMaxCOAReportID();
      const formattedDateCreated = formData.dateCreated.toLocaleDateString();
      const formattedDateReceived = formData.dateReceived.toLocaleDateString();

      const formDataToSend = new FormData();

      // Append form data including the file
      formDataToSend.append("coareportID", coareportID);
      formDataToSend.append("reference", formData.reference);
      formDataToSend.append("dateCreated", formattedDateCreated);
      formDataToSend.append("details", formData.details);
      formDataToSend.append("dateReceived", formattedDateReceived);
      formDataToSend.append("complianceStatus", formData.complianceStatus);
      formDataToSend.append("file", formData.file);
      formDataToSend.append("remarks", formData.remarks);
      formDataToSend.append("personnelID", formData.personnelID);

      console.log("the formData to send " + JSON.stringify(formDataToSend));
      const response = await makeRequest.post("/addCOAAuditReport", formDataToSend);

      if (response.data.Status === "Success") {
        alert("COA Audit Report added successfully!");
        setFormData((prevData) => ({
          ...prevData,
          coareportID: "COAReport2024000",
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
  const [coaAuditReports, setCOAAuditReports] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
      coareportID: "COAReport2024000",
      reference: "",
      dateCreated: "",
      details: "",
      dateReceived: "",
      complianceStatus: "",
      file: "",
      remarks: "",
      personnelID: "",
    }));
  };

  return (
    <div>
      {showForm ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-2">Add New COA Report</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Reference
                </label>
                <input
                  required
                  type="text"
                  id="reference"
                  name="reference"
                  placeholder="Enter Reference"
                  value={formData.reference}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Date Created <strong>(Month/Day/Year)</strong>
                </label>
                <DatePicker
                  selected={formData.dateCreated}
                  onChange={(date) =>
                    handleChange({
                      target: { name: "dateCreated", value: date },
                    })
                  }
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  displayFormat
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Details</label>
                <input
                  required
                  type="text"
                  id="details"
                  name="details"
                  placeholder="Enter Details"
                  value={formData.details}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Date Received <strong>(Month/Day/Year)</strong>
                </label>
                <DatePicker
                  selected={formData.dateReceived}
                  onChange={(date) =>
                    handleChange({
                      target: { name: "dateReceived", value: date },
                    })
                  }
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  displayFormat
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Compliance Status
                </label>
                <input
                  required
                  type="text"
                  id="complianceStatus"
                  name="complianceStatus"
                  placeholder="Enter Compliance Status"
                  value={formData.complianceStatus}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Add File <strong>(PDF ONLY)</strong>
                </label>
                <input
                  accept=".pdf"
                  required
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                  className="border"
                ></input>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Remarks</label>
                <input
                  required
                  type="text"
                  id="remarks"
                  name="remarks"
                  placeholder="Enter Remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Personnel</label>
                <input
                  required
                  type="text"
                  id="personnelID"
                  name="personnelID"
                  placeholder="Enter personnel ID"
                  value={formData.personnelID}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex gap-4"></div>
              <div className="col-span-2 ml-auto gap-">
                <div className="flex">
                  <button
                    type="submit"
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    <IoMdAdd size="25px" /> SAVE
                  </button>
                  <button
                    type="button"
                    onClick={handleHideFormClick}
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
                  >
                    <IoMdClose size="25px" /> CLOSE
                  </button>
                  <button
                    type="button"
                    onClick={handleClearFormClick}
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
                  >
                    <CiEraser size="25px" /> CLEAR
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddCOAReportClick}
          className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mb-2 flex gap-2"
        >
          <IoMdAdd size="25px" /> Add New COA Report
        </button>
      )}
    </div>
  );
}
