import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function Banner() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-blue-400 p-6 m-6 rounded-xl shadow-md">
      {/* Text Section */}
      <div className="text-center md:text-left flex-1">
        <p className="text-md font-semibold text-blue-700">Book Appointment</p>
        <p className="text-2xl md:text-3xl font-bold text-gray-800">
          With 100+ Trusted Doctors
        </p>

        <button onClick={()=>{navigate('/login');scrollTo(0,0)}}className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-full text-md font-medium hover:bg-blue-700 transition-all">
          Create Account
        </button>
      </div>

      {/* Image Section */}
      <div className="mt-4 md:mt-0 flex-1 flex justify-center">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-52 md:w-64 rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}

export default Banner;
