

export default function COAReportsAdminTable() {
  return (
    <div className="h-auto mt-2 p-1 ml-5">
   
    <table className="min-w-full leading-normal">
      <thead className="bg-gray-200 sticky top-0">
        <tr className="bg-gray-400 ">
          <th className="px-1 py-2">Reference</th>
          <th className="px-1 py-2">Observations</th>
          <th className="px-1 py-2">Reccommendations</th>
          <th className="px-1 py-2">Status of Implementation</th>
          <th className="px-1 py-2">Reason for Partial/Non-Implementation</th>
          <th className="px-1 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-100">
          <td className="border px-3 py-2 text-left">ML CY 2022</td>
          <td className="border px-3 py-2 text-left">Lorem ipsum dolor</td> 
          <td className="border px-3 py-2 text-left">Lorem ipsum dolor</td>
          <td className="border px-3 py-2 text-left">Not Implemented</td>
          <td className="border px-3 py-2 text-left">Not Draft</td>
          <td className="border px-3 py-2 text-left">*actions*</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}
