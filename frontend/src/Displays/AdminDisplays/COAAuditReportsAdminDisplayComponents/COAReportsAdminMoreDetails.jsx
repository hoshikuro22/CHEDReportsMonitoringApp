import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { makeRequest } from "../../../../axios";

export default function COAReportsAdminMoreDetails({
  isInfoModalOpen,
  selectedRowData,
  setInfoModalOpen,
  coaHistory,
}) {
  // to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "None";
    }
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <div>
      {isInfoModalOpen && selectedRowData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-4 font-mono">
              COA Audit Report History
            </h2>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-1 py-2">Reference</th>
                  <th className="px-1 py-2">Date Created</th>
                  <th className="px-1 py-2">Details</th>
                  <th className="px-1 py-2">Date Received</th>
                  <th className="px-1 py-2">Document Source</th>
                  <th className="px-1 py-2">Compliance Status</th>
                  <th className="px-1 py-2">Remarks</th>
                  <th className="px-1 py-2">Personnel</th>
                  <th className="px-1 py-2">Date Actioned</th>
                </tr>
              </thead>

              <tbody>
                {coaHistory.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-1 py-2 text-center">
                      {item.reference}
                    </td>
                    <td className="border px-1 py-2 text-center">
                      {item.date_created}
                    </td>
                    <td className="border px-1 py-2 text-center">
                      {item.details}
                    </td>
                    <td className="border px-1 py-2 text-center">
                      {item.date_received}
                    </td>
                    <td className="border px-1 py-2 text-center">
                      <FileLink item={item} />
                    </td>
                    <td className="border px-1 py-2 text-center">
                      {item.compliance_status}
                    </td>
                    <td className="border px-1 py-2 text-center">
                      {item.remarks}
                    </td>
                    <td className="border px-1 py-2 text-center">
                      {item.personnel_name}
                    </td>
                    <td className="border px-3 py-2 text-left">
                      {formatDate(item.date_actioned)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button
                className="flex ml-auto mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                onClick={() => setInfoModalOpen(false)}
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
COAReportsAdminMoreDetails.propTypes = {
  isInfoModalOpen: PropTypes.bool,
  selectedRowData: PropTypes.object,
  setInfoModalOpen: PropTypes.func,
  coaHistory: PropTypes.array,
};

const FileLink = ({ item }) => {
  const [fileUrl, setFileUrl] = useState(`coaauditreportfiles/${item.file}`);

  useEffect(() => {
    const checkFile = async () => {
      try {
        const response = await makeRequest.get(fileUrl);

        if (response.ok) {
          const updatedFileUrl = `coaauditreportfiles/${item.file}`;
          setFileUrl(updatedFileUrl);
        }
      } catch (error) {
        console.error("Error fetching file:", error);
        const updatedFileUrl = `coaauditreporthistoryfiles/${item.file}`;
        setFileUrl(updatedFileUrl);
      }
    };

    checkFile();
  }, [item.file]);
  return (
    <a
      href={makeRequest.defaults.baseURL + fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {item.file}
    </a>
  );
};

FileLink.propTypes = {
  item: PropTypes.object,
};
