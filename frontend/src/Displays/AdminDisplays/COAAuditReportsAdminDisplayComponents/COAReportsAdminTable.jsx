import { useState, useEffect } from "react";
import { makeRequest } from "../../../../axios";
import PropTypes from "prop-types";

export default function COAReportsAdminTable({
  currentItems,
 
}) {


  return (
    <div className="h-auto mt-2 p-1 ml-5">
      <table className="min-w-full leading-normal">
        <thead className="bg-gray-200 sticky top-0">
          <tr className="bg-gray-400 ">
            <th className="px-1 py-2">Reference</th>
            <th className="px-1 py-2">Date Created</th>
            <th className="px-1 py-2">Details</th>
            <th className="px-1 py-2">Date Received</th>
            <th className="px-1 py-2">Document Source</th>
            <th className="px-1 py-2">Compliance Status</th>
            <th className="px-1 py-2">Remarks</th>
            <th className="px-1 py-2">Personnel</th>
            <th className="px-1 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((coaauditreport) => (
            <tr
              className="hover:bg-gray-100"
              key={coaauditreport.coa_report_ID}
            >
              <td className="border px-3 py-2 text-left">
                {coaauditreport.reference}
              </td>
              <td className="border px-3 py-2 text-left">
                {coaauditreport.date_created}
              </td>
              <td className="border px-3 py-2 text-left">
                {coaauditreport.details}
              </td>
              <td className="border px-3 py-2 text-left">
                {coaauditreport.date_received}
              </td>
              <td className="border px-4 py-2 text-left">
                <FileLink item={coaauditreport} />
              </td>
              <td className="border px-3 py-2 text-left">
                {coaauditreport.compliance_status}
              </td>
              <td className="border px-3 py-2 text-left">
                {coaauditreport.remarks}
              </td>
              <td className="border px-3 py-2 text-left">
                {coaauditreport.personnel_name}
              </td>
              <td>
                |ACTIONS|
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

COAReportsAdminTable.propTypes = {
  currentItems: PropTypes.array.isRequired,

};

const FileLink = ({ item }) => {
  const [fileUrl, setFileUrl] = useState(
    `communicationhistoryfiles/${item.file}`
  );

  useEffect(() => {
    const checkFile = async () => {
      try {
        const response = await makeRequest.get(fileUrl);

        if (!response.ok) {
          setFileUrl(`coaauditreportfiles/${item.file}`);
        }
      } catch (error) {
        console.error("Error fetching file:", error);
        setFileUrl(`coaauditreportfiles/${item.file}`);
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
