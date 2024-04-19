
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Admin from './pages/Admin'


function App() {
  
  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}/>
      {/* <Route path="/" element={<Layout/>}/> */}
      <Route path="/dashboard" element={<Admin/>}/>

    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
