import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage';
import HomePage from './Pages/HomePage';


function App() {
  

  return (
<div>
<Routes>
<Route path='/login/*' element={<LandingPage/>} />
<Route path='/' element={<HomePage />} />  
  
</Routes>


</div>
   
  );
}

export default App
