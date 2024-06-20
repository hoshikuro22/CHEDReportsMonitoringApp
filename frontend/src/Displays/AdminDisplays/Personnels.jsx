import { useState, useEffect } from "react";

import PersonnelAdminTable from "./PersonnelsAdminDisplayComponents/PersonnelAdminTable";
import { makeRequest } from "../../../axios";
import PersonnelAdminAddForm from "./PersonnelsAdminDisplayComponents/PersonnelAdminAddForm";
import PersonnelAdminPagination from "./PersonnelsAdminDisplayComponents/PersonnelAdminPagination";

export default function Personnels() {
  const [formData, setFormData] = useState({
    personnelType: "",
    fullName: "",
    Position: "",
    Username: "",
    Passsord: "",
  });

  const [personnels, setPersonnels] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // function to get personnels
  useEffect(() => {
    fetchPersonnels();
  }, []);

  const fetchPersonnels = async () => {
    try {
      const response = await makeRequest.get("/getPersonnels");
      console.log(response.data); //  line to check the fetched data
      const sortedPersonnels = response.data.sort();
      setPersonnels(sortedPersonnels);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching personnels.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddPersonnelClick = () => {
    setShowForm(true);
  };

  const handleHideFormClick = () => {
    setShowForm(false);
  };

  const handleClearFormClick = () => {
    setFormData({
        personnelType: "",
        fullName: "",
        Position: "",
        Username: "",
        Passsord: "",
    });
  };

  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ask for confirmation before submitting
    const isConfirmed = window.confirm(
      "Are you sure you want to add this personnel?"
    );

    if (!isConfirmed) {
      return; // Do nothing if not confirmed
    }
    try {
      const response = await makeRequest.post("/addPersonnel", {
        ...formData,
      });

      if (response.data.Status === "Success") {
        alert("Personnel added successfully!");
        setFormData({
            personnelType: "",
            fullName: "",
            Position: "",
            Username: "",
            Password: "",
        });
        fetchPersonnels();
        setShowForm(false);
      } else {
        alert("Error adding personnel. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the personnel.");
    }
  };
   //===== Edit =====//
//    const [showEditForm, setShowEditForm] = useState(false);
//    const [editFormData, setEditFormData] = useState({
//     personnelType: "",
//     fullName: "",
//     Position: "",
//     Username: "",
//     Passsord: "",
//    });
//    console.log("the EditformData " + JSON.stringify(editFormData));
 
//    const handleEditClick = (Personnel_ID) => {
//      const selectedRow = personnels.find(
//        (personnel) => personnel.Personnel_ID === Personnel_ID
//      );
//      if (selectedRow) {
//        console.log("Selected Row Data to edit:", selectedRow);
//        setEditFormData({
//          ...selectedRow,
//        });
//        setShowEditForm(true);
//      }
//    };
 
//    // the "save form function of edit modal"
 
//    const handleEditSubmit = async (e) => {
//      e.preventDefault();
//      const userConfirmed = window.confirm(
//        "Are you sure you want to save changes?"
//      );
 
//      if (!userConfirmed) {
//        // User clicked 'Cancel' in the confirmation dialog
//        alert("Changes not saved.");
//        return;
//      }
 
//      try {
//        const response = await makeRequest.put(
//          `/updatePersonnel/${editFormData.personnel_id}`,
//          {
//            personnel_id: editFormData.personnel_id,
//            unit_ID: editFormData.unit_ID,
//            last_name: editFormData.last_name,
//            first_name: editFormData.first_name,
//            position: editFormData.position,
//            division: editFormData.division,
//            birth_date: editFormData.birth_date,
//            email: editFormData.email,
//            contact_number: editFormData.contact_number,
//          }
//        );
 
//        if (response.data.Status === "Success") {
//          alert("Personnel edited successfully!");
//          setShowEditForm(false);
//          fetchPersonnels(); // Refresh the personnels list
//        } else {
//          alert("Error editing personnel. Please try again.");
//        }
//      } catch (error) {
//        console.error("Error:", error);
//        alert("An error occurred while editing the personnel.");
//      }
//    };
 
//    const handleCloseEditForm = () => {
//      setShowEditForm(false);
//    };
 
   //====Edit====//

  return (
    <div className="h-auto mt-2 p-1 px-5">
      <h1 className="text-3xl font-semibold font-mono text-indigo-800 mb-6 border-b-2 border-gray-300 pb-2">
        Personnels
      </h1>
      <PersonnelAdminAddForm 
         formData={formData}
         showForm={showForm}
         handleSubmit={handleSubmit}
         handleChange={handleChange}
         handleHideFormClick={handleHideFormClick}
         handleClearFormClick={handleClearFormClick}
         handleAddPersonnelClick={handleAddPersonnelClick}
      />
      <PersonnelAdminTable 
          personnels={personnels}
        //   handleDeleteClick={handleDeleteClick}
        //   handleEditClick={handleEditClick}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        <PersonnelAdminPagination
         currentPage={currentPage}
         itemsPerPage={itemsPerPage}
         totalItems={personnels.length}
         setCurrentPage={setCurrentPage}
         onPageChange={setCurrentPage}
        />
    </div>
  );
}
