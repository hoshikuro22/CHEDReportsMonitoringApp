import PropTypes from "prop-types";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";

export default function PersonnelAdminAddForm({
  formData,
  showForm,
  handleSubmit,
  handleChange,
  handleHideFormClick,
  handleClearFormClick,
  handleAddPersonnelClick,
}) {
  return (
    <div>
      {showForm ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-2">Add New PERSONNEL</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Personnel Type</label>
                <input
                  // required
                  type="text"
                  id="personnelType"
                  name="personnelType"
                  placeholder="Enter Personnel Type"
                  value={formData.personnelType}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Full Name</label>
                <input
                  required
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter First Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
                />
              </div>
             
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Position</label>
                <input
                  // required
                  type="text"
                  id="Position"
                  name="Position"
                  placeholder="Enter Position"
                  value={formData.Position}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Username</label>
                <input
                  // required
                  type="text"
                  id="Username"
                  name="Username"
                  placeholder="Enter Username"
                  value={formData.Username}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Password</label>
                <input
                  // required
                  type="password"
                  id="Password"
                  name="Password"
                  placeholder="Enter Password"
                  value={formData.Password}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
                />
              </div>
     
              <div className="col-span-2 ml-auto gap-">
                <div className="flex">
                  <button
                    type="submit"
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    <IoMdAdd size="25px" /> ADD
                  </button>
                  <button
                    type="button"
                    onClick={handleHideFormClick}
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
                  >
                    <IoMdClose size="25px" /> CLOSE
                  </button>
                  <button
                    type="button"
                    onClick={handleClearFormClick}
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
                  >
                    <CiEraser size="25px" /> CLEAR
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddPersonnelClick}
          className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mb-2 flex gap-2"
        >
          <IoMdAdd size="25px" /> Add New Personnel
        </button>
      )}
    </div>
  );
}
PersonnelAdminAddForm.propTypes = {
  formData: PropTypes.shape({
    personnelType: PropTypes.string,
    fullName: PropTypes.string,
    Position: PropTypes.string,
    Username: PropTypes.string,
    Password: PropTypes.string,
    
  }),
  showForm: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleHideFormClick: PropTypes.func.isRequired,
  handleClearFormClick: PropTypes.func.isRequired,
  handleAddPersonnelClick: PropTypes.func.isRequired,
};