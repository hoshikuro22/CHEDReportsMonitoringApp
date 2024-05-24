import PropTypes from "prop-types";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReportsAdminAddList({
  isReportAddListModalOpen,
  handleHideFormClick,
  handleClearFormClick,
  typeOfReport,
  reportID,
  handleLORSubmit,
  handleLORChange,
  handleLORFileChange,
  LORformData,
}) {
  return (
    <div>
      {isReportAddListModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-2">
              Add Report to {typeOfReport} List
            </h2>
            <form onSubmit={handleLORSubmit} className="grid grid-cols-2 gap-4">
             
            <div className="hidden flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Report ID
                </label>
                <input
                  required
                  type="text"
                  id="reportID"
                  name="reportID"
                  placeholder="Enter Report ID"
                  value={LORformData.reportID || reportID}
                  onChange={handleLORChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="hidden flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Personnel ID
                </label>
                <input
                  required
                  type="text"
                  id="personnelID"
                  name="personnelID"
                  placeholder="Enter Personnel ID"
                  value={LORformData.personnelID}
                  onChange={handleLORChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">
                    Date Submitted <strong>(Month/Day/Year)</strong>
                  </label>
                  <DatePicker
                    disabled
                    selected={LORformData.dateSubmitted}
                    onChange={(date) =>
                      handleLORChange({
                        target: { name: "dateSubmitted", value: date },
                      })
                    }
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    displayFormat
                  />
                </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Remarks</label>
                <input
                  required
                  type="text"
                  id="remarks"
                  name="remarks"
                  placeholder="Enter Remarks"
                  value={LORformData.remarks}
                  onChange={handleLORChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  File <strong>(PDF ONLY)</strong>
                </label>
                <input
                  accept=".pdf"
                  required
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleLORFileChange}
                  className="border"
                ></input>
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
      )}
    </div>
  );
}
ReportsAdminAddList.propTypes = {
  handleLORSubmit: PropTypes.func.isRequired,
  isReportAddListModalOpen: PropTypes.bool,
  handleHideFormClick: PropTypes.func,
  handleClearFormClick: PropTypes.func,
  typeOfReport: PropTypes.string,
  reportID: PropTypes.number,
  handleLORChange: PropTypes.func.isRequired,
  handleLORFileChange: PropTypes.func.isRequired,
  LORformData: PropTypes.shape({
    reportID: PropTypes.string,
    remarks: PropTypes.string,
    dateSubmitted: PropTypes.instanceOf(Date),
    file: PropTypes.object,
    personnelID: PropTypes.string,

  }), // Object containing form data
};
