import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-6 py-16 text-gray-800 bg-gray-100"
      id="speciality"
    >
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-primary">
        Find By Speciality
      </h1>
      <p className="max-w-lg text-center text-gray-600">
        Simply browse through our extensive list of trusted doctors and schedule
        your appointment.
      </p>

      {/* Speciality Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <img
              className="w-20 h-20 object-cover rounded-full"
              src={item.image}
              alt={item.speciality}
            />
            <p className="mt-3 text-lg font-medium text-gray-700">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
