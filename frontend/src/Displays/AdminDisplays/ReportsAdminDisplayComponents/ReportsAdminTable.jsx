

export default function ReportsAdminTable() {
  return (
    <div className="h-auto mt-2 p-1 ml-5">
   
    <table className="min-w-full leading-normal">
      <thead className="bg-gray-200 sticky top-0">
        <tr className="bg-gray-400 ">
          <th className="px-1 py-2">Report Name</th>
          <th className="px-1 py-2">Type</th>
          <th className="px-1 py-2">Deadline</th>
          <th className="px-1 py-2">Unit</th>
          <th className="px-1 py-2">Status</th>
          <th className="px-1 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-100">
          <td className="border px-3 py-2 text-left"> Me</td>
          <td className="border px-3 py-2 text-left"> Me</td> 
          <td className="border px-3 py-2 text-left"> Me</td>
          <td className="border px-3 py-2 text-left"> Me</td>
          <td className="border px-3 py-2 text-left"> Me</td>
          <td className="border px-3 py-2 text-left"> Me</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}
