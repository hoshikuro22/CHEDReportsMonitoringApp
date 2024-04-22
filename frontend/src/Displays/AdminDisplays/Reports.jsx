// import { useState, useEffect } from "react";
import ReportsAdminAddForm from "./ReportsAdminDisplayComponents/ReportsAdminAddForm";
import ReportsAdminTable from "./ReportsAdminDisplayComponents/ReportsAdminTable";
// import { makeRequest } from "../../../axios";

export default function Reports() {
  // const [documents, setDocuments] = useState([]);
  // const currentItems = documents.slice(indexOfFirstItem, indexOfLastItem);
  //   // to fetch
  //   useEffect(() => {
  //     fetchDocuments();
  //   }, []);

  //   const fetchDocuments = async () => {
  //     try {
  //       // Fetch the documents
  //       const response = await makeRequest.get("/getDocuments");
  //       console.log(response.data); // to check the fetched data

  //       const sortedDocuments = response.data.sort();
  //       setDocuments(sortedDocuments);

  //       // Update maxDocIDShown after fetching documents
  //       await getMaxDocIDShown();
  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert("An error occurred while fetching documents.");
  //     }
  //   };
  return (
    <div className="h-auto mt-2 p-1 px-5">
      <h1 className="text-3xl font-semibold font-mono text-indigo-800 mb-6 border-b-2 border-gray-300 pb-2">
        Reports
      </h1>
     <div>
      <ReportsAdminAddForm />
      <ReportsAdminTable />
      </div>
    </div>
  );
}
