import { useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";

export default function COAReportsAddForm() {
  const [formData, setFormData] = useState({
    coareportID: "COAReport2024000",
    reference: "",
    dateCreated: "",
    details: "",
    date_received: "",
    compliance_status: "",
    file: "",
    remarks: "",
    personnelID: "",
  });
  console.log("the formData " + JSON.stringify(formData));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
      date_received: "",
      compliance_status: "",
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
            {/* <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4"> */}
            <form className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  COA Report Name
                </label>
                <input
                  required
                  type="text"
                  id="reportName"
                  name="reportName"
                  placeholder="Enter Report Name"
                  value={formData.reportName}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                 Date Created
                </label>
                <input
                  required
                  type="text"
                  id="reportName"
                  name="reportName"
                  placeholder="Enter Report Name"
                  value={formData.reportName}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Details</label>
                <input
                  required
                  type="text"
                  id="reportName"
                  name="reportName"
                  placeholder="Enter Report Name"
                  value={formData.reportName}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Date Received</label>
                <input
                  required
                  type="text"
                  id="reportName"
                  name="reportName"
                  placeholder="Enter Report Name"
                  value={formData.reportName}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Compliance Status
                </label>
                <input
                  required
                  type="text"
                  id="reportName"
                  name="reportName"
                  placeholder="Enter Report Name"
                  value={formData.reportName}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">File</label>
                <input
                  required
                  type="text"
                  id="reportName"
                  name="reportName"
                  placeholder="Enter Report Name"
                  value={formData.reportName}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Remarks</label>
                <input
                  required
                  type="text"
                  id="reportName"
                  name="reportName"
                  placeholder="Enter Report Name"
                  value={formData.reportName}
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
