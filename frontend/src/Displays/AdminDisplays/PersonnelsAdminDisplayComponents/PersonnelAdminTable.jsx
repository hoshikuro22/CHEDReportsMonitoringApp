import PropTypes from 'prop-types';
// import { MdEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";

export default function PersonnelAdminTable({ 
    personnels,
    // handleDeleteClick,
    // handleEditClick, 
    currentPage,
    itemsPerPage }) {
    const indexOfLastPersonnel = currentPage * itemsPerPage;
    const indexOfFirstPersonnel = indexOfLastPersonnel - itemsPerPage;
    const currentPersonnels = personnels.slice(indexOfFirstPersonnel, indexOfLastPersonnel);
  
  return (
    <div className='relative'> 
    <table className="min-w-full leading-normal">
    <thead className="bg-gray-200 sticky top-0">
        <tr className="bg-gray-200">
          {/* <th className="px-4 py-2">Personnel ID</th> */}
          <th className="px-3 py-2">Full Name</th>
          <th className="px-3 py-2">Postion</th>
          <th className="px-3 py-2">Username</th>
          <th className="px-3 py-2">Password</th>
          {/* <th className="px-3 py-2">Action</th> */}
        </tr>
      </thead>
      <tbody>
        {currentPersonnels.map((personnel) => (
          <tr key={personnel.personnel_ID} className='hover:bg-gray-100'>
            {/* <td className="border px-4 py-2 text-center">{personnel.Personnel_ID}</td> */}
            <td className="border px-4 py-2 text-left">{personnel.Full_Name}</td>
            <td className="border px-4 py-2 text-left">{personnel.Position}</td>
            <td className="border px-4 py-2 text-left">{personnel.Username}</td>
            <td className="border px-4 py-2 text-left">***</td>
            {/* <td className="border px-4 py-2 text-left flex">
              <button
               title="Modify"
               className="text-blue-500 hover:text-blue-800 ml-2 font-bold"
               onClick={() =>  handleEditClick(personnel.Personnel_ID)}
             >
               <MdEdit size='35px'/>
               <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
              </button>
              <button
                title="Delete"
                className="text-red-500 hover:text-red-800 ml-2 font-bold"
                onClick={() => handleDeleteClick(personnel.Personnel_ID)}
              >
                <MdDelete size='35px'/>
                <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
              </button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
PersonnelAdminTable.propTypes = {
    personnels: PropTypes.array.isRequired,
    handleDeleteClick: PropTypes.func.isRequired,
    handleEditClick: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
  };