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
import ActivityLog from "../Displays/AdminDisplays/ActivityLog";
import Personnels from "../Displays/AdminDisplays/Personnels";

export default function AdminPage() {
    const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    makeRequest
      .get("/")

      .then((res) => {
        console.log("This is the status: " + res.data.Status);
        console.log("This is the personnel full name: " + res.data.Full_Name);
        console.log("This is the personnel_ID: " + res.data.personnel_ID);
        console.log("This is the personnel_type_ID: " + res.data.personnel_type_ID);
        if (res.data.Status === "Logged in") {
          setAuth(true);
        } else {
          setAuth(false);
          setMessage(res.data.Message);
        }
      });
  }, []);

  const [ifAdmin, setIfAdmin] = useState(false);
  useEffect(() => {
    makeRequest
      .get("/")

      .then((res) => {
        console.log("This is the personnel type: " + res.data.personne_type_ID);
        if (res.data.personnel_type_ID === 0) {
          setIfAdmin(true);
        } else {
          setIfAdmin(false);
        }
      });
  }, []);


  return (
    <div className="bg-gray-100">
      <AdminHeader />
      {auth ? (
        <div className="h-auto min-h-screen ">
          <div className="h-auto">
            {ifAdmin ? (
              <div className="h-auto ">
                <Routes>
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/coaauditreports" element={<COAAuditReports />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/activitylog" element={<ActivityLog />} />
                  <Route path="/personnels" element={<Personnels />} />
                </Routes>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-lg text-center">
                  <p className="text-lg my-3">Only admin can access here </p>
                  <Link
                    to="/login"
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
                  >
                    Go back
                  </Link>
                </div>
              </div>
            )}
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