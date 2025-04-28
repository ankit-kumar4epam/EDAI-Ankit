import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/organisms/Home";
import Cars from "./components/organisms/Cars";
import Signup from "./components/organisms/Signup";
import Login from "./components/organisms/Login";
import CarSelection from "./components/organisms/CarSelection";
import { AuthProvider } from "./context/auth/AuthContext";
import MyBookings from "./components/organisms/MyBookings";
import { AlertProvider } from "./context/alert/AlertContext";
import { FilterProvider } from "./context/FilterContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AlertProvider>
          <FilterProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/cars/car-info" element={<CarSelection />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my-bookings" element={<MyBookings />} />
            </Routes>
          </FilterProvider>
        </AlertProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
