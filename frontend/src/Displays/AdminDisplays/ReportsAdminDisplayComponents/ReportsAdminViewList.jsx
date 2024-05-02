import PropTypes from "prop-types";
// import { useEffect, useState } from "react";

export default function ReportsAdminViewList({
  isReportListModalOpen,
  selectedRowData,
  setReportListModalOpen,
  reportList,
}) {
  return (
    <div>
      {isReportListModalOpen && selectedRowData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-4 font-mono">
              Report List
            </h2>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">List Report ID</th>
                  <th className="px-4 py-2">Report ID</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date Submitted</th>
                  <th className="px-4 py-2">File</th>
                </tr>
              </thead>

              <tbody>
                {reportList.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 text-center">
                      {item.list_report_ID}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.report_ID}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.status}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.date_submitted}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.file}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between">
              <button
                className="flex mt-4 px-4 py-2 text-white bg-sky-950 rounded-lg hover:bg-sky-700 transition duration-300"
             
              >
                Add 
              </button>

              <button
                className="flex mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                onClick={() => setReportListModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReportsAdminViewList.propTypes = {
  isReportListModalOpen: PropTypes.bool,
  selectedRowData: PropTypes.object,
  setReportListModalOpen: PropTypes.func,
  reportList: PropTypes.array,
};
