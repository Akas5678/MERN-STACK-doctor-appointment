import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left - Image Section */}
        <div className="w-full h-80 flex items-center justify-center">
          <img 
            src={assets.about_image} 
            alt="About Us" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right - About Us & Why Choose Us */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We are committed to providing top-notch healthcare services with a team of expert doctors. Our mission is to 
            ensure that every patient receives the best medical attention with personalized care.
          </p>

          {/* Why Choose Us Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800">Why Choose Us?</h3>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li className="flex items-center">✅ Experienced & Certified Doctors</li>
              <li className="flex items-center">✅ Affordable & Transparent Pricing</li>
              <li className="flex items-center">✅ 24/7 Customer Support & Online Booking</li>
              <li className="flex items-center">✅ Advanced & Modern Healthcare Facilities</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
