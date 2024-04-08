import COAReportsAdminTable from "./COAAuditReportsAdminDisplayComponents/COAReportsAdminTable";


export default function COAAuditReports() {
  return (
    <div className="h-auto mt-2 p-1 ml-5">
    <h1 className="text-3xl font-semibold font-mono text-indigo-800 mb-6 border-b-2 border-gray-300 pb-2">
     COA Audit Reports
   </h1>
 <div>
  <COAReportsAdminTable />
 </div>
</div>
  )
}