import PropTypes from "prop-types";

export default function NCOAReportsEditForm({
  editFileFormData,
  handleEditFileSubmit,
  handleCloseEditForm,
  handleChange,
  handleFileChange,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 z-50">
        <span className="close text-white" onClick={handleCloseEditForm}>
          &times;
        </span>
        <h2 className="text-2xl font-semibold mb-4">
          Modify Record <strong>With File</strong>
        </h2>
        <form
          onSubmit={handleEditFileSubmit}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">COA REPORT ID:</label>
            <label className="font-semibold text-1xl ml-3">
              #{editFileFormData.coa_report_id}
            </label>
          </div>

          <div className="flex flex-col ">
            <label className="mb-1 text-sm font-bold  ">
              Add File <strong>(PDF ONLY)</strong>{" "}
            </label>
            <input
              accept=".pdf"
              required
              type="file"
              name="file"
              onChange={handleFileChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Reference</label>
            <input
              type="text"
              id="reference"
              name="reference"
              placeholder="Enter Reference"
              value={editFileFormData.reference}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Date Created</label>
            <input
              disabled
              type="text"
              id="date_created"
              name="date_created"
              placeholder="Enter date_created"
              value={editFileFormData.date_created  }
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Details</label>
            <input
              type="text"
              id="details"
              name="details"
              placeholder="Enter Details"
              value={editFileFormData.details}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Date Received</label>
            <input
              disabled
              type="text"
              id="date_received"
              name="date_received"
              placeholder="Enter date_received"
              value={editFileFormData.date_received}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-gray-500"
            />
          </div>
         
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Compliance Status</label>
            <select
              name="compliance_status"
              value={editFileFormData.compliance_status}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
            >
              <option value="Not Actioned">Not Actioned</option>
              <option value="Actioned">Actioned</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Remarks</label>
            <input
              type="text"
              id="remarks"
              name="remarks"
              placeholder="Enter Remarks"
              value={editFileFormData.remarks}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
            />
          </div>

          <div className="hidden flex-col">
            <label className="mb-1 text-sm font-semibold">Personnel ID</label>
            <input
              type="text"
              id="personnel_ID"
              name="personnel_ID"
              placeholder="Enter Personnel ID"
              value={editFileFormData.personnel_ID}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
            />
          </div>


          <div className="col-span-2 ml-auto gap-">
            <button
              type="submit"
              className="w-40 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCloseEditForm}
              className="w-40 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300 mx-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

NCOAReportsEditForm.propTypes = {
  editFileFormData: PropTypes.shape({
    coa_report_id: PropTypes.string,
    reference: PropTypes.string, 
    date_created: PropTypes.string,
    details: PropTypes.string, 
    date_received: PropTypes.string,
    compliance_status: PropTypes.string, 
    remarks: PropTypes.string,
    personnel_ID: PropTypes.number, 
  }).isRequired,

  handleEditFileSubmit: PropTypes.func.isRequired,
  handleCloseEditForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
};  