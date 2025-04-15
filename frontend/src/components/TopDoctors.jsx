import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-gray-800 bg-gray-100">
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-primary">
        Top Doctors to Book
      </h1>

      {/* Doctors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-7xl px-4 ">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-slate-300 rounded-lg shadow-md p-4 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-lg"
          >
            {/* Doctor Image */}
            <img
              className="w-20 h-20 object-cover rounded-full mb-3"
              src={item.image}
              alt={item.name}
            />

            {/* Doctor Info */}
            <div>
              {/* Availability with Green Dot */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 font-semibold">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <p>Available</p>
              </div>
              <p className="text-lg font-medium mt-2">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-primary text-white px-6 py-2 rounded-lg mt-6 hover:bg-primary-dark transition"
      >
        More Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
