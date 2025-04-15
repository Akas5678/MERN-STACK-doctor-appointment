import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react"; // Optional icons for toggle

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
    {
      path: "/all-appointments",
      icon: assets.appointment_icon,
      label: "Appointment",
    },
    { path: "/add-doctors", icon: assets.add_icon, label: "Add Doctors" },
    { path: "/doctors-list", icon: assets.people_icon, label: "Doctor List" },
  ];

  const NavItemsDoc = () => [
    { path: "/doctors-dashboard", icon: assets.home_icon, label: "Dashboard" },
    {
      path: "/doctors-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    { path: "/doctors-profile", icon: assets.people_icon, label: "Profile" },
  ];

  const renderNavLinks = (items) =>
    items.map((item, idx) => (
      <NavLink
        key={idx}
        to={item.path}
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-4 p-3 rounded-lg group transition-all duration-300
            ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:pl-4"
            }`
        }
      >
        <img
          src={item.icon}
          alt=""
          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
        />
        <p className="text-sm font-medium">{item.label}</p>
      </NavLink>
    ));

  return (
    <>
      {/* Toggle Button for Mobile */}
      <div className="md:hidden p-4 flex items-center justify-between bg-white shadow-sm border-b">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Responsive */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40 transform transition-transform duration-300 ease-in-out
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:block`}
      >
        <ul className="flex flex-col gap-2 p-4">
          {aToken && renderNavLinks(navItems)}
          {dToken && renderNavLinks(NavItemsDoc())}
        </ul>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
