import { Link } from "react-router-dom";
import { makeRequest } from "../../../axios";
import { BiLogOut } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import CHED10LOGOPicture from "../../assets/ched10.png";
import { useEffect, useState } from "react";
import {BsFillPersonFill} from "react-icons/bs";
import { HiArrowLeftCircle, HiArrowRightCircle } from "react-icons/hi2";

export default function AdminHeader() {
  const handleLogout = () => {
    makeRequest
      .get("/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("error");
        }
      })
      .catch((err) => console.log(err));
  };

  const [FullName, setFullName] = useState("");
  const [Position, setPosition] = useState("");
  const [linksVisible, setLinksVisible] = useState(false);
  useEffect(() => {
    makeRequest
      .get("/")

      .then((res) => {
        if (res.data.Status === "Logged in") {
          setFullName(res.data.Full_Name);
          setPosition(res.data.Position)
        }
      });
  }, []);
  const location = useLocation();

  const toggleLinksVisibility = () => {
    setLinksVisible(!linksVisible);
  };

  return (
    <div className="bg-sky-950 top-0 right-0 items-center w-screen flex justify-between px-8">
      <div className="flex items-center py-4 gap-4">
        <a href="/admin/dashboard">
          <img
            className="h-[50px] w-[50px] "
            src={CHED10LOGOPicture}
            alt="Ched Logo"
          />
        </a>
        <h1 className="font-semibold text-white text-2xl  ">
          CHED 10 REPORTS MONITORING SYSTEM
        </h1>
      </div>
      <div className="flex items-center">
      <div className={`flex transition-transform ${linksVisible ? 'translate-x-0' : '-translate-x-full'}`}>
       
          {linksVisible && (
            <>
              <a
                href="/admin/reports"
                className={`text-white font-semibold py-1 px-2 rounded gap-3 ml-auto mr-10 ${
                  location.pathname === "/admin/reports"
                    ? "bg-gray-500 hover:bg-gray-700 font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                Other Reports
              </a>

              <a
                href="/admin/coaauditreports"
                className={`text-white font-semibold py-1 px-2 rounded gap-3 mr-10 ${
                  location.pathname === "/admin/coaauditreports"
                    ? "bg-gray-500 hover:bg-gray-700 font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                COA Audit Reports
              </a>

              <a
                href="/admin/dashboard"
                className={`text-white font-semibold py-1 px-2 rounded gap-3 mr-10 ${
                  location.pathname === "/admin/dashboard"
                    ? "bg-gray-500 hover:bg-gray-700 font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                Dashboard
              </a>

              <a
                href="/admin/personnels"
                className={`text-white font-semibold py-1 px-2 rounded gap-3 mr-10 ${
                  location.pathname === "/admin/personnels"
                    ? "bg-gray-500 hover:bg-gray-700 font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                Personnels
              </a>
              <a
                href="/admin/activitylog"
                className={`text-white font-semibold py-1 px-2 rounded gap-3 mr-10 ${
                  location.pathname === "/admin/activitylog"
                    ? "bg-gray-500 hover:bg-gray-700 font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                Activity Log
              </a>
            </>
          )}
             <button
            className="text-white font-semibold hover:bg-gray-700  "
            onClick={toggleLinksVisibility}
          >
            {linksVisible ? <div className="flex items-center"> Hide Links<HiArrowLeftCircle size="35px" /> </div> : <div className="flex items-center"> Show Links<HiArrowRightCircle size="35px" /> </div> }
          </button>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center">
          <a className="text-white underline flex gap-2 font-bold items-center">
          <BsFillPersonFill size="20" />
            _{FullName}_
          </a>
          <a className="text-white font-semibold">
          {Position}
          </a>
          </div>
          <Link
            to="/login"
            onClick={handleLogout}
            className="text-white px-2 rounded hover:bg-gray-700 flex gap-3"
          >
            <BiLogOut size="30px" />
          </Link>
        </div>
      </div>
    </div>
  );
}
