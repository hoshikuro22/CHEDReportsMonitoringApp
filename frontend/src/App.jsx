import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage';
import HomePage from './Pages/HomePage';
import ErrorPage from './Pages/ErrorPage';
import AdminPage from './Pages/AdminPage';


function App() {
  

  return (
<div className='w-screen'>
<Routes>
<Route path='/login/*' element={<LandingPage/>} />
<Route path='/' element={<HomePage />} />  
<Route path='/*' element={<ErrorPage />}/>
<Route path='/admin/*' element={<AdminPage />} /> 
  
</Routes>


</div>
   
  );
}

export default App
