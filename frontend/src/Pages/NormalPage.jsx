import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { makeRequest } from "../../axios"
import NormalHeader from "../Components/NormalComponents/NormalHeader"
import NCOAAuditReports from "../Displays/NormalDisplays/NCOAAuditReports"
import NReports from "../Displays/NormalDisplays/NReports"
import NormalFooter from "../Components/NormalComponents/NormalFooter"
import NDashboard from "../Displays/NormalDisplays/NDashboard"






export default function NormalPage() {
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')

  axios.defaults.withCredentials = true;
  useEffect(() => {
    makeRequest.get('/')
      .then(res => {
        console.log("This is the status: "+ res.data.Status)
        console.log("This is the personnel type: "+ res.data.personnel_type_ID)
        if (res.data.Status === "Logged in") {
          setAuth(true);
        } else {
          setAuth(false);
          setMessage(res.data.Message);
        }
      })
  }, [])

  return (
    
    <div className="bg-gray-100">
     <NormalHeader />
      {auth ?
         <div className="h-auto min-h-screen ">
   
          <div className='h-auto '>
          {/* call sidebar when /normal only */}
             
          {/* Displays */}
          <Routes >
           <Route path='nreports' element={<NReports />} />
           <Route path='ncoaauditreports' element={<NCOAAuditReports/>} />
           <Route path='ndashboard' element={<NDashboard />} />
          </Routes>
          </div>
        </div>
        :
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h3 className="text-red-500 text-2xl font-bold mb-4">{message}</h3>
            <p className="text-lg my-3">Log in now to access</p>
            <Link to="/" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">Login</Link>
          </div>
        </div>
      }
      <NormalFooter />
    </div>
  )
}