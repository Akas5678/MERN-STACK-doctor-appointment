import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* Left Side - Text Content */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book Appointments <br /> With trusted Doctors
        </p>

        {/* Profile Images + Text */}
        <div className="flex items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="group_profiles" />
          <p>Simply browse through our extensive list of trusted doctors</p>
        </div>

        {/* Book Appointment Button */}
        <a href="#speciality" className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full font-medium mt-4 hover:scale-105 transition-all duration-300 ease-in-out">
          Book Appointment
          <img src={assets.arrow_icon} alt="arrow_icon" className="w-4" />
        </a>
      </div>

      {/* Right Side - Image */}
      <div className="md:w-1/2 relative flex justify-end">
        <img className="w-full md:w-[90%] h-auto rounded-lg" src={assets.header_img} alt="Header Image" />
      </div>
    </div>
  );
};

export default Header;
