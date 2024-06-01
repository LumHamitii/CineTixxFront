import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetail from './components/MovieDetail';
import Booking from './components/Booking.tsx'
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              {({ role }) => <Admin role={role} />}
            </PrivateRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/screenings/:movieId" element={<MovieDetail/>} />
        <Route path="/booking/:screeningId" element={<Booking/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
