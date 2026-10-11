import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Flights from "./pages/Flights";
import Bus from "./pages/Buses";
import Train from "./pages/Trains";
import Metro from "./pages/Metro";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/flights" element={<Flights />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/train" element={<Train />} />
          <Route path="/metro" element={<Metro />} />
          
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
      <Footer />
    </Router>
  );
}

export default App; 