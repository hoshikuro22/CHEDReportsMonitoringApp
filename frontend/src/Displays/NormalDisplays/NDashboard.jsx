import NDashboardStaffTable from "./NDashboardStaffDisplayComponents/NDashboardStaffTable";


// import TEChart from "tw-elements-react"
export default function NDashboard() {
  return (
    <div className="h-auto mt-2 p-1 ml-5">
       <h1 className="text-3xl font-semibold font-mono text-indigo-800 mb-6 border-b-2 border-gray-300 pb-2">
          Staff Dashboard
        </h1>
   <NDashboardStaffTable />

    </div>
  );
}
