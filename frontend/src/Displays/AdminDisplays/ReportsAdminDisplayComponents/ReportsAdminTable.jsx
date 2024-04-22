import { useEffect, useState } from "react";
import { makeRequest } from "../../../../axios";

export default function ReportsAdminTable() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await makeRequest.get('/getReports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      // Handle error state or display a message to the user
    }
  };


  return (
    <div className="h-auto mt-2 p-1 ml-5">
    <table className="min-w-full leading-normal">
      <thead className="bg-gray-200 sticky top-0">
        <tr className="bg-gray-400 ">
          <th className="px-1 py-2">Report Name</th>
          <th className="px-1 py-2">Type</th>
          <th className="px-1 py-2">Agency</th>
          <th className="px-1 py-2">Frequency</th>
          <th className="px-1 py-2">Date Submitted</th>
          <th className="px-1 py-2">Personnel</th>
          <th className="px-1 py-2">Status</th>
          <th className="px-1 py-2">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {reports.map(report => (
          <tr key={report.report_ID} className="hover:bg-gray-100">
            <td className="border px-3 py-2 text-left">{report.report_description}</td>
            <td className="border px-3 py-2 text-left">{report.report_type}</td>
            <td className="border px-3 py-2 text-left">{report.agency_name}</td>
            <td className="border px-3 py-2 text-left">{report.expected_frequency}</td>
            <td className="border px-3 py-2 text-left">{report.date_submitted}</td>
            <td className="border px-3 py-2 text-left">{report.personnel_name}</td>
            <td className="border px-3 py-2 text-left">{report.status}</td>
            <td className="border px-3 py-2 text-left">{report.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}