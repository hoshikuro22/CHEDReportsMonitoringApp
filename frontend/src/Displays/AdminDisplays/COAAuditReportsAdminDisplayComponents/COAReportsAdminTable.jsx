import { useState, useEffect } from "react";
import { makeRequest } from "../../../../axios";

export default function COAReportsAdminTable() {

  const [coaauditreports, setCOAAuditReports] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    fetchCOAAuditReports();
  }, []);

  const fetchCOAAuditReports = async () => {
    try {
      const response = await makeRequest.get('/getCOAAuditReports');
      setCOAAuditReports(response.data);
    } catch (error) {
      console.error('Error fetching coa audit reports:', error);
      // Handle error state or display a message to the user
    }
  };


  return (
    <div className="h-auto mt-2 p-1 ml-5">
    <table className="min-w-full leading-normal">
      <thead className="bg-gray-200 sticky top-0">
        <tr className="bg-gray-400 ">
          <th className="px-1 py-2">Reference</th>
          <th className="px-1 py-2">Date Created</th>
          <th className="px-1 py-2">Details</th>
          <th className="px-1 py-2">Date Received</th>
          <th className="px-1 py-2">Compliance Status</th>
          <th className="px-1 py-2">File</th> 
          <th className="px-1 py-2">Remarks</th>
          <th className="px-1 py-2">Personnel</th>
        </tr>
      </thead>
      <tbody>
        {coaauditreports.map(coaauditreport => (
          <tr className="hover:bg-gray-100" key={coaauditreport.coa_report_ID}>
            <td className="border px-3 py-2 text-left">{coaauditreport.reference}</td>
            <td className="border px-3 py-2 text-left">{coaauditreport.date_created}</td>
            <td className="border px-3 py-2 text-left">{coaauditreport.details}</td>
            <td className="border px-3 py-2 text-left">{coaauditreport.date_received}</td>
            <td className="border px-3 py-2 text-left">{coaauditreport.compliance_status}</td>
            <td className="border px-3 py-2 text-left">{coaauditreport.file}</td>
            <td className="border px-3 py-2 text-left">{coaauditreport.remarks}</td>
            <td className="border px-3 py-2 text-left">{coaauditreport.personnel_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}