import { Link } from "react-router-dom";
import { makeRequest } from "../../../axios";
import { BiLogOut } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import CHED10LOGOPicture from "../../assets/ched10.png";

export default function NormalHeader() {
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

  const location = useLocation();

  return (
    <div className="bg-sky-950 top-0 right-0 items-center w-screen flex justify-between px-8">
      <div className="flex items-center py-4 gap-4">
        <a href="/normal/dashboard">
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
      <div className="flex">
        <a
          href="/normal/nreports"
          className={`text-white font-semibold py-1 px-2 rounded gap-3 ml-auto mr-10 ${
            location.pathname === "/normal/reports"
              ? "bg-gray-500 hover:bg-gray-700 font-bold"
              : "hover:bg-gray-700"
          }`}
        >
          Reports
        </a>

        <a
          href="/normal/ncoaauditreports"
          className={`text-white font-semibold py-1 px-2 rounded gap-3 mr-10 ${
            location.pathname === "/normal/coaauditreports"
              ? "bg-gray-500 hover:bg-gray-700 font-bold"
              : "hover:bg-gray-700"
          }`}
        >
          COA Audit Reports
        </a>

        <a
          href="/normal/ndashboard"
          className={`text-white font-semibold py-1 px-2 rounded gap-3 mr-10 ${
            location.pathname === "/normal/dashboard"
              ? "bg-gray-500 hover:bg-gray-700 font-bold"
              : "hover:bg-gray-700"
          }`}
        >
          Dashboard
        </a>

        <div className="">
          <Link
            to="/login"
            onClick={handleLogout}
            className="px-2 rounded hover:bg-gray-700 flex gap-3"
          >
            <BiLogOut size="30px" />
          </Link>
        </div>
      </div>
    </div>
  );
}
