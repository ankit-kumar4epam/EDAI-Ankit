import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/organisms/Home";
import Cars from "./components/organisms/Cars";
import Signup from "./components/organisms/Signup";
import Login from "./components/organisms/Login";
import CarSelection from "./components/organisms/CarSelection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/car-info" element={<CarSelection />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
