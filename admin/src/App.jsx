import React, { useContext } from "react";
import Login from "./pages/Login.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointment from "./pages/Admin/AllAppointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* admin routes */}
          <Route path="/" element={<div></div>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointment />} />
          <Route path="/add-doctors" element={<AddDoctor />} />
          <Route path="/doctors-list" element={<DoctorList />} />

          {/* doctor routes */}
          <Route path="/doctors-dashboard" element={<DoctorDashboard />} />
          <Route
            path="/doctors-appointments"
            element={<DoctorAppointments />}
          />
          <Route path="/doctors-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
