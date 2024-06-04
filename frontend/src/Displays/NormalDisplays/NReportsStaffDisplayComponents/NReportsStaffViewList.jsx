import PropTypes from "prop-types";
import { makeRequest } from "../../../../axios";
import { useEffect, useState } from "react";

export default function NReportsStaffViewList({
  isReportViewListModalOpen,
  selectedRowData,
  setReportViewListModalOpen,
  reportList,
  handleAddReportListClick,
  typeOfReport,
  reportID,
 
}) {
  return (
    <div>
      {isReportViewListModalOpen && selectedRowData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-4 font-mono">
              List of  {"' "+typeOfReport+" '"} Reports
            </h2>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  {/* <th className="px-4 py-2">List Report ID</th>
                  <th className="px-4 py-2">Report ID</th> */}
                  <th className="px-4 py-2">Personnel</th>
                  <th className="px-4 py-2">Date Submitted</th>
                  <th className="px-4 py-2">Remarks</th>
                  <th className="px-4 py-2">File</th>
                </tr>
              </thead>

              <tbody>
                {reportList.map((item, index) => (
                  <tr key={index}>
                    {/* <td className="border px-4 py-2 text-center">
                      {item.list_report_ID}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.report_ID}
                    </td> */}
                    <td className="border px-3 py-2 text-left">
                      {item.personnel_name}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.date_submitted}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.remarks}
                    </td>
                    <td className="border px-4 py-2 text-left">
                <FileLink item={item} />
              </td>

                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between">
              <button 
              className="flex mt-4 px-4 py-2 text-white bg-sky-950 rounded-lg hover:bg-sky-700 transition duration-300"
              onClick={() => handleAddReportListClick(reportID)}
              >
                Add
              </button>

              <button
                className="flex mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                onClick={() => setReportViewListModalOpen(false)}
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

NReportsStaffViewList.propTypes = {
  isReportViewListModalOpen: PropTypes.bool,
  selectedRowData: PropTypes.object,
  setReportViewListModalOpen: PropTypes.func,
  reportList: PropTypes.array,
  handleAddReportListClick: PropTypes.func,
  typeOfReport: PropTypes.string,
  reportID: PropTypes.number,

};

const FileLink = ({ item }) => {
  const [fileUrl, setFileUrl] = useState(
    `listofreportfiles/${item.file}`
  );

  useEffect(() => {
    const checkFile = async () => {
      try {
        const response = await makeRequest.get(fileUrl);

        if ( response.ok) {
          setFileUrl(`listofreportfiles/${item.file}`);
        }
      } catch (error) {
        console.error("Error fetching file:", error);
        setFileUrl(`listofreportfiles/${item.file}`);
      }
    };

    checkFile();
  }, [item.file, fileUrl]);

  // Truncate the file name to 25 characters
  const truncatedFileName =
    item.file.length > 40 ? item.file.substring(0, 40) + "..." : item.file;

  return (
    <a
      href={makeRequest.defaults.baseURL + fileUrl} // Use baseURL from axios.js
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {truncatedFileName}
    </a>
  );
};

FileLink.propTypes = {
  item: PropTypes.object,
};
