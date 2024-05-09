

import PropTypes from "prop-types";
import { PiListMagnifyingGlass } from "react-icons/pi";


export default function ReportsAdminTable({
  currentItems,
  handleReportListClick,
 
}) {
 


  return (
    <div className="h-auto mt-2 p-1 ml-5">
    <table className="min-w-full leading-normal">
      <thead className="bg-gray-200 sticky top-0">
        <tr className="bg-gray-400 ">
          <th className="px-1 py-2">Report Name</th>
          <th className="px-1 py-2">Type</th>
          <th className="px-1 py-2">Requesting Agency</th>
          <th className="px-1 py-2">Expected Frequency</th>
          <th className="px-1 py-2">Submission Date</th>
          <th className="px-1 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map(report => (
          <tr key={report.report_ID} className="hover:bg-gray-100">
            <td className="border px-3 py-2 text-left">{report.report_name}</td>
            <td className="border px-3 py-2 text-left">{report.report_type}</td>
            <td className="border px-3 py-2 text-left">{report.agency_name}</td>
            <td className="border px-3 py-2 text-left">{report.expected_frequency}</td>
            <td className="border px-3 py-2 text-left">{report.submission_date}</td>
            <td className="border px-3 py-2 text-left">
            <button
                    title="More Details"
                    className="text-gray-500 hover:text-gray-800 font-bold"
                    onClick={() => handleReportListClick(report.report_ID)}
                  >
                    <PiListMagnifyingGlass size="35px" />
                    <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
                  </button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
ReportsAdminTable.propTypes = {
  currentItems: PropTypes.array.isRequired,
  handleReportListClick: PropTypes.func.isRequired,

};