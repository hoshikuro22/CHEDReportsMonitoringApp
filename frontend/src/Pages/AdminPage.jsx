import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import AdminHeader from "../Components/AdminComponents/AdminHeader";
import AdminFooter from "../Components/AdminComponents/AdminFooter";
import Reports from "../Displays/AdminDisplays/Reports";
import COAAuditReports from "../Displays/AdminDisplays/COAAuditReports";
import Dashboard from "../Displays/AdminDisplays/Dashboard";

export default function AdminPage() {
    const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    makeRequest
      .get("/")

      .then((res) => {
        console.log("This is the status: " + res.data.Status);
        console.log("This is the User_ID " + res.data.User_ID);
        if (res.data.Status === "Logged in") {
          setAuth(true);
        } else {
          setAuth(false);
          setMessage(res.data.Message);
        }
      });
  }, []);

  return (
    <div className="bg-gray-100">
    <AdminHeader />
    {auth ? (
      <div className="h-auto min-h-screen ">
        <div className="h-auto">
          {/* <AdminSidebar /> */}
          <div className="h-auto ">
                <Routes>
              <Route path="/reports" element={<Reports />} />
              <Route path="/coaauditreports" element={<COAAuditReports />} />
              <Route path="/dashboard" element={<Dashboard />} />

            </Routes>

            {/* <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/adhome" element={<AdminHome />} />
              <Route path="/chedclients" element={<ChedClients />} />
              <Route path="/communications" element={<Communications />} />
              <Route path="/documenttypes" element={<DocumentTypes />} />
              <Route path="/clienttypes" element={<ClientTypes />} />
              <Route path="/activitylog" element={<ActivityLog />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/listofpersonnel" element={<ListOfPersonnels />} />
              <Route path="/addaccount" element={<AddAccount />} />
            </Routes> */}
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg text-center">
          <h3 className="text-red-500 text-2xl font-bold mb-4">{message}</h3>
          <p className="text-lg my-3">Log in now to access</p>
          <Link
            to="/login"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Login
          </Link>
        </div>
      </div>
    )}
   <AdminFooter />
  </div>
);
}
