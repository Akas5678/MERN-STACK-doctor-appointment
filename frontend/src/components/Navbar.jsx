import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex justify-between items-center py-4 mb-5 border-b border-b-gray-400 px-4 md:px-10">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/" className="hover:text-blue-500">
          {" "}
          <li className="py-1">Home</li>{" "}
        </NavLink>
        <NavLink to="/doctors" className="hover:text-blue-500">
          {" "}
          <li className="py-1">All Doctors</li>{" "}
        </NavLink>
        <NavLink to="/about" className="hover:text-blue-500">
          {" "}
          <li className="py-1">About</li>{" "}
        </NavLink>
        <NavLink to="/contact" className="hover:text-blue-500">
          {" "}
          <li className="py-1">Contact</li>{" "}
        </NavLink>
      </ul>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setShowMenu(!showMenu)} className="text-2xl">
          {showMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center py-5 z-50">
          <NavLink
            to="/"
            className="hover:text-blue-500"
            onClick={() => setShowMenu(false)}
          >
            {" "}
            <p className="py-2">Home</p>{" "}
          </NavLink>
          <NavLink
            to="/doctors"
            className="hover:text-blue-500"
            onClick={() => setShowMenu(false)}
          >
            {" "}
            <p className="py-2">All Doctors</p>{" "}
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-blue-500"
            onClick={() => setShowMenu(false)}
          >
            {" "}
            <p className="py-2">About</p>{" "}
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-blue-500"
            onClick={() => setShowMenu(false)}
          >
            {" "}
            <p className="py-2">Contact</p>{" "}
          </NavLink>
          {token ? (
            <div className="mt-4 flex flex-col items-center text-gray-600 w-full">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-2 w-full justify-center bg-gray-200 rounded-md"
              >
                <img
                  src={userData.image}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <span>Profile</span>
              </button>
              {showDropdown && (
                <div className="mt-2 bg-stone-100 rounded flex flex-col gap-4 p-4 w-full text-center">
                  <p
                    onClick={() => {
                      navigate("/my-profile");
                      setShowMenu(false);
                      setShowDropdown(false);
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/my-appointment");
                      setShowMenu(false);
                      setShowDropdown(false);
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => {
                      setToken(false);
                      localStorage.removeItem("token");
                      setShowMenu(false);
                      setShowDropdown(false);
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="bg-primary text-white px-8 py-3 rounded-full font-light mt-4"
            >
              Create Account
            </button>
          )}
        </div>
      )}

      {/* Profile / Authentication */}
      <div className="hidden md:flex items-center gap-5">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              src={userData.image}
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            <img
              src={assets.dropdown_icon}
              alt="dropdown"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute top-12 right-0 bg-white shadow-md rounded-md p-4 z-10 text-gray-600  ">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setShowDropdown(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointment");
                    setShowDropdown(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    setToken(false);
                    localStorage.removeItem("token");
                    setShowDropdown(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light  hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
