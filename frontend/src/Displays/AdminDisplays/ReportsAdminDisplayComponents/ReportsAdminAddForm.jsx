import PropTypes from "prop-types";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";

export default function ReportsAdminAddForm({
  handleSubmit,
  showForm,
  formData,
  handleChange,
  handleHideFormClick,
  handleClearFormClick,
  handleAddReportClick,
}) {
  return (
    <div>
      {showForm ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-2">Add New Report</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Report Name
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
                  Report Type
                </label>
                <input
                  required
                  type="text"
                  id="reportType"
                  name="reportType"
                  placeholder="Enter Report Type"
                  value={formData.reportType}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Agency</label>
                <input
                  required
                  type="text"
                  id="agencyID"
                  name="agencyID"
                  placeholder="Enter Agency ID"
                  value={formData.agencyID}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Expected Frequency
                </label>
                <input
                  required
                  type="text"
                  id="expected_frequency"
                  name="expected_frequency"
                  placeholder="Enter Expected Frequency"
                  value={formData.expected_frequency}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Submission Date
                </label>
                <input
                  required
                  type="text"
                  id="submission_date "
                  name="submission_date"
                  placeholder="Enter Submission Date"
                  value={formData.submission_date}
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
                  placeholder="Enter Personnel ID"
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
          onClick={handleAddReportClick}
          className="w-auto px-4 py-2 text-white  bg-sky-950  rounded-lg hover:bg-sky-700 transition duration-300 mb-2 flex gap-2"
        >
          <IoMdAdd size="25px" /> Add New Report
        </button>
      )}
    </div>
  );
}
ReportsAdminAddForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired, // Function to handle form submission
  showForm: PropTypes.bool.isRequired, // Boolean indicating whether to show the form or not
  formData: PropTypes.shape({
    reportName: PropTypes.string.isRequired,
    reportType: PropTypes.string.isRequired,
    agencyID: PropTypes.string.isRequired,
    expected_frequency: PropTypes.string.isRequired,
    submission_date: PropTypes.string.isRequired,
    personnelID: PropTypes.string.isRequired,
  }),
  handleChange: PropTypes.func.isRequired, // Function to handle form input changes
  handleFileChange: PropTypes.func.isRequired, // Function to handle file input changes
  handleHideFormClick: PropTypes.func.isRequired, // Function to handle hiding the form
  handleClearFormClick: PropTypes.func.isRequired, // Function to handle clearing the form
  handleAddReportClick: PropTypes.func.isRequired, // Function to handle adding new COA report
};
