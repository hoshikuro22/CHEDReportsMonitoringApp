  import PropTypes from "prop-types";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";

  import { IoMdAdd, IoMdClose } from "react-icons/io";
  import {CiEraser} from "react-icons/ci";


  export default function COAReportsAddForm(
    {
      handleSubmit,
      showForm,
      formData,
      handleChange,
      handleFileChange,
      handleHideFormClick,
      handleClearFormClick,
      handleAddCOAReportClick

    }){
    
    return (
      <div>
        {showForm ? (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            <div className="bg-white rounded-lg p-8 z-50">
              <h2 className="text-xl font-semibold mb-2">Add New COA Report</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">Reference</label>
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

                <div className="hidden flex-col">
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
                    Report File <strong>(PDF ONLY)</strong>
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
                    
                    type="text"
                    id="remarks"
                    name="remarks"
                    placeholder="Enter Remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <div className="hidden flex-col">
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
            className="w-auto px-4 py-2 text-white bg-sky-950 rounded-md hover:bg-sky-700 transition duration-300 mb-2 flex gap-2 font-medium "
          >
            <IoMdAdd size="25px" /> Add New COA Report
          </button>
        )}
      </div>
    );
  }
  COAReportsAddForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired, // Function to handle form submission
    showForm: PropTypes.bool.isRequired, // Boolean indicating whether to show the form or not
    formData: PropTypes.shape({
      reference: PropTypes.string.isRequired, // Reference for the COA report
      dateCreated: PropTypes.instanceOf(Date).isRequired, // Date the report was created
      details: PropTypes.string.isRequired, // Details of the report
      dateReceived: PropTypes.instanceOf(Date).isRequired, // Date the report was received
      complianceStatus: PropTypes.string.isRequired, // Compliance status of the report
      file: PropTypes.object,// File object representing the report file (PDF)
      remarks: PropTypes.string.isRequired, // Remarks for the report
      personnelID: PropTypes.number.isRequired, // Personnel ID associated with the report
    }), // Object containing form data
    handleChange: PropTypes.func.isRequired, // Function to handle form input changes
    handleFileChange: PropTypes.func.isRequired, // Function to handle file input changes
    handleHideFormClick: PropTypes.func.isRequired, // Function to handle hiding the form
    handleClearFormClick: PropTypes.func.isRequired, // Function to handle clearing the form
    handleAddCOAReportClick: PropTypes.func.isRequired, // Function to handle adding new COA report
  };
