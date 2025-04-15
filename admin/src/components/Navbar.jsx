import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (aToken) {
      navigate("/");
      localStorage.removeItem("aToken");

      setAToken(null);
      window.location.reload();
    }
    if (dToken) {
      navigate("/");
      localStorage.removeItem("dToken");

      setDToken(null);
      window.location.reload();
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b">
      <div className="flex items-center gap-3">
        <img
          src={assets.admin_logo}
          alt="Logo"
          className="w-10 h-10 object-contain"
        />
        <p className="text-lg font-semibold text-gray-700">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </nav>
  );
};
export default Navbar;
